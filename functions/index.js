const functions = require("firebase-functions");
const admin = require('firebase-admin');
const short = require('short-uuid');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const stripe  = require('stripe')(process.env.STRIPE_API_KEY);
const { uuidv4 } = require("@firebase/util");

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const startOfDate = (targetDate) => {
    const date = new Date();
    date.setHours(0,0,0,0);
    date.setDate(targetDate.getDate());
    date.setMonth(targetDate.getMonth());
    date.setFullYear(targetDate.getFullYear());
    return new Date(date);
}

const endOfDate = (targetDate) => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    date.setDate(targetDate.getDate());
    date.setMonth(targetDate.getMonth());
    date.setFullYear(targetDate.getFullYear());
    return new Date(date);
}

const detectIntersection = (startA, startB, endA, endB) => {
    startA = new Date(startA).getTime();
    startB = new Date(startB).getTime();
    endA = new Date(endA).getTime();
    endB = new Date(endB).getTime();
 
    if (startA < startB && startB < startA) return true;
    if (startA <= endB && endB <= endA) return true;
    if (startB < startA && endA < endB) return true;

    else return false;
}

const isGuestUser = (reservationData) => !Object.hasOwn(reservationData, 'id');

exports.createUser = functions.https.onRequest(async(req, res) => {
    return cors()(req, res, async() => {
        const { data } = req.body;
        const userInfo = Object.assign(data, {id: data.id, loyaltyId: short.generate(), loyaltyPoints: 0});
        
        try {
            await admin.firestore().collection('users').doc(data.id).set(userInfo);
            res.send({data: req.body});
        } catch(ex) {
            res.send({ data: { message: "User creation failed", description: 'Something went wrong while creating a new user', error: ex } });
        }
    });
});


exports.createPaymentIntent = functions.https.onRequest(async (req, res) => {
    return cors()(req, res, async() => {
        const { data } = req.body;

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: (data.total * 100),
                currency: 'usd',
                automatic_payment_methods: { enabled: true }
            });
    
            res.send({ data: {clientSecret: paymentIntent.client_secret} });
        } catch(ex) {
            res.send({ data: { message: "Payment failed", message: 'Something went wrong while processing the payment', error: ex }});
        }
    });
});

exports.makeReservation = functions.https.onRequest(async (req, res) => {
    return cors()(req, res, async() => {
        const { data } = req.body;
        const db = admin.firestore();
        const guest = isGuestUser(data);

        // If the user is a guest, we want to assign them an ID
        if (guest)
            data.id = uuidv4();

        try {
            data.tables.forEach(async (table) => {
                await db.collection('schedule').add(Object.assign(table, { userId: data.id, startDate: new Date(data.startDate), endDate: new Date(data.endDate) }));
            });
    
            await db.collection('reservations').add(data);

            // If the user is a guest we now create a user document for them and set the `guest` flag to true
            if (guest) {
                await db.collection('users').doc(data.id).set({ id: data.id, name: data.name, email: data.email, guest: true });
            } else {
                await db.collection('users').doc(data.id).update({ loyaltyPoints: (data.loyaltyPoints + data.total) })
            }
            res.send({ data });
        } catch(ex) {
            res.send({ message: "Reservation failed", description: "Something went wrong while making your reservation", error: ex })
        }

    });
});


exports.findTables = functions.https.onRequest(async (req, res) => {
    return cors()(req, res, async() => {
        const { startDate, endDate } = req.body.data;

        const dateStart = startOfDate(new Date(endDate));
        const dateEnd = endOfDate(new Date(endDate))

        if (dateStart.getTime() < new Date()) {
            res.send({ data: { message: "Invalid date", description: 'Reservation date cant be in the past', error: {}} })
            return;
        }

        let availableTables = [];
        let scheduleTables = [];

        try {
            const tablesQuery = await admin.firestore().collection('tables').get();
            tablesQuery.forEach(doc => {
                const table = Object.assign({ tableId: doc.id }, doc.data());
                availableTables.push(table);
            });
    
            const scheduleQuery = await admin.firestore().collection('schedule').where("endDate", ">=", dateStart).where("endDate", "<=", dateEnd).get();
            scheduleQuery.forEach(doc => {
                const table = doc.data();
                const {tableId, startDate, endDate} = table;
                scheduleTables.push({ tableId, startDate: startDate.toDate(), endDate: endDate.toDate() });
            });
    
            scheduleTables.forEach(table => {
                const intersect = detectIntersection(table.startDate, startDate, table.endDate, endDate);
                if (intersect) {
                    availableTables = availableTables.filter(t => t.tableId !== table.tableId);
                }
            });

            res.send({ data: availableTables });
        } catch(ex) {
            res.send({ data: { message: "Coudn't load tables", description: 'Something went wrong while looking for tables', error: ex } });
        }

    });
});