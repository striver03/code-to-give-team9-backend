// const express = require("express");
import express from "express";
const router = express.Router();

// const {getForm, createForm} = require('../controllers/form');
import {getForm,createForm} from "../controllers/form.js";

router
  .route('/')
  .get(getForm)
  .post(createForm);

// module.exports = router;
export default router;
