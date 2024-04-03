import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faLayerGroup, faBook, faBrain, faImagePortrait, faFileLines, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import handleLogout from '../../services/logoutServices';

const Sidebar = () => {
    const [active, setActive] = useState(1);
    const navigate = useNavigate();
    const [csrfToken, setCsrfToken] = useState('');
    const location = useLocation().pathname;

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }

        if (location.includes('type')) {
            setActive(2)
        }
        if (location.includes('lesson')) {
            setActive(3)
        }
        if (location.includes('test')) {
            setActive(4)
        }
        if (location.includes('user')) {
            setActive(5)
        }
        if (location.includes('post')) {
            setActive(6)
        }
    }, []);

    const handleLogoutSubmit = async () => {
        try {
            const response = await handleLogout(csrfToken);
            if (response.status === 200) {
                localStorage.removeItem('token');
            }
            navigate('/login');
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <div className="flex overflow-hidden bg-white pt-16">
            <aside id="sidebar" className="fixed hidden z-20 h-full top-0 left-0 pt-10 flex lg:flex flex-shrink-0 flex-col transition-width duration-75" aria-label="Sidebar">
                <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-6">
                    <div className="flex-1 flex flex-col px-1 pt-2 pb-4 overflow-y-auto">
                        <div className="flex-1 px-3 bg-white divide-y space-y-1">
                            <ul className="space-y-2 pb-2">
                                <li className={active === 1 ? "text-base text-white font-normal rounded-lg bg-custom-color-gray flex items-center p-2 group hover:scale-110 cursor-pointer transition-all" : "text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group hover:scale-110 cursor-pointer transition-all"}>
                                    <Link to={'/admin'} className="px-2" onClick={() => setActive(1)}>
                                        <FontAwesomeIcon icon={faHouse} className={active === 1 ? "text-white" : "text-red-500"} />
                                        <span className="ml-3">Dashboard</span>
                                    </Link>
                                </li>
                                <li className={active === 2 ? "text-base text-white font-normal rounded-lg bg-custom-color-gray flex items-center p-2 group hover:scale-110 cursor-pointer transition-all" : "text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group hover:scale-110 cursor-pointer transition-all"}>
                                    <Link to={'/admin/type'} className="px-2" onClick={() => setActive(2)}>
                                        <FontAwesomeIcon icon={faLayerGroup} className={active === 2 ? "text-white" : "text-amber-500"} />
                                        <span className="ml-3 flex-1 whitespace-nowrap">Quản lý thể loại</span>
                                    </Link>
                                </li>
                                <li className={active === 3 ? "text-base text-white font-normal rounded-lg bg-custom-color-gray flex items-center p-2 group hover:scale-110 cursor-pointer transition-all" : "text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group hover:scale-110 cursor-pointer transition-all"}>
                                    <Link to={'/admin/lesson'} className="px-2" onClick={() => setActive(3)}>
                                        <FontAwesomeIcon icon={faBook} className={active === 3 ? "text-white" : "text-emerald-500"} />
                                        <span className="ml-3 flex-1 whitespace-nowrap">Quản lý bài học</span>
                                    </Link>
                                </li>
                                <li className={active === 4 ? "text-base text-white font-normal rounded-lg bg-custom-color-gray flex items-center p-2 group hover:scale-110 cursor-pointer transition-all" : "text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group hover:scale-110 cursor-pointer transition-all"}>
                                    <Link to={'/admin/test'} className="px-2" onClick={() => setActive(4)}>
                                        <FontAwesomeIcon icon={faBrain} className={active === 4 ? "text-white" : "text-cyan-500"} />
                                        <span className="ml-3 flex-1 whitespace-nowrap">Quản lý bài kiểm tra</span>
                                    </Link>
                                </li>
                                <li className={active === 5 ? "text-base text-white font-normal rounded-lg bg-custom-color-gray flex items-center p-2 group hover:scale-110 cursor-pointer transition-all" : "text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group hover:scale-110 cursor-pointer transition-all"}>
                                    <Link to={'/admin/user'} className="px-2" onClick={() => setActive(5)}>
                                        <FontAwesomeIcon icon={faImagePortrait} className={active === 5 ? "text-white" : "text-blue-500"} />
                                        <span className="ml-3 flex-1 whitespace-nowrap">Quản lý học viên</span>
                                    </Link>
                                </li>
                                <li className={active === 6 ? "text-base text-white font-normal rounded-lg bg-custom-color-gray flex items-center p-2 group hover:scale-110 cursor-pointer transition-all" : "text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group hover:scale-110 cursor-pointer transition-all"}>
                                    <Link to={'/admin/post'} className="px-2" onClick={() => setActive(6)}>
                                        <FontAwesomeIcon icon={faFileLines} className={active === 6 ? "text-white" : "text-purple-500"} />
                                        <span className="ml-3 flex-1 whitespace-nowrap">Quản lý bài viết</span>
                                    </Link>
                                </li>
                            </ul>
                            <div className="space-y-2 py-2">
                                <div className="ps-2 pt-2 text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2 hover:scale-110 cursor-pointer transition-all">
                                    <Link onClick={handleLogoutSubmit} className="px-2">
                                        <FontAwesomeIcon icon={faRightFromBracket} className="text-red-500" />
                                        <span className="ml-4">Đăng xuất</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
            <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
            </div>
        </div>
    );
}

export default Sidebar;