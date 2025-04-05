import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Dashboard = () => {
  return (
    <div className='flex pt-16'>
        <Sidebar />
        <div className='ml-16'>
          <Outlet />
        </div>
    </div>
  )
}

export default Dashboard
