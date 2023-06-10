// const db = require('../db/connect');
import db from "../db/connect.js";

const submitQuestion = async (req,res) => {
    const {formID} = req.query;
    const {questions,startID} = req.body;
    const formDocRef = db.collection('forms').doc(`${formID}`);
    const questionCollection = formDocRef.collection('questions');

    for (const idx in questions) {
        const currentQuestion = questions[idx];

        if (!currentQuestion.id || !currentQuestion.type || !currentQuestion.key || !currentQuestion.text || currentQuestion.required === undefined || currentQuestion.isModifiable === undefined) {
            return res.status(400).send('Invalid Query Basic');
        }

        if ((currentQuestion.type === 'single-correct' || currentQuestion.type === 'multi-correct') && !currentQuestion.options) {
            return res.status(400).send('Invalid Query Options');
        }

        if (currentQuestion.type === 'slider' && (currentQuestion.minLength === undefined || currentQuestion.maxLength === undefined)) {
            return res.status(400).send('Invalid Query Slider');
        }

        const questionID = currentQuestion.id;
        const currentQuestionDocRef = questionCollection.doc(questionID);
        for (const key in currentQuestion) {
            const value = currentQuestion[key];
            const data = {};
            data[key] = value;
            currentQuestionDocRef.set(data, {merge: true});
        }
    }

    formDocRef.update({startID: startID});
    return res.status(200).json({msg: "Submit Question Collection"});
}

// module.exports = submitQuestion;
export {submitQuestion};