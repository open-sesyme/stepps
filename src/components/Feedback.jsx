import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../slices/userSlice';
import { submitFeedbackDB } from '../actions/feedbackActions';
import { hideFeedback } from '../slices/feedbackSlice';

const Feedback = ({ onClose }) => {
    const [feedbackType, setFeedbackType] = useState('feedback');
    const [message, setMessage] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    const validateFeedback = () => {
        const errors = {};
        
        if (!message.trim()) {
          errors.message = 'Message is required';
        } else if (message.length < 10) {
          errors.message = 'Message must be at least 10 characters';
        }
    
        return errors;
    };

    const handleSubmitFeedback = (event) => {
        event.preventDefault();

        const errors = validateFeedback();

        const feedbackData = {
            email: currentUser?.email,
            name: currentUser?.name,
            feedbackType,
            message,
        }

        if(Object.keys(errors).length === 0) {
            dispatch(submitFeedbackDB(feedbackData));
            dispatch(hideFeedback());
        } else {
            setValidationErrors(errors)
        }

        setFeedbackType(null);
        setMessage('');
    }

    return (
        <div className='feedback shadow'>
            <div className="feedback-header">
                <h1>Feedback</h1>
                <button type='button' className='close-btn' onClick={onClose}><i className='bi bi-x'></i></button>
            </div>
            <form action="" method="post">
                <label htmlFor="feedback_type required-field">Feedback Type</label>
                <select name="feedback_type" id="feedback_type" value={feedbackType} onChange={(e) => setFeedbackType(e.target.value)} required>
                    <option value="feedback" selected>Feedback</option>
                    <option value="bug">Bug</option>
                    <option value="idea">Idea</option>
                </select>

                <label htmlFor="message required-field">Message</label>
                <textarea name="message" id="message" placeholder='Start typing a message here...' value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                {validationErrors.message && (
                    <div className="error-text">{validationErrors.message}</div>
                )}
                <div className="action-btns">
                    <button type='submit' className='main-btn' onClick={handleSubmitFeedback}>Send Feedback</button>
                    <button type='button' className='cancel-btn' onClick={onClose}>Cancel</button>
                </div>
                {/* {error && <div className="error-text">{error}</div>} */}
            </form>
        </div>
    )
}

export default Feedback