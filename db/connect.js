require('dotenv').config();

const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
// const serviceAccount = process.env.serviceAccountKey;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;