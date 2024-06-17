import React, { useState } from 'react';
import { selectCurrentUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';

const Profile = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [showDates, setShowDate] = useState(false);

    const handleShowDates = (id) => {
        setShowDate(!showDates)
    }

    return (
        <div id='profile_page'>
            <div className='header-part'>
                <h4>Employee Profile</h4>
            </div>
            <div className='user-details'>
                <div className='profile-pic-side'>
                    <div className="profile-pic">
                        <img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/321289941/original/ef78d4523ccbfea028c454417c2f3504572a3de5/draw-avatar-cartoon-from-your-photo.jpg" alt="User Profile" />
                    </div>
                    <input type="file" name="profile_pic" id="profile_pic"  accept='image/*' hidden/>
                    <label htmlFor="profile_pic"><i className='bi bi-image'></i> Change Profile Image</label>
                </div>
                <div className="details-side">
                    <div className="row">
                        <div className="col-sm-8">
                            <h1>{currentUser?.name} <span className='role'>Employee</span></h1>
                            <h4>{currentUser?.jobTitle}</h4>

                            <ul className="contact-details list-unstyled">
                                <li><a href={`mailto:${currentUser?.email}`}><i className='bi bi-envelope'></i> {currentUser?.email}</a></li>
                                <li><a href={`tel:+27${currentUser?.phone}`}><i className='bi bi-telephone'></i> {currentUser?.phone}</a></li>
                            </ul>

                            <div className='other-details'>
                                <ul className='list-unstyled'>
                                    <li>Department: <strong>{currentUser?.department}</strong></li>
                                    <li>Employment date: <strong>{currentUser?.employmentDate}</strong></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="points">
                                <div>
                                    <span>Total Points</span>
                                    <h2>{currentUser?.points}</h2>
                                </div>
                                {/* <div>
                                    <h4>90</h4>
                                    <span>This Month</span>
                                </div> */}
                            </div>
                            <div className='wins'>
                                <h4>Honors Roll Wins</h4>
                                <ul className='list-unstyled'>
                                    <li> 
                                        <span><button type='button' onClick={handleShowDates}><i className='bi bi-chevron-down'></i></button> Position 1</span> <span className='count'>x4</span>
                                        { showDates &&
                                            <ul className='list-unstyled'>
                                                <li>Jan 2023</li>
                                                <li>Feb 2023</li>
                                                <li>Mar 2023</li>
                                                <li>May 2023</li>
                                            </ul>
                                        }
                                    </li>
                                    <li> 
                                        <span><button type='button' onClick={handleShowDates}><i className='bi bi-chevron-down'></i></button> Position 3</span> <span className='count'>x1</span>
                                        {showDates &&
                                            <ul className='list-unstyled'>
                                                <li>Apr 2023</li>
                                            </ul>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile