import React from 'react';
import Header from '../../components/admin/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';

const AdminLayout = () => {
    return (
        <div>
            <Header />
            <div className="flex overflow-hidden pt-12 bg-gray-100 min-h-screen">
                <Sidebar />
                <div id="main-content" className="h-full w-full bg-white relative lg:ml-6 mx-2 mt-3 border border-gray-200 rounded-md">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;