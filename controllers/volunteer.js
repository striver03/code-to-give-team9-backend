import db from "../db/connect.js";
const volunteerSubmissionCollection = db.collection("volunteer-submissions");

const getVolunteer = async (req, res) => {
    volunteerSubmissionCollection
    .get()
    .then((querySnapshot) => {
        const docs = querySnapshot.docs.map(doc => doc.data());
        res.status(200).json({docs});
      }).catch((error)=>{
        res.send("Could not fetch due to error : "+error);
      })
};

export {getVolunteer};