import { setFeedbackData, clearFeedbackData, hideFeedback } from "../slices/feedbackSlice";
import { firestore } from '../config/firebase';
import { addDoc, collection } from "firebase/firestore";

export const submitFeedbackDB = (feedbackData) => async (dispatch) => {
    try {
        dispatch(setFeedbackData(feedbackData));
        const collectionRef = collection(firestore, 'feedbacks');
        await addDoc(collectionRef, feedbackData);
        dispatch(clearFeedbackData());
    } catch (error) {
        console.error("Couldn't submit the form", error);
    }
};