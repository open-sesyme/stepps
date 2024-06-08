import {createBrowserRouter, Route, createRoutesFromElements} from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "../handlers/privateRoute";
import Employees from "../pages/Employees";
import EmployeeList from "../components/EmployeeList";
import UploadCSV from "../components/UploadCSV";

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route key="login" path="/" element={<Login />} />,
        <Route key="main-layout" path="" element={<MainLayout />}>
            <Route key="home-page" path="/home" element={<PrivateRoute> <HomePage /> </PrivateRoute>} />,
            <Route key="employees" path="/employees" element={<PrivateRoute> <Employees /> </PrivateRoute>}> 
                <Route key="employee-list" path="" element={<EmployeeList />} />,
                <Route key="create-multiple" path="create-employees" element={<UploadCSV />} />,
            </Route>,
        </Route>
    ])
);

export default router;