// const express = require('express');
import express from "express";
const router = express.Router();

// const {getFormSubmissionID, addUserResponse, submitResponse} = require('../controllers/form-submission');
// const {submitResponse} = require('../controllers/form-submission');
import {submitResponse} from "../controllers/form-submission.js";

// router.route('/').get(getFormSubmissionID);
router.route('/').post(submitResponse);
// router.route('/').post(addUserResponse);
// module.exports = router;
export default router;