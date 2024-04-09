const firebaseAdmin = require('firebase-admin');

const serviceAccount = require("../asm3-njs-firebase-adminsdk-25p59-234e042379.json");
const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});
const storageRef = admin.storage().bucket(`gs://asm3-njs.appspot.com`);
module.exports = storageRef