const admin = require('firebase-admin');
const db = require('../db/connect');
const userCollection = db.collection('users');
const ageCollection = db.collection('age');
const typeOfDrugCollection = db.collection('type of drug');

const userID = "";

const addName = async (req,res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const user = userCollection.doc(id);
        await user.set({name: name}, {merge: true});
        userID = id;
        res.status(200).json({msg: 'Success Add User Name!'});
    } catch (error) {
        console.log(error);
        res.status(404).send("Path not found!");
    }
};

const addAge = async (req,res) => {
    try {
        const id = req.params.id;
        const age = req.body.age;
        const user = userCollection.doc(id);
        const docRef = await typeOfDrugCollection.doc('alcohol');

        await user.set({age: age}, {merge: true});
        await docRef.update({
            [`age bracket.${age}`]: admin.firestore.FieldValue.increment(1)
        });
        res.status(200).json({msg: 'Success Add User Age!'});
    } catch (error) {
        console.log(error);
        res.status(404).send("Path not found!");
    }
};

const addCollegeName = async (req,res) => {
    try {
        const id = req.params.id;
        const college = req.body.college;
        const user = userCollection.doc(id);
        await user.set({college: college}, {merge: true});
        res.status(200).json({msg: 'Success Add User College!'});
    } catch (error) {
        console.log(error);
        res.status(404).send("Path not found!");
    }
};

const addLocality = async (req,res) => {
    try {
        const id = req.params.id;
        const locality = req.body.locality;
        const user = userCollection.doc(id);
        await user.set({locality: locality}, {merge: true});
        res.status(200).json({msg: 'Success Add User Locality!'});
    } catch (error) {
        console.log(error);
        res.status(404).send("Path not found!");
    }
};

module.exports = {
    userID,
    addName,
    addAge,
    addCollegeName,
    addLocality
};