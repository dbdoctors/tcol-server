const express = require('express');
const router = express.Router();
const { getDailyExercise, getExercises, getExercise } = require('../controllers/exerciseController');
const auth = require('../middleware/auth');

router.get('/daily', auth, getDailyExercise);
router.get('/', auth, getExercises);
router.get('/:id', auth, getExercise);

module.exports = router;
