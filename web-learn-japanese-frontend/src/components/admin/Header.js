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

    return (
        <header className="w-full text-gray-700 bg-white body-font shadow-md shadow-neutral-200 fixed z-30">
            <div className="container flex flex-col items-center p-3 mx-auto md:flex-row">
                <Link to="/" className="flex items-center mb-4 font-extrabold text-custom-color-blue title-font md:mb-0 text-2xl pl-[20px]">
                    KUMABERUS
                </Link>
                <div className="w-[400px] mx-auto">
                    
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