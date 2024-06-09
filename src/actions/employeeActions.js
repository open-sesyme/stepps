import { firestore } from '../config/firebase';
import { doc, setDoc, collection, query, onSnapshot } from 'firebase/firestore';
import { 
    clearEmployeeData,
    fetchEmployeeStart,
    fetchEmployeeSuccess,
    fetchEmployeeFailure,
} from '../slices/employeeSlice'

const employeeCollectionRef = collection(firestore, 'employees');

const removeEmptyFields = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ''));
};

export const addEmployeeToFirestore = (employeeData) => async (dispatch) => {
    try {
        const docRef = doc(employeeCollectionRef, employeeData.email);
        const dateCreated = new Date().toISOString();
        const cleanData = removeEmptyFields(employeeData);
        await setDoc(docRef, { ...cleanData, dateCreated, points: 0 });
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
            const employeeDoc = doc(firestore, 'employees', employee.email);
            await setDoc(employeeDoc, employee);
        });

        await Promise.all(addEmployees);
    } catch (error) {
        console.error("Error adding from CSV: ", error)
    }
} 