import {createBrowserRouter, Route, createRoutesFromElements} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route key="login" path="/" element={<Login />} />,
        <Route key="register" path="/register" element={<Register />} />,
        <Route key="home-page" path="/dashboard" element={<HomePage />} />,
    ])
);

export default router;