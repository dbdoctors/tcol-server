const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['guided-reading', 'impromptu-speaking'],
        required: true
    },
    exercise: {
        title: String,
        content: String,
        difficulty: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced']
        },
        wordCount: Number
    },
    recording: {
        duration: Number, // in seconds
        transcript: String
    },
    status: {
        type: String,
        enum: ['transcribed', 'analyzed', 'failed'],
        default: 'transcribed'
    },
    feedback: {
        overallScore: { type: Number, min: 0, max: 100 },
        clarity: { type: Number, min: 0, max: 100 },
        pacing: { type: Number, min: 0, max: 100 },
        fillerWords: {
            count: { type: Number, default: 0 },
            words: [String]
        },
        tips: [String],
        summary: String
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for efficient querying of user's session history
sessionSchema.index({ user: 1, completedAt: -1 });

module.exports = mongoose.model('Session', sessionSchema);
