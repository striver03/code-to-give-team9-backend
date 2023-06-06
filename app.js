// Initial setup
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// const crudRouter = require('./routes/crud');
// app.use('/',crudRouter);

const questionRouter = require('./routes/questionnaire');
app.use('/',questionRouter);

const port = process.env.PORT || 3000;

const start = () => {
    try {
        app.listen(3000, console.log(`Server is listening on the port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};
start();