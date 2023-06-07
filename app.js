const express = require("express");
const app = express();

app.use(express.json());

const gptRouter = require('./routes/gpt');
const formRouter = require("./routes/form");
const questionRouter = require("./routes/question");
const submitRouter = require("./routes/form-submission");

app.use("/form", formRouter);
app.use('/question', questionRouter);
app.use('/submit',submitRouter);
app.use('/gpt',gptRouter);

const port = process.env.PORT || 3000;

const start = () => {
  try {
    app.listen(port, console.log(`Server is listening on the port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();