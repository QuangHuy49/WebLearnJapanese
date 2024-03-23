import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="w-full text-gray-700 bg-white shadow-sm body-font shadow-lg shadow-neutral-100">
            <div className="container flex flex-col items-center p-3 mx-auto md:flex-row">
                <Link to="/" className="flex items-center mb-4 font-extrabold text-[#415A80] title-font md:mb-0 text-2xl">
                    KUMABERUS
                </Link>
                <div className="w-[400px] mx-auto">
                    <form>
                        <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search" id="default-search" className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tìm kiếm ..." required />
                                {/* <button type="submit" className="text-white absolute right-2 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                        </div>  
                    </form>
                </div>
                <div className="items-center h-full pl-6 ml-6 border-l border-gray-200">
                    <Link to="/login" className="mr-5 font-medium hover:text-gray-900">Login</Link>
                    <Link to="/signup"
                        clLinkssName="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease">
                        Sign Up
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;