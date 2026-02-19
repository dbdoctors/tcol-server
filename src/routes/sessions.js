const express = require('express');
const router = express.Router();
const multer = require('multer');
const { submitSession, submitAudioSession, getSessions, getProgress } = require('../controllers/sessionController');
const auth = require('../middleware/auth');

// Multer: store audio in memory (max 25MB)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 25 * 1024 * 1024 }
});

router.post('/', auth, submitSession);
router.post('/audio', auth, upload.single('audio'), submitAudioSession);
router.get('/', auth, getSessions);
router.get('/progress', auth, getProgress);

module.exports = router;
