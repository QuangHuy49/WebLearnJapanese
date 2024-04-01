import React from 'react';
import Header from '../../components/user/Header';
import Sidebar from '../../components/user/Sidebar';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
    return (
        <div>
            <Header />
            <div className="flex overflow-hidden pt-12 bg-white min-h-screen">
                <Sidebar />
                <div id="main-content" className="h-full w-full bg-white relative lg:ml-6 mx-2 mt-3 border border-gray-200 rounded-md">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default UserLayout;