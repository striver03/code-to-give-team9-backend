const express = require('express');
const router = express.Router();

const {getnextQues} = require('../controllers/gpt');
// const {getnextQues} = require('../archive/gpt2');

// router.route('/base').post(storeBaseInfo);
router.route('/').post(getnextQues);
// router.route('/').get(getnextQues);
module.exports = router;