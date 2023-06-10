// const express = require("express");
import express from "express";

const app = express();
// const cors = require("cors");
import cors from "cors";
// var winston = require("winston")
import winston from "winston";
// expressWinston = require("express-winston");
import expressWinston from "express-winston";

app.use(cors());
app.use(express.json());

// const gptRouter = require("./routes/gpt");
import gptRouter from "./routes/gpt.js";
// const formRouter = require("./routes/form");
import formRouter from "./routes/form.js";
// const questionRouter = require("./routes/question");
import questionRouter from "./routes/question.js"
// const submitRouter = require("./routes/form-submission");
import submitRouter from "./routes/form-submission.js";
// const analyticsRouter = require("./routes/data-analytics");
import analyticsRouter from "./routes/data-analytics.js";
// const translateRouter = require('./routes/translation');
import translateRouter from './routes/translation.js';


app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) {
      return false;
    }, // optional: allows to skip some log messages based on request and/or response
  })
);

app.use("/form", formRouter);
app.use("/question", questionRouter);
app.use("/submit", submitRouter);
app.use("/gpt", gptRouter);
app.use("/analytics", analyticsRouter);
app.use("/translate",translateRouter);

const port = process.env.PORT || 3000;

const start = () => {
  try {
    app.listen(port, console.log(`Server is listening on the port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
