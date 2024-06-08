import React, { useState } from 'react'
import { addEmployeeToFirestore } from '../actions/employeeActions'
import { useDispatch } from 'react-redux'

const CreateEmployee = ({onClose}) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        jobTitle: '',
        department: '',
        phone: '',
        employmentDate: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateName = (name) => {
        const words = name.trim().split(/\s+/);
        return words.length >= 2;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedData = Object.fromEntries(Object.entries(formData).map(([key, value]) => [key, value.trim()]));

        if (!validateName(trimmedData.name)) {
            setError('Full Name must contain at least two words.');
            return;
        }

        dispatch(addEmployeeToFirestore(trimmedData));
        setError('');
        onClose();
    };

    const handleAddMore = (e) => {
        e.preventDefault();
        const trimmedData = Object.fromEntries(Object.entries(formData).map(([key, value]) => [key, value.trim()]));

        if (!validateName(trimmedData.name)) {
            setError('Full Name must contain at least two words.');
            return;
        }

        dispatch(addEmployeeToFirestore(trimmedData));
        setFormData({
          name: '',
          email: '',
          jobTitle: '',
          department: '',
          phone: '',
          employmentDate: '',
        });
    };

    return (
        <div className='create-employee shadow'>
            <div className="header">
                <h4>Add Employee</h4>
                <button type='button' className='close-btn' onClick={onClose}><i className='bi bi-x-lg'></i></button>
            </div>
            <div className='form-container'>
                <form method="post">
                    <div class="form-group">
                        <label htmlFor="name" className='required-field'>Full Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder='Full Name (e.g. John Doe)'/>
                        {error && <p className="error-message text-danger">{error}</p>}
                    </div>
                    <div class="form-group">
                        <label htmlFor="email" className='required-field'>Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder='Email'/>
                    </div>
                    <div class="form-group">
                        <label htmlFor="job-title">Job Title</label>
                        <input type="text" id="job-title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder='Job Title'/>
                    </div>
                    <div class="form-group">
                        <label htmlFor="department">Department/Unit</label>
                        <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} placeholder='Department/Unit'/>
                    </div>
                    <div class="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder='Phone'/>
                    </div>
                    <div class="form-group">
                        <label htmlFor="employmentDate">Employment Date</label>
                        <input type="date" id="employmentDate" name="employmentDate" value={formData.employmentDate} onChange={handleChange}/>
                    </div>
                </form>
            </div>
            <div className="action-btns">
                <button type='button' className='add' onClick={handleSubmit}>Create</button>
                <button type='button' className='add-more' onClick={handleAddMore}>Add and add another</button>
                <button type='button' className='cancel-btn' onClick={onClose}>Cancel</button>
            </div>
        </div>
    )
}

export default CreateEmployee