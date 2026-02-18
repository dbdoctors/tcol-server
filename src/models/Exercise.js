const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['guided-reading', 'impromptu-speaking'],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    wordCount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['technology', 'business', 'science', 'philosophy', 'general'],
        default: 'general'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Exercise', exerciseSchema);
