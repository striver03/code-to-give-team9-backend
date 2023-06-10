const express = require('express');
const router = express.Router();

const submitQuestion = require('../controllers/question');
router.route('/').post(submitQuestion);

module.exports = router;