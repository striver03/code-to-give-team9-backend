const express = require('express');
const router = express.Router();

// const {getFormSubmissionID, addUserResponse, submitResponse} = require('../controllers/form-submission');
const {submitResponse} = require('../controllers/form-submission');
// router.route('/').get(getFormSubmissionID);
router.route('/').post(submitResponse);
// router.route('/').post(addUserResponse);
module.exports = router;