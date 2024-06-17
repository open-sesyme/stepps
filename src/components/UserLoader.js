import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../actions/userActions";
import { selectUser } from "../slices/authSlice";

const UserLoader = ({children}) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (user?.email) {
          dispatch(fetchUser(user.email));
        }
    }, [dispatch, user]);
    
    return <>{children}</>
}

export default UserLoader