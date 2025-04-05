import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

const AdminDashboard = () => {
  return (
    <div className='flex pt-17'>
        <AdminSidebar />
        <div className='ml-16'>
          <Outlet />
        </div>
    </div>
  )
}

export default AdminDashboard
