const Question = require('../models/question');
const {readFileSync} = require('fs');
const db = require('../db/connect');

const createQuestion = async (req,res,_next) => {
    const formID = readFileSync('./local/formID.txt', 'utf-8');
    const questionCollection = db.collection('forms').doc(formID).collection('questions');
    const {type,key,text,options} = req.body;
    if (!type || !key || !text) {
        res.status(404).send('Path not found');
    }
    if (type === 'option') {
        if (!options) {
            res.status(404).send('Path not found');
        }
        const instance = new Question.OptionQuestion(key,options,text);
        await questionCollection.add({key: key, option: options, text: text});
        res.status(200).send("Success Option Question");
    }
    else if (type === 'text') {
        await questionCollection.add({key: key, text: text});
        res.status(200).send("Success Text Question");
    }
}

module.exports = createQuestion;