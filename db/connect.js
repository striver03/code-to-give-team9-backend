// require('dotenv').config();


// const admin = require('firebase-admin');
import admin from "firebase-admin";

// const serviceAccount = require('../serviceAccountKey.json');
// const serviceAccount = process.env.serviceAccountKey;
import serviceAccount from '../serviceAccountKey.json' assert {type:'json'};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// module.exports = db;
export default db;