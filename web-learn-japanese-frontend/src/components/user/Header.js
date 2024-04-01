import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLayerGroup, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import '../../styles/global.css';
import handleLogout from '../../services/LogoutServices';
import { useTranslation } from 'react-i18next';
import vietnam from '../../assets/image/vietnam.png';
import english from '../../assets/image/english.png';
import japan from '../../assets/image/japan.png';

const Header = () => {
    const [user, setUser] = useState(null);
    const [showSubNav, setShowSubNav] = useState(false);
    const [csrfToken, setCsrfToken] = useState('');
    const [currentLanguage, setCurrentLanguage] = useState({name: 'Tiếng Việt', img: vietnam });
    const [showLanguageSubNav, setShowLanguageSubNav] = useState(false);
    const { i18n, t } = useTranslation(['button', 'search', 'submenu']);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }

        fetchUserData();
    }, []);

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

    const toggleSubNav = () => {
        setShowSubNav(!showSubNav);
    };

    const toggleLanguageSubNav = () => {
        setShowLanguageSubNav(!showLanguageSubNav);
    };


    const handleLogoutSubmit = async () => {
        try {
            const response = await handleLogout(csrfToken);
            if (response.status === 200) {
                localStorage.removeItem('token');
            }
            window.location.reload();
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    const changeLanguage = (newLanguage, lng) => {
        i18n.changeLanguage(lng);
        setCurrentLanguage(newLanguage);
    };

    const setLanguageAndToggleSubNav = (newLanguage) => {
        changeLanguage(newLanguage);
        setShowLanguageSubNav(false);
    };

    return (
        <header className="w-full text-gray-700 bg-white body-font shadow-md shadow-neutral-200 fixed z-30">
            <div className="w-full flex flex-col items-center p-3 md:flex-row">
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
                            <input type="search" id="default-search" className="block p-1 pl-10 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:border-custom-color-gray" placeholder={t('search.search')} required />
                        </div>
                    </form>
                </div>

                {/* get Language */}
                {currentLanguage ? (
                    <div className="items-center h-full pl-6 ml-6 flex cursor-pointer text-sm relative" onClick={toggleLanguageSubNav}>
                        <button onClick={toggleLanguageSubNav} className="flex item-center items-stretch block rounded-md px-4 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer hover:scale-110 transition-all">
                            <img src={currentLanguage.img} alt="Language Image" className="w-7 h-7 mr-2" />
                            <a className="flex items-center" role="menuitem">
                                {currentLanguage.name}
                            </a>
                        </button>

                        <CSSTransition
                            in={showLanguageSubNav}
                            timeout={300}
                            classNames="dropdown"
                            unmountOnExit>
                            <div className="absolute top-8 right-0">
                                <ul className="text-sm">
                                    <div id="dropdown-menu" className="origin-top-right absolute right-0 mt-2 w-56 px-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                                            <div className="border-t-2 border-b-2">
                                                <div onClick={() => setLanguageAndToggleSubNav({name: 'Tiếng Việt', img: vietnam})}>
                                                    <a className="flex item-center items-stretch block rounded-md px-4 py-2 my-1 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer hover:scale-110 transition-all" role="menuitem"
                                                        onClick={() => changeLanguage(currentLanguage, 'vi')}>
                                                        <img src={vietnam} className="w-7 h-7" />
                                                        <div className="self-center ml-2">Tiếng Việt</div>
                                                    </a>
                                                </div>
                                                <div onClick={() => setLanguageAndToggleSubNav({name: 'English', img: english})}>
                                                    <a className="flex item-center items-stretch block rounded-md px-4 py-2 my-1 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer hover:scale-110 transition-all" role="menuitem"
                                                        onClick={() => changeLanguage(currentLanguage, 'en')}>
                                                        <img src={english} className="w-7 h-7" />
                                                        <div className="self-center ml-2">English</div>
                                                    </a>
                                                </div>
                                                <div onClick={() => setLanguageAndToggleSubNav({name: '日本語', img: japan})}>
                                                    <a className="flex item-center items-stretch block rounded-md px-4 py-2 my-1 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer hover:scale-110 transition-all" role="menuitem"
                                                        onClick={() => changeLanguage(currentLanguage, 'jp')}>
                                                        <img src={japan} className="w-7 h-7" />
                                                        <div className="self-center ml-2">日本語</div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </CSSTransition>
                    </div>
                ) : (
                    null
                )}
                {user ? (
                    <div className="items-center h-full pl-6 ml-6 border-l border-gray-200 mr-[20px] flex cursor-pointer relative" onClick={toggleSubNav}>
                        <button onClick={toggleSubNav}>
                            <img src={user.user_avatar} alt="User Avatar" className="w-8 h-8 rounded-full cursor-pointer hover:scale-110 transition-all" />
                        </button>
                        <CSSTransition
                            in={showSubNav}
                            timeout={300}
                            classNames="dropdown"
                            unmountOnExit
                        >
                            <div className="absolute top-8 right-0">
                                <ul className="text-sm">
                                    <div id="dropdown-menu" className="origin-top-right absolute right-0 mt-2 w-56 px-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                                            <div className="flex item-center items-stretch p-2">
                                                <img src={user.user_avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                                                <span className="ml-3 text-sm font-normal text-custom-color-blue self-center">{user.user_name}</span>
                                            </div>
                                            <div className="border-t-2 border-b-2">
                                                <a className="flex item-center items-stretch block rounded-md px-4 py-2 my-1 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer hover:scale-110 transition-all" role="menuitem">
                                                    <FontAwesomeIcon icon={faUser} className="self-center" />
                                                    <div className="self-center ml-2">{t('submenu.my_profile', { ns: 'submenu' })}</div>
                                                </a>
                                                <a className="flex item-center items-stretch block rounded-md px-4 py-2 my-1 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer hover:scale-110 transition-all" role="menuitem">
                                                    <FontAwesomeIcon icon={faLayerGroup} className="self-center" />
                                                    <div className="self-center ml-2">{t('submenu.my_post', { ns: 'submenu' })}</div>
                                                </a>
                                            </div>
                                            <div className="">
                                                <Link onClick={handleLogoutSubmit} className="flex item-center items-stretch block rounded-md px-4 py-2 mt-1 text-sm text-custom-color-red-gray hover:bg-gray-100 active:bg-blue-100 cursor-pointer hover:scale-110 transition-all" role="menuitem">
                                                    <FontAwesomeIcon icon={faRightFromBracket} className="self-center" />
                                                    <div className="self-center ml-2">{t('submenu.logout', { ns: 'submenu' })}</div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </CSSTransition>
                    </div>
                ) : (
                    <div className="items-center h-full pl-6 ml-6 border-l border-gray-200 mr-[20px]">
                        <Link to="/login" className="px-4 py-2 mr-5 font-medium hover:text-gray-900 text-sm text-custom-color-blue hover:border-slate-400 hover:text-slate-900 hover:shadow rounded-xl">
                            {t('button.login')}
                        </Link>
                        <Link to="/signup"
                            className="px-4 py-2 text-sm text-white transition-all duration-150 bg-custom-color-blue rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease rounded-xl">
                            {t('button.register')}
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;