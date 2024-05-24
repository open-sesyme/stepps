import { setRecognitionData, clearRecognitionData } from '../slices/recognitionSlice';
import { firestore } from '../config/firebase';
import {collection, addDoc } from "firebase/firestore"

export const setRecognition = (data) => (dispatch) => {
  dispatch(setRecognitionData(data));
};

export const clearRecognition = () => (dispatch) => {
  dispatch(clearRecognitionData());
};

export const publishRecognition = (recognitionData) => async (dispatch) => {
    try {
      const collectionRef = collection(firestore, 'recognitions');
      await addDoc(collectionRef, recognitionData);
      console.log('Recognition published successfully');
      dispatch(clearRecognition());
    } catch (error) {
      console.error('Error publishing recognition:', error.message);
    }
};