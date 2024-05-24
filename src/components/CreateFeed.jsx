import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { publishRecognition } from '../actions/recognitionActions';
import { POINTS } from '../constants/Points';

const employees = [
    {name: "John Doe", email: 'john@email.com', userID: 123456},
    {name: "Jessica Nkosi", email: 'jess@email.com', userID: 2356},
    {name: "Nkosazana Daughter", email: 'daughter@email.com', userID: 12336},
    {name: "Jane Doe", email: 'jane@email.com', userID: 12556}
]
const CreateFeed = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedPoints, setSelectedPoints] = useState(null);
    const [selectedImpression, setSelectedImpression] = useState(null);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const handleEmployeeChange = (event, selected) => {
        setSelectedEmployee(selected);
    }

    const handlePublishRecognition = () => {
        // if (!selectedEmployee || !selectedPoints || !selectedImpression) return;

        const recognitionData = {
            employee: selectedEmployee,
            points: selectedPoints,
            impression: selectedImpression,
            message,
            dateCreate: Date.now(),
            dateUpdate: Date.now(),
        }

        dispatch(publishRecognition(recognitionData));

        setSelectedEmployee(null);
        setSelectedPoints(null);
        setSelectedImpression(null);
        setMessage('');
    }

    const discardCreateRecognition = () => {
        setSelectedEmployee(null);
        setSelectedPoints(null);
        setSelectedImpression(null);
        setMessage('');
    }

    return (
        <div className='create-feed'>
            <h4>Recognize someone</h4>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={employees.map((option) => option.name)}
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
                                <input type="radio" name="points" id={`point${points}`} value={points} checked={selectedPoints === points} onChange={(e) => setSelectedPoints(points)}/>
                                <label htmlFor={`point${points}`}>{ points }</label>
                            </div>
                        ))}
                    </div>
                    <span>Impression:</span>
                    <div className='impressions'>
                        <div className="radio-group">
                            <input type="radio" name='impression' id='thank-you' value="thankyou" onChange={(e) => setSelectedImpression(e.target.value)}/>
                            <label htmlFor="thank-you">Thank you!</label>
                        </div>
                        <div className="radio-group">
                            <input type="radio" name='impression' id='good-job' value="goodjob" onChange={(e) => setSelectedImpression(e.target.value)}/>
                            <label htmlFor="good-job">Good job!</label>
                        </div>
                        <div className="radio-group">
                            <input type="radio" name='impression' id='impressive' value="impressive" onChange={(e) => setSelectedImpression(e.target.value)}/>
                            <label htmlFor="impressive">Impressive!</label>
                        </div>
                        <div className="radio-group">
                            <input type="radio" name='impression' id='exceptional' value="exceptional" onChange={(e) => setSelectedImpression(e.target.value)}/>
                            <label htmlFor="exceptional">Exceptional!</label>
                        </div>
                    </div>
                    <textarea name="message" id="message" placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
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