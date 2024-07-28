const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { onSchedule } = require('firebase-functions/v2/scheduler');

admin.initializeApp();

const db = admin.firestore();

exports.monthlyTopEmployees = onSchedule('0 0 1 * *', async () => { 
    try {
        
        const topEmployeeQuery = db.collection('employees')
            .orderBy('points', 'desc')
            .limit(3);

        const snapshot = await topEmployeeQuery.get();

        const topEmployees = snapshot.docs.map((doc) => {
            const { email, points } = doc.data();
            return { id: doc.id, email, points };
        });

        const monthID = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;

        const honorsRollRef = db.collection('honors_roll').doc(monthID);

        await honorsRollRef.set({
            date: admin.firestore.Timestamp.now(),
            top3: topEmployees
        });

        functions.logger.log('Monthly top employees processed successfully.');
    } catch (error) {
        functions.logger.error('Error processing top employees:', error.message);
    }
});

exports.captureYearlyTopEmployees = onSchedule('23 59 30 11 *', async () => {

    try {
        const topEmployeeQuery = db.collection('employees')
            .orderBy('points', 'desc')
            .limit(5);

        const snapshot = await topEmployeeQuery.get();

        const topEmployees = snapshot.docs.map((doc) => {
            const { email, points } = doc.data();
            return { id: doc.id, email, points };
        });

        const yearlyID = `yearly-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;

        const honorsRollRef = db.collection('honors_roll').doc(yearlyID);

        
        await honorsRollRef.set({
            date: admin.firestore.Timestamp.now(),
            top5: topEmployees
        });

        functions.logger.log('Yearly top employees added successfully.');
    } catch (error) {
        functions.logger.error('Error running yearly capture:', error.message);
    }
});