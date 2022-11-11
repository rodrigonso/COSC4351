const functions = require("firebase-functions");
const admin = require('firebase-admin');
const short = require('short-uuid');
admin.initializeApp();
var cors = require('cors');



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.createUser = functions.https.onRequest(async(req, res) => {
    return cors()(req, res, async() => {
        const { data } = req.body;
        const userInfo = Object.assign(data, {id: data.id, loyaltyId: short.generate(), loyaltyPoints: 0});

        await admin.firestore().collection('users').doc(data.id).set(userInfo);
        res.send({data: req.body});
    });
});