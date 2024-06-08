import {doc, getDoc} from "firebase/firestore";
import { firestore } from '../config/firebase';
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from "../slices/userSlice";

export const fetchUser = (userEmail) => async (dispatch) => {
    dispatch(fetchUserStart());
    try {
        const userRef = doc(firestore, 'employees', userEmail);
        const userSnap = await getDoc(userRef);
        if(userSnap.exists) {
            const userData = userSnap.data();
            dispatch(fetchUserSuccess(userData));
        }else {
            dispatch(fetchUserFailure("User not found!"))
        }
    } catch (error) {
        dispatch(fetchUserFailure(error.message))
        console.log(error.message);
    }
}