const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const logger = require('./logger');

const authRoutes = require('./routes/auth');
const exerciseRoutes = require('./routes/exercises');
const sessionRoutes = require('./routes/sessions');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim(), { source: 'http' })
    }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/sessions', sessionRoutes);

// Health check
app.get('/api/health', async (req, res) => {
    const mongoStateValue = mongoose.connection.readyState;
    const mongoStateMap = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };

    const mongoHealth = {
        status: 'down',
        connectivity: mongoStateMap[mongoStateValue] || 'unknown'
    };

    if (mongoStateValue === 1) {
        try {
            await mongoose.connection.db.admin().ping();
            mongoHealth.status = 'ok';
        } catch (err) {
            mongoHealth.status = 'down';
            mongoHealth.error = err.message;
        }
    }

    const voiceProcessorUrl = process.env.VOICE_PROCESSOR_URL || 'http://localhost:5001';
    const voiceHealth = {
        status: 'down',
        connectivity: 'unreachable',
        url: voiceProcessorUrl
    };

    try {
        const voiceResponse = await axios.get(`${voiceProcessorUrl}/api/health`, { timeout: 3000 });
        voiceHealth.connectivity = 'reachable';
        voiceHealth.responseStatus = voiceResponse.status;
        voiceHealth.health = voiceResponse.data;
        voiceHealth.status = voiceResponse.data?.status === 'ok' ? 'ok' : 'down';
    } catch (err) {
        voiceHealth.error = err.message;
    }

    const overallStatus = mongoHealth.status === 'ok' && voiceHealth.status === 'ok' ? 'ok' : 'degraded';
    const httpStatus = overallStatus === 'ok' ? 200 : 503;

    res.status(httpStatus).json({
        status: overallStatus,
        service: 'tcol-server',
        timestamp: new Date().toISOString(),
        checks: {
            mongo: mongoHealth,
            voiceProcessor: voiceHealth
        }
    });
});

// Error handling
app.use((err, req, res, next) => {
    logger.error(err.stack || err.message, { source: 'server-error' });
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB');
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        logger.error(`MongoDB connection error: ${err.message}`);
        process.exit(1);
    });

module.exports = app;
