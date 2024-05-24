import {createBrowserRouter, Route, createRoutesFromElements} from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "../handlers/privateRoute";

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route key="login" path="/" element={<Login />} />,
        <Route key="main-layout" path="" element={<MainLayout />}>
            <Route key="home-page" path="/home" element={<PrivateRoute> <HomePage /> </PrivateRoute>} />,
        </Route>
    ])
);

export default router;