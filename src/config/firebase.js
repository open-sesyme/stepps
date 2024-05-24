import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAe7TLNF1VR5CA7g0BUqcrqUv_s7mAbnL8",
	authDomain: "stepps-81d47.firebaseapp.com",
	projectId: "stepps-81d47",
	storageBucket: "stepps-81d47.appspot.com",
	messagingSenderId: "262772715931",
	appId: "1:262772715931:web:c0e19bf4486d457042713e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app)