const db = require('../db/connect');
// const userID = require('../routes/questionnaire');

const questionCollection = db.collection('users').doc('user3').collection('questions');

const generateQuestion = async (req,res) => {
    try {
        const question = req.body.question;
        const options = req.body.options;
        const chosenOptions = req.body.chosenOptions;
        const docRef = questionCollection.doc();
        await docRef.set({
            question: question,
            options: options,
            chosenOptions: chosenOptions
        });
        res.status(200).json({msg: 'Success Question added!'});
    } catch (error) {
        console.log(error);
        res.status(404).send("Path not found!");
    }
};

module.exports = generateQuestion;