import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <header className="w-full text-gray-700 bg-white body-font shadow-md shadow-neutral-200 fixed z-30">
            <div className="container flex flex-col items-center p-3 mx-auto md:flex-row">
                <Link to="/" className="flex items-center mb-4 font-extrabold text-custom-color-blue title-font md:mb-0 text-2xl pl-[20px]">
                    KUMABERUS
                </Link>
                <div className="w-[400px] mx-auto">
                    <form>
                        <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search" id="default-search" className="block p-1 pl-10 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:border-custom-color-gray" placeholder="Tìm kiếm ..." required />
                            {/* <button type="submit" className="text-white absolute right-2 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                        </div>
                    </form>
                </div>
                {user ? (
                    <div className="items-center h-full pl-6 ml-6 border-l border-gray-200 mr-[20px] flex">
                        <img src={user.user_avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                        <span className="ml-3 text-base font-medium text-custom-color-blue">{user.user_name}</span>
                        {/* <button onClick={handleLogout} className="px-4 py-2 ml-3 text-base text-white transition-all duration-150 bg-custom-color-blue rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease rounded-xl">
                            Đăng xuất
                        </button> */}
                    </div>
                ) : (
                    <div className="items-center h-full pl-6 ml-6 border-l border-gray-200 mr-[20px]">
                        <Link to="/login" className="px-4 py-2 mr-5 font-medium hover:text-gray-900 text-base text-custom-color-blue hover:border-slate-400 hover:text-slate-900 hover:shadow rounded-xl">
                            Đăng nhập
                        </Link>
                        <Link to="/signup"
                            className="px-4 py-2 text-base text-white transition-all duration-150 bg-custom-color-blue rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease rounded-xl">
                            Đăng ký
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;