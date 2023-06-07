const db = require('../db/connect');
const userCollection = db.collection('users');

const getAllUsersData = async (req,res) => {
    try {
        const snapshot = await userCollection.get();
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
        });
        res.status(200).json({msg: 'Success All Users Data!'});
    } catch (error) {
        res.status(404).send("Path not found!");
    }
};

const getUserData = async (req,res) => {
    try {
        const {id : userID} = req.params;
        const user = userCollection.doc(userID);
        const snapshot = await user.get();
        console.log(snapshot.data());
        res.status(200).json({msg: 'Success Get User Data!'});
    } catch (error) {
        res.status(404).send("Path not found!");
    }
};

const addUserData = async (req,res) => {
    try {
        await userCollection.add(req.body);
        res.status(200).json({msg: 'Success Add User Data!'});
    } catch (error) {
        console.log(error);
        res.status(404).send("Path not found!");
    }
};

const updateUserData = async (req,res) => {
    try {
        const {id : userID} = req.params;
        const user = userCollection.doc(userID);
        await user.update(req.body);
        res.status(200).json({msg: 'Success Update User Data!'});
    } catch (error) {
        console.log(error);
        res.status(404).send("Path not found!");
    }
};

const deleteUserData = async (req,res) => {
    try {
        const {id : userID} = req.params;
        const user = userCollection.doc(userID);
        await user.delete();
        res.status(200).json({msg: 'Success Delete User Data!'});
    } catch (error) {
        res.status(404).send("Path not found!");
    }
};

module.exports = {
    getAllUsersData,
    getUserData,
    addUserData,
    updateUserData,
    deleteUserData
};