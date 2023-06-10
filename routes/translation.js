import express from "express";
const router = express.Router();

import getTranlatedQuestion from '../controllers/translation.js'; 

router.route('/').post(getTranlatedQuestion);

export default router;