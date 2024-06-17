import React, { useState } from 'react';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addEmployeesFromCSV } from '../../actions/employeeActions';

const UploadCSV = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [employees, setEmployees] = useState([]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    const handleFileUpload = () => {
        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    const trimmedData = results.data.map(employee => ({
                        name: employee["Full Name"].trim(),
                        email: employee.Email.trim(),
                        jobTitle: employee["Job Title"] ? employee["Job Title"].trim() : "",
                        department: employee["Department/Unit"] ? employee["Department/Unit"].trim() : "",
                        phone: employee.Phone ? employee.Phone.trim() : "",
                        employmentDate: employee["Employment Date"] ? employee["Employment Date"].trim() : "",
                        dateCreated: new Date().toISOString(),
                    }));
                    setEmployees(results.data);
                    console.log(trimmedData); 
                    dispatch(addEmployeesFromCSV(trimmedData));
                },
            });
        }
    };

    const handleDownloadTemplate = () => {
        const csvContent = "data:text/csv;charset=utf-8,Full Name,Email,Job Title,Department/Unit,Phone,Employment Date\nJohn Doe,john.doe@example.com,Software Engineer,Engineering,123-456-7890,2023-01-01";
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'employee_template.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const goBack = () => {
        navigate(-1);
    }
    return (
        <div className='upload-csv'>
            <div className='upload-header'>
                <button className='back-btn' onClick={goBack}><i className='bi bi-arrow-left'></i> Back</button>
                <h4>Add Multiple Employees</h4>
            </div>
            
            { employees.length === 0 &&
                <div className='upload-info'>
                    <div className="info-container">
                        <div className='info-card'>
                            <h4><i class="bi bi-exclamation-circle-fill"></i> Preparing a CSV</h4>
                            <ul>
                                <li>Use supported headings: Full Name, Email, Job Title, Department/Unit, Phone, Employment Date</li>
                                <li>Only Full Name and Email are required. The rest you can leave empty.</li>
                                <li>You can import a maximum of 500 rows</li>
                            </ul>
                            <button onClick={handleDownloadTemplate} className='download-btn'>Download CSV Template <i className='bi bi-download'></i></button>
                        </div>
                        <label htmlFor="csv_file" className='upload-label'>
                            <i class="bi bi-file-earmark-spreadsheet"></i>
                            <h4>Click anywhere to <span>Browse</span></h4>
                            <span>Supports CSV</span>
                        </label>
                        {fileName && <div className='file-name'>Selected file: {fileName}</div>}
                        <input type="file" id='csv_file' accept=".csv" onChange={handleFileChange} hidden/>
                        <button onClick={handleFileUpload} className='start-uploading'>Add Employees</button>
                    </div>
                </div>
            }

            {employees.length > 0 && (
                <div className='list-container'>
                    <div className='header-part'>
                        <h4>Added Employees</h4>
                        <div className='action-btn'>
                            <button type='button' className='add-more-csv' onClick={() => {}}>Add Another CSV</button>
                            <button type='button' className='go-back' onClick={goBack}>Done, Go back</button>
                        </div>
                    </div>
                    <div className='alert bg-success text-white'>Employees successfully added. Please see below added employees.</div>
                    <ol className='list-of-employees'>
                        {employees.map((employee, index) => (
                            <li key={index}>
                                {employee["Full Name"]} - {employee.Email} - {employee["Job Title"]} - {employee["Department/Unit"]} - {employee.Phone} - {employee["Employment Date"]}
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
};

export default UploadCSV