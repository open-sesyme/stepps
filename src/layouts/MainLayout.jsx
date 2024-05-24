import React from 'react'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import TopMenu from '../components/TopMenu'

const MainLayout = () => {
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