const express = require('express');
const router = express.Router();

const getInfo = require('../controllers/gpt');

router.route('/').post(getInfo);
module.exports = router;