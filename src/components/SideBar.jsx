import React from 'react'
import Logo from "../assets/img/Logo.png";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutOut } from "../actions/authActions";
import { selectUser} from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    
    const handleLogoutOut = () => {
        dispatch(logoutOut());
    };

    if (!user) {
        navigate("/");
        localStorage.setItem("isAuthenticated", false);
    }

    return (
        <div className='sidebar'>
            <div className='logo-container'>
                <img src={Logo} alt="stepps logo" />
            </div>
            <ul className='list-unstyled sidebar-menu'>
                <li className='menu-item'>
                    <NavLink to="/home" className={({isActive}) => isActive ? "active-tab" : '' }><span><i class="bi bi-grid-1x2-fill"></i></span> Home</NavLink>
                </li>
                <li className='menu-item'>
                    <NavLink to="/honors-roll" className={({isActive}) => isActive ? "active-tab" : '' }><span><i class="bi bi-list-ol"></i></span> Honors Roll</NavLink>
                </li>
                <li className='menu-item'>
                    <NavLink to="/employees" className={({isActive}) => isActive ? "active-tab" : '' }><span><i class="bi bi-people-fill"></i></span> Employees</NavLink>
                </li>
                <li className='menu-item'>
                    <NavLink to="/profile" className={({isActive}) => isActive ? "active-tab" : '' }><span><i class="bi bi-person-fill"></i></span> Profile</NavLink>
                </li>
                <li className='menu-item'>
                    <NavLink to="/support" className={({isActive}) => isActive ? "active-tab" : '' }><span><i class="bi bi-life-preserver"></i></span> Support</NavLink>
                </li>
            </ul>

            <ul className='list-unstyled bottom-menu'>
                <li className='menu-item'>
                    <NavLink to="/feedback" className={({isActive}) => isActive ? "active-tab" : '' }><span><i class="bi bi-chat-left-dots-fill"></i></span> Feedback</NavLink>
                </li>
                <li className='menu-item'>
                    <button className='logout-btn' onClick={handleLogoutOut}><span><i class="bi bi-box-arrow-right"></i></span> Logout</button>
                </li>
            </ul>
        </div>
    )
}

export default SideBar