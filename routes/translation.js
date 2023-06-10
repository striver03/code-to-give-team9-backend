import express from "express";
const router = express.Router();

import {getTranslatedQuestion} from '../controllers/translation.js'; 

router.route('/').post(getTranslatedQuestion);

export default router;