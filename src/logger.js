const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logDir = process.env.LOG_DIR || path.join(process.cwd(), 'logs');
fs.mkdirSync(logDir, { recursive: true });

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json()
    ),
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), format.simple())
        }),
        new DailyRotateFile({
            filename: path.join(logDir, 'application-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            maxFiles: '5d'
        })
    ],
    exceptionHandlers: [
        new DailyRotateFile({
            filename: path.join(logDir, 'exceptions-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            maxFiles: '5d'
        })
    ],
    rejectionHandlers: [
        new DailyRotateFile({
            filename: path.join(logDir, 'rejections-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            maxFiles: '5d'
        })
    ]
});

module.exports = logger;
