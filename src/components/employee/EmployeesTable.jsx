import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchEmployees } from '../../actions/employeeActions';

const EmployeesTable = () => {
    const dispatch = useDispatch();
    const { employeeList, loading, error} = useSelector(state => state.employee);

    useEffect(() => {
        dispatch(fetchEmployees())
    }, [dispatch]);
    return (
        <>
            <div className="filter-part">
                <div className="search-container">
                    <i class="bi bi-search"></i>
                    <input type="search" name='search' id='search' placeholder='Search here'/>
                </div>
                <div className='filter-container'>
                    <button type='button' className='filter-btn'><i className='bi bi-filter'></i> Filters</button>
                </div>
            </div> 
            <div className='employee-table'>
                <div className='table-head'>
                    <div className="table-row">
                        <div className='table-item'>Name</div>
                        <div className='table-item'>Email</div>
                        <div className='table-item'>Job Title</div>
                        <div className='table-item'>Department/Unit</div>
                        <div className='table-item'>Phone</div>
                        <div className='table-item'>Points</div>
                        <div className='table-item'>Employment Date</div>
                        <div className='table-item'>Last Active</div>
                    </div>
                </div>
                <div className="table-body">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : employeeList.length > 0 ? (
                        employeeList.map((employee, index) => (
                        <div className="table-row" key={index}>
                            <div className="table-item"><Link to={`/profile/${employee.id}`}>{employee.name}</Link></div>
                            <div className="table-item" title={employee.email}>{employee.email}</div>
                            <div className="table-item" title={employee.jobTitle}>{employee.jobTitle}</div>
                            <div className="table-item" title={employee.department}>{employee.department}</div>
                            <div className="table-item" title={employee.phone}>{employee.phone}</div>
                            <div className="table-item" title={employee.points}>{employee.points}</div>
                            <div className="table-item" title={employee.employmentDate}>{employee.employmentDate}</div>
                            <div className="table-item" title={employee.lastActive}>{employee.lastActive}</div>
                        </div>
                        ))
                    ) : (
                        <p>No employees found</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default EmployeesTable