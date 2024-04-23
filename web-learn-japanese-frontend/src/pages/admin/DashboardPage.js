import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faFile, faClone } from '@fortawesome/free-solid-svg-icons'
import { getTotal } from '../../services/DashboardServices';

const DashboardPage = () => {
    const [total, setTotal] = useState({ totalLesson: 0, totalUser: 0 });
    const [lessonCount, setLessonCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        handleGetTotal();
    }, []);

    const handleGetTotal = async () => {
        const data = await getTotal();
        if (data) {
            setTotal(data);
            startCounting();
        } else {
            setTotal({ totalLesson: 0, totalUser: 0 });
        }
    }

    const startCounting = () => {
        const lessonInterval = setInterval(() => {
            if (lessonCount < total.totalLesson) {
                setLessonCount(prevCount => prevCount + 1);
            } else {
                clearInterval(lessonInterval);
            }
        }, 100);

        const userInterval = setInterval(() => {
            if (userCount < total.totalUser) {
                setUserCount(prevCount => prevCount + 1);
            } else {
                clearInterval(userInterval);
            }
        }, 100);
    };

    return (
        <>
            <div class="min-h-screen bg-gray-50/50">
                <div class="px-10 py-6">
                    <nav class="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
                        <div class="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
                            <div class="">
                                <h6 class="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">Chào mừng đến với Admin</h6>
                            </div>
                        </div>
                    </nav>
                    <div class="mt-12">
                        <div class="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                            <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                                <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                    <FontAwesomeIcon icon={faFile} className="text-xl" />
                                </div>
                                <div class="p-4 text-right">
                                    <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Tổng số bài học</p>
                                    <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{total.totalLesson}</h4>
                                </div>
                            </div>
                            <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                                <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                    <FontAwesomeIcon icon={faUser} className="text-xl" />
                                </div>
                                <div class="p-4 text-right">
                                    <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Tổng số học viên</p>
                                    <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{total.totalUser}</h4>
                                </div>
                            </div>
                            <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                                <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                    <FontAwesomeIcon icon={faClone} className="text-xl" />
                                </div>
                                <div class="p-4 text-right">
                                    <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Tổng số bài viết</p>
                                    <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">3,462</h4>
                                </div>
                            </div>
                            {/* <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                                <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-6 h-6 text-white">
                                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                                    </svg>
                                </div>
                                <div class="p-4 text-right">
                                    <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Sales</p>
                                    <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">$103,430</h4>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardPage;