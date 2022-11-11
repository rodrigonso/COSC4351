const functions = require("firebase-functions");
const admin = require('firebase-admin');
const short = require('short-uuid');
const moment = require('moment');
admin.initializeApp();
var cors = require('cors');



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const startOfToday = (targetDate) => {
    const date = new Date();
    date.setHours(0,0,0,0);
    date.setDate(targetDate.getDate());
    date.setMonth(targetDate.getMonth());
    date.setFullYear(targetDate.getFullYear());

    console.log("START OF DAY", new Date(date));

    return new Date(date);
}

const endOfToday = (targetDate) => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    date.setDate(targetDate.getDate());
    date.setMonth(targetDate.getMonth());
    date.setFullYear(targetDate.getFullYear());

    console.log("END OF DAY", new Date(date));
    return new Date(date);
}

const detectIntersection = (startA, startB, endA, endB) => {
    startA = new Date(startA).getTime();
    startB = new Date(startB).getTime();
    endA = new Date(endA).getTime();
    endB = new Date(endB).getTime();
 
    if (startA <= startB && startB <= startA) return true;
    if (startA <= endB && endB <= endA) return true;
    if (startB < startA && endA < endB) return true;

    else return false;
}


exports.createUser = functions.https.onRequest(async(req, res) => {
    return cors()(req, res, async() => {
        const { data } = req.body;
        const userInfo = Object.assign(data, {id: data.id, loyaltyId: short.generate(), loyaltyPoints: 0});

        await admin.firestore().collection('users').doc(data.id).set(userInfo);
        res.send({data: req.body});
    });
});

exports.makeReservation = functions.https.onRequest(async (req, res) => {
    return cors()(req, res, async() => {
        const {data} = req.body;
        const db = admin.firestore();

        console.log(data.startDate, data.endDate);

        data.tables.forEach(async (table) => {
            await db.collection('schedule').add(Object.assign(table, { userId: data.id, startDate: new Date(data.startDate), endDate: new Date(data.endDate) }));
        });

        await db.collection('reservations').add(data);

        res.send({ data });
    });
});


exports.findTables = functions.https.onRequest(async (req, res) => {
    return cors()(req, res, async() => {
        const { startDate, endDate } = req.body.data;

        console.log(startDate, endDate);

        let availableTables = [];
        let scheduleTables = [];

        const tablesQuery = await admin.firestore().collection('tables').get();
        tablesQuery.forEach(doc => {
            const table = Object.assign({ tableId: doc.id }, doc.data());
            availableTables.push(table);
        });

        const scheduleQuery = await admin.firestore().collection('schedule').where("endDate", ">=", startOfToday(new Date(endDate))).where("endDate", "<=", endOfToday(new Date(endDate))).get();
        scheduleQuery.forEach(doc => {
            const table = doc.data();
            scheduleTables.push({ tableId: table.tableId, day: table.day, startDate: table.startDate.toDate(), endDate: table.endDate.toDate() });
        });

        scheduleTables.forEach(table => {
            const intersect = detectIntersection(table.startDate, startDate, table.endDate, endDate);
            if (intersect) {
                availableTables.splice(availableTables.indexOf(table), 1);
            }
        })

        res.send({ data: availableTables });
    });
});