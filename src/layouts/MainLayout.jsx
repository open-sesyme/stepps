import React, { useEffect } from 'react'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import TopMenu from '../components/TopMenu'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from "../actions/userActions"
import { selectUser} from "../slices/authSlice";


const MainLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  useEffect(() => {
    dispatch(fetchUser(user?.email))
  }, [dispatch, user])
  return (
    <div className='main-layout'>
        <SideBar />
        <div className='main-side'>
            <TopMenu />
            <div className='router-view-container'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default MainLayout