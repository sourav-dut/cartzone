import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

const AdminDashboard = () => {
  return (
    <div className='flex'>
        <AdminSidebar />
        <div className='ml-16'>
          <Outlet />
        </div>
    </div>
  )
}

export default AdminDashboard
