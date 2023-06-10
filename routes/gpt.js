// const express = require('express');
import express from "express";
const router = express.Router();

// const {getnextQues} = require('../controllers/gpt');
import {getnextQues} from "../controllers/gpt.js";

// router.route('/base').post(storeBaseInfo);
router.route('/').post(getnextQues);
// router.route('/').get(getnextQues);
// module.exports = router;
export default router;