import React, { useState } from 'react';
import EmployeesTable from './EmployeesTable';
import CreateEmployee from './CreateEmployee';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const navigate = useNavigate();
    const [showAddEmployee, setShowAddEmployee] = useState(false);

    const handleShowAddEmployee = () => {
        setShowAddEmployee(!showAddEmployee);
    }

    const createMultipleEmployees = () => {
        navigate("create-employees");
    }

    return (
        <>
            <div className="header-part">
                <h4>Employees</h4>
                <div className="action-side">
                    <button type='button' className='create-btn' onClick={handleShowAddEmployee}><i className='bi bi-plus-lg'></i>Add New Employee</button>
                    <button type='button' className='create-multiple' onClick={createMultipleEmployees}><i className='bi bi-file-earmark-plus'></i>Add Multiple Employees</button>
                </div>
            </div>
            <div className="employee-list-container">
                <EmployeesTable />
            </div>
            {showAddEmployee && <CreateEmployee onClose={() => setShowAddEmployee(!showAddEmployee)} />}
        </>
    )
}

export default EmployeeList