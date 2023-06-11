import express from "express";
const router = express.Router();

import {getCounsellingData } from "../controllers/counselling.js";

router.route('/').get(getCounsellingData);
export default router;