const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false
    },
    currentStage: {
        type: String,
        enum: ['guided-reading', 'impromptu-speaking'],
        default: 'guided-reading'
    },
    difficultyTier: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    stats: {
        totalSessions: { type: Number, default: 0 },
        averageScore: { type: Number, default: 0 },
        currentStreak: { type: Number, default: 0 },
        longestStreak: { type: Number, default: 0 },
        lastSessionDate: { type: Date, default: null }
    },
    impromptuUnlocked: {
        type: Boolean,
        default: false
    },
    weeklySessionCount: {
        type: Number,
        default: 0
    },
    weekStartDate: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Check if impromptu speaking should be unlocked
userSchema.methods.checkUnlock = function () {
    const MIN_SESSIONS = 5;
    const MIN_AVG_SCORE = 60;

    if (this.stats.totalSessions >= MIN_SESSIONS && this.stats.averageScore >= MIN_AVG_SCORE) {
        this.impromptuUnlocked = true;
        this.currentStage = 'impromptu-speaking';
        return true;
    }
    return false;
};

module.exports = mongoose.model('User', userSchema);
