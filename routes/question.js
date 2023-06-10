// const express = require('express');
import express from "express";
const router = express.Router();

// const submitQuestion = require('../controllers/question');
import {submitQuestion} from "../controllers/question.js";
router.route('/').post(submitQuestion);

// module.exports = router;
export default router;