// Initial setup
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

const crudRouter = require('./routes/crud');
const gptRouter = require('./routes/gpt');
app.use('/',crudRouter);
app.use('/gpt',gptRouter);

const port = process.env.PORT || 3000;

const start = () => {
    try {
        app.listen(3000, console.log(`Server is listening on the port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};
start();

// Collections:
// 1. users (the complete data of each user)
//     docs - 
// 2. age bracket - (below 18, 18-20, 21-23, 24+ {these will be the documents of the collection})
   