const Exercise = require('../models/Exercise');

// Get daily exercise based on user's difficulty & stage
exports.getDailyExercise = async (req, res) => {
    try {
        const { currentStage, difficultyTier } = req.user;

        // Get a random exercise matching user's current stage and difficulty
        const exercises = await Exercise.find({
            type: currentStage,
            difficulty: difficultyTier,
            isActive: true
        });

        if (!exercises.length) {
            return res.status(404).json({
                success: false,
                message: 'No exercises available for your current level.'
            });
        }

        // Pick a pseudo-random exercise based on date to ensure consistency within a day
        const today = new Date();
        const dayIndex = today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate();
        const exercise = exercises[dayIndex % exercises.length];

        res.status(200).json({
            success: true,
            exercise
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all exercises (for browsing)
exports.getExercises = async (req, res) => {
    try {
        const { type, difficulty, page = 1, limit = 10 } = req.query;

        const filter = { isActive: true };
        if (type) filter.type = type;
        if (difficulty) filter.difficulty = difficulty;

        const exercises = await Exercise.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await Exercise.countDocuments(filter);

        res.status(200).json({
            success: true,
            exercises,
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

// Get a specific exercise
exports.getExercise = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({
                success: false,
                message: 'Exercise not found.'
            });
        }

        res.status(200).json({
            success: true,
            exercise
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
