// const db = require('../db/connect');
import db from "../db/connect.js";
import {substance,ageGroups} from "../local/static_data.js";
import { myDistMap } from "../local/initialMap.js";
// const {readFileSync,writeFileSync} = require('fs');
const formCollection = db.collection('forms');
const formSubmissionCollection = db.collection('form-submissions');
const volunteerSubmissionCollection = db.collection('volunteer-submissions');
const counsellingBookedCollection = db.collection('counselling-booked');
const districtCollection = db.collection("districts");



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
        let isVolunteerForm = false;
        if(snapshot.data()['isVolunteer']) {
            isVolunteerForm = true;
            const newDoc = await volunteerSubmissionCollection.add({});
            submissionDocRef = volunteerSubmissionCollection.doc(newDoc.id);
        }
        else {
            const newDoc = await formSubmissionCollection.add({});
            submissionDocRef = formSubmissionCollection.doc(newDoc.id);
        }
        let hasDistrict = "";
        let isbooked = false;
        let subsUsed =[];
        let ageGp="";
        for (const key in response) {
            const value = response[key];
            const data = {};
            if(key === 'district')
            {
                hasDistrict = value;
            }
            if(key === 'isBooked' && value === 'Yes')
            {
                isbooked = true;
            }
            if(key === 'substance_used')
            {
                subsUsed = value;
            }
            if(key === 'age') ageGp = value;

            data[key] = value;
            submissionDocRef.update(data);
        }
        if(hasDistrict.length>0)
        {
            updateDistrictCollection(hasDistrict,isVolunteerForm,isbooked,subsUsed,ageGp);
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

const updateDistrictCollection = async (dist,isVolunteerForm,isbooked,subsUSed,age)=>{
    const districtDocRef = districtCollection.doc(dist);
    const snapshot = await districtDocRef.get();
    if(snapshot.exists)
    {
        try {
            let counselling = snapshot.data()['counselling']+ (isbooked)?1:0;
            let forms_filled = snapshot.data()['forms_filled']+1;
            let volunteer = snapshot.data()['volunteer'] + (isVolunteerForm)?1:0;
            const ageGroup = snapshot.data()['ageGroup'];
            const substanceUsed = snapshot.data()['substanceUsed'];
            for(let i=0;i<4;i++)
            {
                if(subsUSed.includes(substance[i]))
                {
                    substanceUsed[i].bar++;
                }
            }
            let ind = ageGroups.indexOf(age);
            if(ind!=-1) ageGroup[ind].bar++;

            districtDocRef.set({
                counselling,
                forms_filled,
                volunteer,
                chartdata,
            },{merge:true});
        } catch (error) {
            console.log(error);
        }
    }
    else //If this document is not there
    {
        let myMap = JSON.parse(JSON.stringify(myDistMap));
        myMap.forms_filled = 1;
        if(isbooked) myMap.counselling = 1;
        if(isVolunteerForm) myMap.volunteer = 1;
        for(let i=0;i<4;i++)
        {
            if(subsUSed.includes(substance[i]))
            {
                myMap.substanceUsed[i].bar = 1;
            }
        }
        let ind = ageGroups.indexOf(age);
        if(ind!=-1) myMap.ageGroup[ind].bar = 1;
        districtDocRef.set(myMap);
    }
    
}
// module.exports = {submitResponse};
export {submitResponse};