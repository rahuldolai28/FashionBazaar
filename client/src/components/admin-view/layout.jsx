import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './sidebar'
import AdminHeader from './header'

function AdminLayout() {
  return (
    <div className='flex min-h-screen w-full'>
        {/* Sidebar can be added here */}
        <AdminSidebar></AdminSidebar>
        <div className='flex flex-1 flex-col'>
            {/* admin header */}
            <AdminHeader></AdminHeader>
            <main className='flex-1 bg-muted/40 p-4 md:p-6 '>
                <Outlet></Outlet>
            </main>
        </div>

    </div>
  )
}

export default AdminLayout