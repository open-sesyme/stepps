import React from 'react'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import TopMenu from '../components/TopMenu'
import { useDispatch, useSelector } from 'react-redux';
import Feedback from '../components/Feedback';
import { showFeedback, hideFeedback, selectFeedbackVisibility } from '../slices/feedbackSlice';

const MainLayout = () => {
  const dispatch = useDispatch();
  const isFeedbackVisible = useSelector(selectFeedbackVisibility);

  const toggleFeedback = () => {
    if (isFeedbackVisible) {
      dispatch(hideFeedback());
    } else {
      dispatch(showFeedback());
    }
  };

  return (
    <div className='main-layout'>
        <SideBar onFeedbackClick={toggleFeedback} />
        <div className='main-side'>
            <TopMenu />
            <div className='router-view-container'>
                {isFeedbackVisible && <Feedback onClose={toggleFeedback} />}
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default MainLayout