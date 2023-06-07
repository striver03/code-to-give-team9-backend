const {writeFileSync} = require('fs')

const db = require('../db/connect');
const { start } = require('repl');
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

const createForm = async (req, res) => {
    const { formName, createdBy} = req.body;

    if (!formName || !createdBy) {
      return res.status(400).json({error: 'Something is missing!'});
    }

    const docRef = await formCollection.add({ createdBy: createdBy, formName: formName});
    const formID = docRef.id;
    writeFileSync('./local/formID.txt', formID);

    res.status(200).json({msg: `Form created with ID: ${formID}`});
  }

module.exports = {getForm, createForm};