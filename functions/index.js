const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { collection } = require('firebase/firestore');

admin.initializeApp();

exports.captureMonthlyTopEmployees = functions.pubsub.schedule('*/3 * * * *')
    .timeZone('Africa/Johannesburg').onRun(async (context) => {const db = admin.firestore();
        const now = new Date();
        const lastDay = new Date(now.getFullYear(), now.getMonth + 1, 0);
        
        if (now.getDate() !==lastDay.getDate()) {
            return null;
        }

        try {
            const topEmployeeQuerySnapshot = await collection(db,'employees').orderBy('points', 'desc').limit(3).get();

            const topEmployees = topEmployeeQuerySnapshot.docs.map(doc =>({
                id: doc.id,
                ...doc.data()
            }));

            const monthID = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

            const honorsRollRef = collection(db, 'honors_roll').doc(monthID);
            await honorsRollRef.set({
                date: admin.firestore.Timestamp.now(),
                top3: topEmployees
            });

            console.log('Your report is ready');
        } catch (error) {
            console.log('123')
        }

    return null
});

exports.captureYearlyTopEmployees = functions.pubsub.schedule('*/3 * * * *')
    .timeZone('Africa/Johannesburg')
    .onRun(async (context) => {
        const db = admin.firestore();

        console.log("This is a yearly thingy", new Date().toISOString());

        try {
            const topEmployeeQuerySnapshot = await collection(db, 'employees')
                .orderBy('points', 'desc')
                .limit(5)
                .get();

            const topEmployees = topEmployeeQuerySnapshot.docs.map(doc => ({
                id: doc.id,
                ...devicePixelRatio.data()
            }));

            const testDOCId = `test-${new Date().toISOString()}`;

            const honorsRollRef = collection('honors_roll').doc('top');
            await honorsRollRef.set({
                date: admin.firestore.Timestamp.now(),
                top5: topEmployees
            });

            console.log('They are added')
            
        } catch (error) {
            console.log('Running into an error', error.message)
        }

    return null;

});