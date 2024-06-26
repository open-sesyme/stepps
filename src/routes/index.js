import {createBrowserRouter, Route, createRoutesFromElements} from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "../handlers/privateRoute";
import Employees from "../pages/Employees";
import EmployeeList from "../components/employee/EmployeeList";
import UploadCSV from "../components/employee/UploadCSV";
import Profile from "../pages/Profile";
import HonorsRoll from "../pages/HonorsRoll";
import Support from "../pages/Support";
import TestPage from "../pages/TestPage";

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route key="login" path="/" element={<Login />} />,
        <Route key="main-layout" path="" element={<MainLayout />}>
            <Route key="home-page" path="/home" element={<PrivateRoute> <HomePage /> </PrivateRoute>} />,
            <Route key="employees" path="/employees" element={<PrivateRoute> <Employees /> </PrivateRoute>}> 
                <Route key="employee-list" path="" element={<EmployeeList />} />,
                <Route key="create-multiple" path="create-employees" element={<UploadCSV />} />,
            </Route>,
            <Route key="profile" path="/profile" element={<PrivateRoute> <Profile /> </PrivateRoute>} />,
            <Route key="honors-roll" path="/honors-roll" element={<PrivateRoute> <HonorsRoll /> </PrivateRoute>} />,
            <Route key="support" path="/support" element={<PrivateRoute> <Support /> </PrivateRoute>} />,
        </Route>,
        <Route key="testing" path="/test-file" element={<TestPage />} />,
    ])
);

export default router;