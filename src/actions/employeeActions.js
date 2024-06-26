import { auth, firestore } from '../config/firebase';
import { doc, setDoc, collection, query, onSnapshot } from 'firebase/firestore';
import { 
    clearEmployeeData,
    fetchEmployeeStart,
    fetchEmployeeSuccess,
    fetchEmployeeFailure,
} from '../slices/employeeSlice'
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const employeeCollectionRef = collection(firestore, 'employees');

const removeEmptyFields = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ''));
};

export const addEmployeeToFirestore = (employeeData) => async (dispatch) => {
    try {
        const { email, ...rest } = employeeData;
        const password = Math.random().toString(36).slice(-8);

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        const docRef = doc(employeeCollectionRef, email);
        const dateCreated = new Date().toISOString();
        const cleanData = removeEmptyFields(rest);
        await setDoc(docRef, { ...cleanData, email, dateCreated, points: 0 });

        await sendPasswordResetEmail(auth, email);
        console.log("User successfully created and email sent", user);
        
        dispatch(clearEmployeeData());
    } catch (error) {
        console.error("Error adding employee: ", error);
    }
};

export const fetchEmployees = () => async (dispatch) => {
    dispatch(fetchEmployeeStart());
    try {
        let q = query(employeeCollectionRef);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const employeeList = snapshot.docs.map((doc) => {
                let employeeData = doc.data();
                return {id: doc.id, ...employeeData}
            });
            dispatch(fetchEmployeeSuccess(employeeList));
        })
        
        return unsubscribe;
    } catch (error) {
        dispatch(fetchEmployeeFailure(error.message));
    }
};

export const addEmployeesFromCSV = (employees) => async (dispatch) => {
    try {
        const addEmployees = employees.map(async (employee) => {
            const { email, ...rest } = employee;
            const password = Math.random().toString(36).slice(-8);

            await createUserWithEmailAndPassword(auth, email, password);
            const employeeDoc = doc(firestore, 'employees', employee.email);
            await setDoc(employeeDoc, {...rest, email, points: 0});

            await sendPasswordResetEmail(auth, email);
        });

        await Promise.all(addEmployees);
    } catch (error) {
        console.error("Error adding from CSV: ", error)
    }
} 