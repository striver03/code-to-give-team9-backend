const db = require('../db/connect');
const {readFileSync,writeFileSync} = require('fs');
const formCollection = db.collection('forms');
const formSubmissionCollection = db.collection('form-submissions');

const getFormSubmissionID = async (req,res) => {
    const newDoc = await formSubmissionCollection.add({});
    writeFileSync('./local/submissionID.txt',newDoc.id);
    res.send("Form-submission ID generated");
};

const addUserResponse = async (req,res) => {
    const {formID} = req.query;
    const docRef = formCollection.doc(formID);
    const {key,value} = req.body;
    if (!formID || !docRef || !key || !value) {
        return res.send("Invalid response");
    }
    try {
        const submissionID = readFileSync('./local/submissionID.txt','utf-8');
        let data = {};
        data[`${key}`] = value;
        await formSubmissionCollection.doc(submissionID).set(data, {merge: true});
        await formSubmissionCollection.doc(submissionID).set({form: docRef}, {merge: true});
        res.send("Submission Success!");
    } catch (error) {
        console.log(error);
        res.send("Submission Failed!");
    }
}

const submitResponse = async (req,res) => {
    const {formID} = req.query;
    const {response} = req.body;

    if (!formID || !response) {
        return res.send("Invalid response");
    }

    try {
        const docRef = formCollection.doc(formID);
        const submissionID = readFileSync('./local/submissionID.txt','utf-8');
        for (const key in response) {
            const value = response[key];
            formSubmissionCollection.doc(submissionID).set({key,value}, {merge: true});
        }
        await formSubmissionCollection.doc(submissionID).set({form: docRef}, {merge: true});
        res.status(200).json({msg: "Success Submission!"});
    } catch (error) {
        console.log(error);
        res.send("Submission Failed!");
    }
}

module.exports = {getFormSubmissionID, addUserResponse, submitResponse};