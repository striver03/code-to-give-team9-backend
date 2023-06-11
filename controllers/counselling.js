import db from "../db/connect.js";
const counsellingBookedCollection = db.collection('counselling-booked');

const getCounsellingData = async(req,res)=>{
    counsellingBookedCollection
    .get()
    .then(async (querySnapshot) => {
        const docs = querySnapshot.docs.map(doc => doc.data());
        const data = [];
        for(let idx in docs)
        {
          try {
            let formSumissionId = docs[idx].submission;
            const formSubmissionDocRef = db.collection("form-submissions").doc(formSumissionId);
            const snapshot = await formSubmissionDocRef.get();
            data.push(snapshot.data());
          } catch (error) {
            res.send("failed with error: " + error);         
          }
        }
        res.status(200).json({data});
      }).catch((error)=>{
        res.send("failed with error: " + error);
      });
}

export {getCounsellingData};