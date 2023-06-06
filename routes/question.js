const express = require('express');
const router = express.Router();

const createQuestion = require('../controllers/question');
router.route('/').post(createQuestion);

module.exports = router;