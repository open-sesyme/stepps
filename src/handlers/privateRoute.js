import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/authSlice';

const PrivateRoute = ({ children}) => {
    const user = useSelector(selectUser);

    return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;