const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('../bdFirebase/backendcurso-firebase-adminsdk-c9rn8-231e263eeb.json', 'utf8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

//exporto la db para poder usarla en server.js
module.exports = db;