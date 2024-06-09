import {
  setRecognitionData,
  clearRecognitionData,
  fetchRecognitionFailure,
  fetchRecognitionSuccess,
  fetchRecognitionStart 
} from '../slices/recognitionSlice';
import { firestore } from '../config/firebase';
import {collection, addDoc, updateDoc, doc, arrayUnion, arrayRemove, query, onSnapshot, getDoc, orderBy, increment } from "firebase/firestore";
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

      const employeeRef = doc(firestore, 'employees', recognitionData.employee);
      await updateDoc(employeeRef, {
          points: increment(recognitionData.points)
      });

      dispatch(clearRecognition());
      dispatch(showToast({ message: "Recognition created successfully", success: true }));
    } catch (error) {
      dispatch(showToast({ message: "Failed to create recognition", success: false }));
    }
};

const getUserDetails = async (firestore, userId) => {
  const userRef = doc(firestore, 'employees', userId);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? userDoc.data().name : 'Unknown Employee';
};

export const fetchRecognition = () => async (dispatch) => {
  dispatch(fetchRecognitionStart());
  try {
    let q = query(collectionRef, orderBy("dateCreated", "desc"));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const recognitionList = await Promise.all(snapshot.docs.map(async(docx) => {
        let recognitionData = docx.data();

        const createdByName = await getUserDetails(firestore, recognitionData.createdBy);

        const employeeByName = await getUserDetails(firestore, recognitionData.employee);

        return {id: docx.id, ...recognitionData, createdByName, employeeByName}
      }));

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
