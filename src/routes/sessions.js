const express = require('express');
const router = express.Router();
const { submitSession, getSessions, getProgress } = require('../controllers/sessionController');
const auth = require('../middleware/auth');

router.post('/', auth, submitSession);
router.get('/', auth, getSessions);
router.get('/progress', auth, getProgress);

module.exports = router;
