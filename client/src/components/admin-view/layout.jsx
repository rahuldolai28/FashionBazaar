import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './sidebar'
import AdminHeader from './header'

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className='flex min-h-screen w-full'>
        {/* Sidebar can be added here */}
        <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} ></AdminSidebar>
        <div className='flex flex-1 flex-col'>
            {/* admin header */}
            <AdminHeader setOpen={setOpenSidebar} ></AdminHeader>
            <main className='flex-1 flex-col bg-muted/40 p-4 md:p-6 '>
                <Outlet></Outlet>
            </main>
        </div>

    </div>
  )
}

export default AdminLayout