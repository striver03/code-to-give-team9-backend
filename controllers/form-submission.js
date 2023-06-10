// const db = require('../db/connect');
import db from "../db/connect.js";
// const {readFileSync,writeFileSync} = require('fs');
const formCollection = db.collection('forms');
const formSubmissionCollection = db.collection('form-submissions');
const volunteerSubmissionCollection = db.collection('volunteer-submissions');
const counsellingBookedCollection = db.collection('counselling-booked');


const submitResponse = async (req,res) => {
    const {formID} = req.query;
    const {response} = req.body;

    if (!formID || !response) {
        return res.send("Invalid response");
    }

    try {
        const docRef = formCollection.doc(formID);
        const snapshot = await docRef.get();
        let submissionDocRef;
        if(snapshot.data()['isVolunteer']) {
            const newDoc = await volunteerSubmissionCollection.add({});
            submissionDocRef = volunteerSubmissionCollection.doc(newDoc.id);
        }
        else {
            const newDoc = await formSubmissionCollection.add({});
            submissionDocRef = formSubmissionCollection.doc(newDoc.id);
        }

        for (const key in response) {
            const value = response[key];
            const data = {};
            data[key] = value;
            submissionDocRef.update(data);
        }

        if(response.isBooked === "Yes") {
            await counsellingBookedCollection.add({submission:submissionDocRef});
        }
        await submissionDocRef.set({form: docRef}, {merge: true});
        res.status(200).json({msg: "Success Submission!"});
    } catch (error) {
        console.log(error);
        res.send("Submission Failed!");
    }
}

// module.exports = {submitResponse};
export {submitResponse};