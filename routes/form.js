const express = require("express");
const router = express.Router();

const {getForm, createForm} = require('../controllers/form');

router
  .route('/')
  .get(getForm)
  .post(createForm);

module.exports = router;
