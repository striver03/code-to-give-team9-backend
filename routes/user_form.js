const express = require('express');
const router = express.Router();

const {getFormSubmissionID, addUserResponse} = require('../controllers/user_form');

router.route('/').get(getFormSubmissionID);
router.route('/:id').post(addUserResponse);

module.exports = router;