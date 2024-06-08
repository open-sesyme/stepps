import { setUser, setError, setLoading, logout } from "../slices/authSlice";
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../config/firebase";

export const signIn = (email, password) => async (
    dispatch
) => {
    dispatch(setLoading(true));
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("user", JSON.stringify(userCredential.user));
        dispatch(setLoading(false));
        dispatch(setUser(userCredential.user.uid));
    } catch (error) {
        if (error.code === "auth/user-not-found") {
            dispatch(setError("User not found."));
        } else if (error.code === "auth/wrong-password" || 'auth/invalid-email') {
            dispatch(setError("Wrong Email or Password"));
        } else {
            dispatch(setError("Login failed. Please try again."));
        }
    } finally {
        dispatch(setLoading(false))
    }

};
    
export const logoutOut = () => async (dispatch) => {
    try {
        await signOut(auth);
        localStorage.removeItem("user");
        dispatch(logout());
    } catch (error) {
        dispatch(setError(error.message));
    }
};