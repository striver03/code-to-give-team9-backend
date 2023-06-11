import express from "express";
const router = express.Router();

import { getVolunteer } from "../controllers/volunteer.js";

router.route("/").get(getVolunteer);
export default router;