const db = require('../db/connect');
// const {readFileSync,writeFileSync} = require('fs');
const formCollection = db.collection('forms');
const formSubmissionCollection = db.collection('form-submissions');

const submitResponse = async (req,res) => {
    const {formID} = req.query;
    const {response} = req.body;

    if (!formID || !response) {
        return res.send("Invalid response");
    }

    try {
        const newDoc = await formSubmissionCollection.add({});
        const submissionID = newDoc.id;
        const docRef = formCollection.doc(formID);
        for (const key in response) {
            const value = response[key];
            // console.log(key,value);
            const data = {};
            data[key] = value;
            formSubmissionCollection.doc(submissionID).update(data);
        }
        await formSubmissionCollection.doc(submissionID).set({form: docRef}, {merge: true});
        res.status(200).json({msg: "Success Submission!"});
    } catch (error) {
        console.log(error);
        res.send("Submission Failed!");
    }
}

module.exports = {submitResponse};