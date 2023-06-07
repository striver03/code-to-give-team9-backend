const express = require('express');
const router = express.Router();

const {getnextQues,storeBaseInfo} = require('../controllers/gpt');

router.route('/base').post(storeBaseInfo);
router.route('/nxt').post(getnextQues);
// router.route('/').get(getnextQues);
module.exports = router;