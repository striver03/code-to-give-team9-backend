// Initial setup
const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// const crudRouter = require('./routes/crud');
const formRouter = require("./routes/form");
const questionRouter = require('./routes/question');
const submitRouter = require('./routes/user_form');
app.use("/form", formRouter);
// app.use('/', crudRouter);
app.use('/question', questionRouter);
app.use('/submit',submitRouter);

const port = process.env.PORT || 3000;

const start = () => {
  try {
    app.listen(port, console.log(`Server is listening on the port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();