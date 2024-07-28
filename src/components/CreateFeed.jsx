import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { publishRecognition } from '../actions/recognitionActions';
import { POINTS } from '../constants/Points';
import { fetchEmployees } from '../actions/employeeActions';
import { selectCurrentUser } from '../slices/userSlice';

const MINIMUM_WORD_COUNT = 10;

const CreateFeed = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedPoints, setSelectedPoints] = useState(null);
    const [selectedImpression, setSelectedImpression] = useState(null);
    const [message, setMessage] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();
    const { employeeList, loading, error} = useSelector(state => state.employee);
    const currentUser = useSelector(selectCurrentUser);

    const handleEmployeeChange = (event, selected) => {
        setSelectedEmployee(selected);
    }

    const handlePointsChange = (points) => {
        setSelectedPoints(points);
        setValidationErrors((prevErrors) => ({ ...prevErrors, points: '' }));
    };

    const handleImpressionChange = (value) => {
        setSelectedImpression(value);
        setValidationErrors((prevErrors) => ({ ...prevErrors, impression: '' }));
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        setValidationErrors((prevErrors) => ({ ...prevErrors, message: '' }));
    };

    const validateForm = () => {
        const errors = {};
        
        if (!selectedEmployee) {
            errors.employee = 'Employee selection is required.';
        }
        
        if (!selectedPoints) {
            errors.points = 'Points selection is required.';
        }
        
        if (!selectedImpression) {
            errors.impression = 'Impression selection is required.';
        }
        
        if (message.trim().split(/\s+/).length < MINIMUM_WORD_COUNT) {
            errors.message = `Message must be at least ${MINIMUM_WORD_COUNT} words.`;
        }
        
        setValidationErrors(errors);
        
        return Object.keys(errors).length === 0;
    };

    const handlePublishRecognition = () => {
        if (!validateForm()) return;

        const recognitionData = {
            employee: selectedEmployee.id,
            points: selectedPoints,
            impression: selectedImpression,
            message,
            createdBy: currentUser?.email,
            dateCreated: new Date().toISOString(),
            dateUpdated: new Date().toISOString(),
        }

        dispatch(publishRecognition(recognitionData));

        setSelectedEmployee(null);
        setSelectedPoints(null);
        setSelectedImpression(null);
        setMessage('');
        setValidationErrors(null)
    }

    const discardCreateRecognition = () => {
        setSelectedEmployee(null);
        setSelectedPoints(null);
        setSelectedImpression(null);
        setMessage('');
        setValidationErrors('')
    }

    useEffect(() => {
        dispatch(fetchEmployees())
    }, [dispatch]);

    return (
        <div className='create-feed'>
            <h4>Recognize someone</h4>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={employeeList}
                getOptionLabel={(option) => option.name}
                value={selectedEmployee}
                onChange={handleEmployeeChange}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select Employee" variant="outlined" />}
                className="names-input"
            />
            
            { selectedEmployee !== null ? (
                <>
                    <span>Select Points:</span>
                    <div className='points-list'>
                        { POINTS.map((points) => (
                            <div key={points} className="radio-group">
                                <input type="radio" name="points" id={`point${points}`} value={points} checked={selectedPoints === points} onChange={() => handlePointsChange(points)}/>
                                <label htmlFor={`point${points}`}>{ points }</label>
                            </div>
                        ))}
                    </div>
                    {validationErrors.points && <p className="error-text">{validationErrors.points}</p>}

                    <span>Impression:</span>
                    <div className='impressions'>
                        {['thankyou', 'goodjob', 'impressive', 'exceptional'].map((value) => (
                            <div className="radio-group" key={value}>
                                <input 
                                    type="radio" 
                                    name='impression' 
                                    id={value} 
                                    value={value} 
                                    checked={selectedImpression === value}
                                    onChange={() => handleImpressionChange(value)}
                                />
                                <label htmlFor={value}>{value.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                            </div>
                        ))}
                    </div>
                    {validationErrors.impression && <p className="error-text">{validationErrors.impression}</p>}

                    <textarea 
                        name="message" 
                        id="message" 
                        placeholder='Message' 
                        value={message} 
                        onChange={handleMessageChange}
                        className={validationErrors.message ? 'error' : ''}
                    ></textarea>
                    {validationErrors.message && <p className="error-text">{validationErrors.message}</p>}
                    <div className="action-btns">
                        <button className='main-btn' onClick={handlePublishRecognition}>Publish</button>
                        <button className='border-btn' onClick={discardCreateRecognition}>Discard</button>
                    </div>
                </>
            ) : (
                <>
                    <p className='message-before'>Thank someone for something they have done for you. <a href="/">Learn more</a></p>
                </>
            )

            }
        </div>
    )
}

export default CreateFeed;