import express from "express";
const router = express.Router();

import { getData } from "../controllers/analytics.js";
router.route("/dashboard").get(getData);

export default router;