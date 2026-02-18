const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
const exercises = require('../data/exercises');
require('dotenv').config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing exercises
        await Exercise.deleteMany({});
        console.log('Cleared existing exercises');

        // Insert seed data
        await Exercise.insertMany(exercises);
        console.log(`Seeded ${exercises.length} exercises`);

        await mongoose.disconnect();
        console.log('Database seeding complete');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedDatabase();
