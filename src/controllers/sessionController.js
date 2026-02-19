const Session = require('../models/Session');
const User = require('../models/User');
const axios = require('axios');

// Submit a session with audio for AI processing
exports.submitSession = async (req, res) => {
    try {
        const { exerciseId, exerciseTitle, exerciseContent, exerciseDifficulty,
            transcript: clientTranscript, duration, type, audioBase64, audioFormat } = req.body;

        let transcript = clientTranscript;

        // If no transcript from client (Web Speech API unavailable), use Vosk on the server
        if (!transcript && audioBase64) {
            try {
                const audioBuffer = Buffer.from(audioBase64, 'base64');
                const vpResponse = await axios.post(
                    `${process.env.VOICE_PROCESSOR_URL}/api/transcribe`,
                    audioBuffer,
                    {
                        headers: {
                            'Content-Type': 'application/octet-stream',
                            'X-Audio-Format': audioFormat || 'webm'
                        },
                        timeout: 60000,
                        maxBodyLength: 50 * 1024 * 1024,
                        maxContentLength: 50 * 1024 * 1024
                    }
                );
                transcript = vpResponse.data.transcript || '';
                console.log(`Server-side transcription completed: "${transcript.substring(0, 80)}..."`);
            } catch (transcribeError) {
                console.error('Server-side transcription failed:', transcribeError.message);
                return res.status(500).json({
                    success: false,
                    message: 'Speech transcription failed. Please try again or use a supported browser.'
                });
            }
        }

        if (!transcript || !duration) {
            return res.status(400).json({
                success: false,
                message: 'Transcript and duration are required. If speech was not detected, please try again.'
            });
        }

        // Send transcript to voice-processor for AI analysis
        let feedback;
        try {
            const vpResponse = await axios.post(
                `${process.env.VOICE_PROCESSOR_URL}/api/analyze`,
                {
                    transcript,
                    originalText: exerciseContent || '',
                    type: type || 'guided-reading',
                    duration
                },
                { timeout: 30000 }
            );
            feedback = vpResponse.data.feedback;
        } catch (vpError) {
            console.error('Voice processor error:', vpError.message);
            // Fallback to basic scoring if voice processor is unavailable
            feedback = generateFallbackFeedback(transcript, duration);
        }

        // Create session record
        const session = await Session.create({
            user: req.user._id,
            type: type || 'guided-reading',
            exercise: {
                title: exerciseTitle,
                content: exerciseContent,
                difficulty: exerciseDifficulty,
                wordCount: exerciseContent ? exerciseContent.split(/\s+/).length : 0
            },
            recording: {
                duration,
                transcript
            },
            feedback
        });

        // Update user stats
        const user = await User.findById(req.user._id);
        const allSessions = await Session.find({ user: req.user._id });

        const totalScore = allSessions.reduce((sum, s) => sum + (s.feedback?.overallScore || 0), 0);
        user.stats.totalSessions = allSessions.length;
        user.stats.averageScore = Math.round(totalScore / allSessions.length);

        // Update streak
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastSession = user.stats.lastSessionDate ? new Date(user.stats.lastSessionDate) : null;

        if (lastSession) {
            lastSession.setHours(0, 0, 0, 0);
            const dayDiff = (today - lastSession) / (1000 * 60 * 60 * 24);

            if (dayDiff === 1) {
                user.stats.currentStreak += 1;
            } else if (dayDiff > 1) {
                user.stats.currentStreak = 1;
            }
            // If dayDiff === 0, streak stays the same (already practiced today)
        } else {
            user.stats.currentStreak = 1;
        }

        if (user.stats.currentStreak > user.stats.longestStreak) {
            user.stats.longestStreak = user.stats.currentStreak;
        }

        user.stats.lastSessionDate = new Date();

        // Check for impromptu unlock
        const justUnlocked = !user.impromptuUnlocked && user.checkUnlock();

        await user.save();

        res.status(201).json({
            success: true,
            session,
            stats: user.stats,
            impromptuUnlocked: user.impromptuUnlocked,
            justUnlocked
        });
    } catch (error) {
        console.error('Submit session error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get user's session history
exports.getSessions = async (req, res) => {
    try {
        const { page = 1, limit = 20, type } = req.query;
        const filter = { user: req.user._id };
        if (type) filter.type = type;

        const sessions = await Session.find(filter)
            .sort({ completedAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Session.countDocuments(filter);

        res.status(200).json({
            success: true,
            sessions,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get progress data for timeline
exports.getProgress = async (req, res) => {
    try {
        const { days = 30 } = req.query;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(days));

        const sessions = await Session.find({
            user: req.user._id,
            completedAt: { $gte: startDate }
        }).sort({ completedAt: 1 });

        // Aggregate by day
        const dailyData = {};
        sessions.forEach(session => {
            const dateKey = session.completedAt.toISOString().split('T')[0];
            if (!dailyData[dateKey]) {
                dailyData[dateKey] = {
                    date: dateKey,
                    sessions: 0,
                    averageScore: 0,
                    totalScore: 0
                };
            }
            dailyData[dateKey].sessions += 1;
            dailyData[dateKey].totalScore += session.feedback?.overallScore || 0;
            dailyData[dateKey].averageScore = Math.round(
                dailyData[dateKey].totalScore / dailyData[dateKey].sessions
            );
        });

        res.status(200).json({
            success: true,
            progress: Object.values(dailyData),
            summary: {
                totalSessions: sessions.length,
                averageScore: sessions.length > 0
                    ? Math.round(sessions.reduce((sum, s) => sum + (s.feedback?.overallScore || 0), 0) / sessions.length)
                    : 0,
                bestScore: sessions.length > 0
                    ? Math.max(...sessions.map(s => s.feedback?.overallScore || 0))
                    : 0
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Fallback feedback generator when voice processor is unavailable
function generateFallbackFeedback(transcript, duration) {
    const words = transcript.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const wpm = Math.round((wordCount / duration) * 60);

    // Basic filler word detection
    const fillerPatterns = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'literally', 'so', 'well'];
    const fillerWords = [];
    let fillerCount = 0;

    words.forEach(word => {
        const lower = word.toLowerCase().replace(/[^a-z]/g, '');
        if (fillerPatterns.includes(lower)) {
            fillerCount++;
            if (!fillerWords.includes(lower)) fillerWords.push(lower);
        }
    });

    // Score based on WPM (ideal: 130-160 WPM for reading)
    let pacingScore = 70;
    if (wpm >= 120 && wpm <= 170) pacingScore = 85;
    else if (wpm >= 100 && wpm <= 190) pacingScore = 70;
    else pacingScore = 50;

    // Clarity based on filler word ratio
    const fillerRatio = fillerCount / wordCount;
    let clarityScore = Math.round(Math.max(40, 90 - (fillerRatio * 500)));

    const overallScore = Math.round((pacingScore + clarityScore) / 2);

    return {
        overallScore,
        clarity: clarityScore,
        pacing: pacingScore,
        fillerWords: {
            count: fillerCount,
            words: fillerWords
        },
        tips: [
            wpm < 120 ? 'Try to speak a bit faster for better flow.' :
                wpm > 170 ? 'Slow down slightly to improve clarity.' : 'Your pacing is good!',
            fillerCount > 3 ? 'Work on reducing filler words like "um" and "uh".' : 'Good job keeping filler words minimal!',
            'Practice reading the passage one more time to improve familiarity.'
        ],
        summary: `You spoke ${wordCount} words in ${duration} seconds (${wpm} WPM). ${fillerCount > 0 ? `Detected ${fillerCount} filler words.` : 'No filler words detected.'
            } Overall articulation score: ${overallScore}/100.`
    };
}
