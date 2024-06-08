import React from 'react'
import { Outlet } from 'react-router-dom';

const Employees = () => {
    
    return (
        <div id='employees_page'>
            <Outlet />
        </div>
    )
}

export default Employees