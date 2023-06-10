const db = require('../db/connect');
const formCollection = db.collection('forms');

const getForm = async (req, res) => {
    const {formID} = req.query;
    const snapshot = await formCollection.doc(formID).get();
    const startPath = snapshot.data().start;
    console.log(startPath);

    if (!formID) {
        return res.status(400).json({error: 'Missing formID'});
    }

    formCollection.doc(formID).collection('questions')
    .get()
    .then((querySnapshot) => {
        const docs = querySnapshot.docs.map(doc => doc.data());
        res.status(200).json({docs,startPath});
      });
};

const createForm = (req, res) => {
  const {formID} = req.query;
  const {formName, createdBy, isVolunteer, isDraft} = req.body;

  if (!formName || !createdBy || isVolunteer === undefined || isDraft === undefined) {
    return res.status(400).json({error: 'Something is missing!'});
  }

  const formDocRef = formCollection.doc(`${formID}`);
  formDocRef.set({
    createdBy: createdBy,
    formName: formName,
    isVolunteer: isVolunteer,
    isDraft: isDraft
  });

  return res.status(200).json({msg: `Form created`});
}

module.exports = {getForm, createForm};