import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBook, faCopy, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
    const [active, setActive] = useState(1);
    const location = useLocation().pathname;
    const { t } = useTranslation('sidebar');

    useEffect(() => {
        if (location.includes('lesson')) {
            setActive(2)
        }
        if (location.includes('test')) {
            setActive(3)
        }
        if (location.includes('post')) {
            setActive(4)
        }
    }, [])

    return (
        <div className="flex overflow-hidden bg-white pt-16">
            <aside id="sidebar" className="fixed hidden z-20 h-full top-4 left-10 pt-10 flex lg:flex flex-shrink-0 flex-col transition-width duration-75" aria-label="Sidebar">
                <div className="relative flex-1 flex flex-col min-h-0 bg-white pt-6">
                    <div className="flex-1 flex flex-col px-1 pt-2 pb-4 overflow-y-auto">
                        <div className="flex-1 px-3 bg-white divide-y space-y-1">
                            <ul className="space-y-2 pb-2"> 
                                <li className={active === 1 ? "h-[84px] w-[84px] flex flex-col justify-center text-xs text-white font-normal rounded-2xl bg-custom-color-gray items-center p-2 group hover:scale-110 transition-all" : "h-[84px] w-[84px] flex flex-col justify-center text-xs text-gray-900 font-normal rounded-2xl hover:bg-gray-100 items-center p-2 group hover:scale-110 transition-all"}>
                                    <Link to={'/'} className="flex flex-col" onClick={() => setActive(1)}>
                                        <FontAwesomeIcon icon={faHouse} className={active === 1 ? "text-white text-lg" : "text-red-500 text-lg"} />
                                        <span className="mt-2 flex items-center justify-center">{t('sidebar.home')}</span>
                                    </Link>
                                </li>
                                <li className={active === 2 ? "h-[84px] w-[84px] flex flex-col justify-center text-xs text-white font-normal rounded-2xl bg-custom-color-gray items-center p-2 group hover:scale-110 transition-all" : "h-[84px] w-[84px] flex flex-col justify-center text-xs text-gray-900 font-normal rounded-2xl hover:bg-gray-100 items-center p-2 group hover:scale-110 transition-all"}>
                                    <Link to={'/lesson'} className="px-2 flex flex-col" onClick={() => setActive(2)}>
                                        <FontAwesomeIcon icon={faBook} className={active === 2 ? "text-white text-lg" : "text-amber-500 text-lg"} />
                                        <span className="mt-2">{t('sidebar.lesson')}</span>
                                    </Link>
                                </li>
                                <li className={active === 3 ? "h-[84px] w-[84px] flex flex-col justify-center text-xs text-white font-normal rounded-2xl bg-custom-color-gray items-center p-2 group hover:scale-110 transition-all" : "h-[84px] w-[84px] flex flex-col justify-center text-xs text-gray-900 font-normal rounded-2xl hover:bg-gray-100 items-center p-2 group hover:scale-110 transition-all"}>
                                    <Link to={'/test'} className="px-2 flex flex-col" onClick={() => setActive(3)}>
                                        <FontAwesomeIcon icon={faPuzzlePiece} className={active === 3 ? "text-white text-lg" : "text-emerald-500 text-lg"} />
                                        <span className="mt-2">{t('sidebar.test')}</span>
                                    </Link>
                                </li>
                                <li className={active === 4 ? "h-[84px] w-[84px] flex flex-col justify-center text-xs text-white font-normal rounded-2xl bg-custom-color-gray items-center p-2 group hover:scale-110 transition-all" : "h-[84px] w-[84px] flex flex-col justify-center text-xs text-gray-900 font-normal rounded-2xl hover:bg-gray-100 items-center p-2 group hover:scale-110 transition-all"}>
                                    <Link to={'/post'} className="px-2 flex flex-col" onClick={() => setActive(4)}>
                                        <FontAwesomeIcon icon={faCopy} className={active === 4 ? "text-white text-lg" : "text-cyan-500 text-lg"} />
                                        <span className="mt-2">{t('sidebar.post')}</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
            <div className="opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
            <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-28"></div>
        </div>
    );
}

export default Sidebar;