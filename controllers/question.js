// const {readFileSync} = require('fs');
// const db = require('../db/connect');

// const createQuestion = async (req,res) => {
//     const {isFirst,prevID,prevOptionIdx} = req.query;
//     const {type,key,text,options,minLength,maxLength,required} = req.body;

//     const formID = readFileSync('./local/formID.txt', 'utf-8');
//     const formRef = db.collection('forms').doc(formID);
//     const questionCollection = db.collection('forms').doc(formID).collection('questions');

//     const newQuestion = await questionCollection.add({});
//     const questionID = newQuestion.id;
//     const currentQuestionRef = formRef.collection('questions').doc(questionID);

//     if (!type || !key || !text || !required) {
//         res.status(400).send('Invalid Query');
//     }

//     if (isFirst === 'true') {
//         formRef.set({start: currentQuestionRef}, {merge: true});
//     }

//     if (prevID) {
//         const prevQuestionRef = formRef.collection('questions').doc(prevID);
//         if (prevOptionIdx) {
//             const snapshot = await prevQuestionRef.get();
//             const arr = snapshot.data()['options'];
//             for (const idx in prevOptionIdx) {
//                 arr[idx].next = currentQuestionRef;
//             }
//             prevQuestionRef.set({options: arr}, {merge: true});
//         }
//         else {
//             prevQuestionRef.set({next: currentQuestionRef}, {merge: true});
//         }
//     }

//     if (type === 'single-correct') {
//         if (!options) {
//             return res.status(404).send('Options not found');
//         }
//         await questionCollection.doc(questionID).set({id: questionID, type: type, key: key, options: options, text: text, required: required});
//         return res.status(200).send("Success Single-Correct Question");
//     }
//     else if (type === 'multi-correct') {
//         if (!options) {
//             return res.status(404).send('Options not found');
//         }
//         await questionCollection.doc(questionID).set({id: questionID, type: type, key: key, options: options, text: text, required: required});
//         return res.status(200).send("Success Multi-Correct Question");
//     }
//     else if (type === 'text') {
//         await questionCollection.doc(questionID).set({id: questionID, type: type, key: key, text: text, required: required});
//         return res.status(200).send("Success Text Question");
//     }
//     else if (type === 'slider') {
//         if (!minLength || !maxLength) {
//             return res.status(404).json({error: 'Limits not defined!'});
//         }
//         await questionCollection.doc(questionID).set({id: questionID, type: type, key: key, text: text, required: required,minLength:minLength,maxLength:maxLength});
//         return res.status(200).send("Success Slider Question");
//     }
//     else {
//         return res.status(404).json({error: 'Invalid Question Type'});
//     }
// }

// module.exports = createQuestion;


const {readFileSync} = require('fs');
const db = require('../db/connect');
const { add } = require('winston');

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
        console.log(questionID);
        const currentQuestionDocRef = questionCollection.doc(questionID);
        // console.log(currentQuestionDocRef);
        currentQuestionDocRef.update({check: 123});
        // for (const key in currentQuestion) {
        //     const value = currentQuestion[key];
        //     const data = {};
        //     data[key] = value;
        //     currentQuestionDocRef.update(data);
        // }
    }

    formDocRef.update({startID: startID});
    return res.status(200).json({msg: "Submit Question Collection"});
}

module.exports = submitQuestion;