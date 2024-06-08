import {
  setRecognitionData,
  clearRecognitionData,
  fetchRecognitionFailure,
  fetchRecognitionSuccess,
  fetchRecognitionStart 
} from '../slices/recognitionSlice';
import { firestore } from '../config/firebase';
import {collection, addDoc, updateDoc, doc, arrayUnion, arrayRemove, query, onSnapshot, getDoc } from "firebase/firestore";
import { showToast } from '../slices/toastSlice';

export const setRecognition = (data) => (dispatch) => {
  dispatch(setRecognitionData(data));
};

export const clearRecognition = () => (dispatch) => {
  dispatch(clearRecognitionData());
};

const collectionRef = collection(firestore, 'recognitions');

export const publishRecognition = (recognitionData) => async (dispatch) => {
    try {
      await addDoc(collectionRef, recognitionData);
      dispatch(clearRecognition());
      dispatch(showToast({ message: "Recognition created successfully", success: true }));
    } catch (error) {
      dispatch(showToast({ message: "Failed to create recognition", success: false }));
    }
};

export const fetchRecognition = () => async (dispatch) => {
  dispatch(fetchRecognitionStart());
  try {
    let q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const recognitionList = snapshot.docs.map((doc) => {
        let recognitionData = doc.data();
        return {id: doc.id, ...recognitionData}
      });
      dispatch(fetchRecognitionSuccess(recognitionList));
    });

    return unsubscribe;
  } catch (error) {
    dispatch(fetchRecognitionFailure(error.message));
  }
};

// Like recognition
export const likeRecognition = (id, userEmail) => async (dispatch) => {
  try {
    const recognitionRef = doc(firestore, 'recognitions', id);

    const recognitionSnap = await getDoc(recognitionRef);
    if (recognitionSnap.exists()) {
      const recognitionData = recognitionSnap.data();
      const currentLikes = recognitionData.likes || 0;

      // Update likes and likedBy fields
      await updateDoc(recognitionRef, { 
        likes: currentLikes + 1, 
        liked: true, 
        likedBy: arrayUnion(userEmail) 
      });
      dispatch(showToast({ message: "Recognition liked successfully", success: true }));
    } else {
      console.error("No such document!");
    }   
  } catch (error) {
    console.error("Error liking recognition: ", error);
    dispatch(showToast({ message: "Failed to like recognition", success: false }));
  }
};

// Unlike recognition
export const unlikeRecognition = (id, userEmail) => async (dispatch) => {
  try {
    const recognitionRef = doc(firestore, 'recognitions', id)
    const recognitionSnap = await getDoc(recognitionRef);
    if (recognitionSnap.exists()) {
      const recognitionData = recognitionSnap.data();
      const currentLikes = recognitionData.likes || 0;

      // Update likes and likedBy fields
      await updateDoc(recognitionRef, { 
        likes: currentLikes > 0 ? currentLikes - 1 : 0, 
        liked: false, 
        likedBy: arrayRemove(userEmail) 
      });
      dispatch(showToast({ message: "Recognition unliked successfully", success: true }));
    } else {
      console.error("No such document!");
    }
  } catch (error) {
    console.error("Error unliking recognition: ", error);
    dispatch(showToast({ message: "Failed to unlike recognition", success: false }));
  }
};
