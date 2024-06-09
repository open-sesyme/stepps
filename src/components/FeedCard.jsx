import React from 'react';
import { formatDate } from '../helpers/dateFormatter';
import { useDispatch, useSelector } from 'react-redux';
import { likeRecognition, unlikeRecognition } from '../actions/recognitionActions';
import { selectUser } from '../slices/authSlice';

const FeedCard = ({recognition}) => {
    const dispatch = useDispatch();
    const userID = useSelector(selectUser);

    
    const handleLike = () => {
        if (recognition.likedBy && recognition.likedBy.includes(userID.email)) {
            dispatch(unlikeRecognition(recognition.id, userID.email));
        } else {
            dispatch(likeRecognition(recognition.id, userID.email));
        }
    };

    const isLiked = recognition.likedBy && recognition.likedBy.includes(userID.email);

    return (
        <div className='feed-card shadow-sm'>
            <div className='header-part'>
                <div className='user-names'>
                    <p><span className='giver'>{recognition.createdByName}</span> gave <span className='point'>{recognition.points} points</span> to <span className='receiver'>{recognition.employeeByName}</span></p>
                </div>
                <div className='more'>
                    <span className='time-created'>{formatDate(recognition?.dateCreated)}</span>
                    <button type='button' className='more-opt'><i className='bi bi-three-dots'></i></button>
                </div>
            </div>
            <div className="details-container">
                <div className='details'>
                    <div className='message-side'>
                        <p className='message'>{recognition.message}</p>
                        <span className='impression'>#{recognition.impression}</span>
                    </div>
                    <div className="points-side">
                        <h1>{recognition.points}</h1>
                        <span>Points</span>
                    </div>
                </div>
            </div>
            <div className='reactions'>
                <button type='button' className={`like-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
                    ({recognition.likes || 0}) Back This
                </button>
                <button type='button' className='comment-btn'>(0) Comments</button>
            </div>
        </div>
    )
}

export default FeedCard;