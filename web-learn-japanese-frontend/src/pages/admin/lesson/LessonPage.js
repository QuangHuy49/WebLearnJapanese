import React, { useEffect, useState } from 'react';
import { deleteLesson, getLessson } from '../../../services/LessonServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faEye, faFileContract, faFile } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import ButtonAdd from '../../../components/button/ButtonAdd';
import { CSSTransition } from 'react-transition-group';
import '../../../styles/global.css';
import { toast } from 'react-toastify';

const LessonPage = () => {
    const navigate = useNavigate();
    const [showSubNav, setShowSubNav] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 5;
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        loadLessons(currentPage);

        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }
    }, [currentPage]);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }
    }, []);

    const loadLessons = async (page) => {
        const data = await getLessson(page, perPage);
        if (data) {
            setLessons(data.lessons);
            setTotalPages(data.totalPages);
            navigate(`/admin/lesson?page=${page}&perpage=${perPage}`);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const toggleSubNav = () => {
        setShowSubNav(!showSubNav);
    };

    const handleDeleteLesson = async (id) => {
        const response = await deleteLesson(id, csrfToken);
        if (response === 200) {
            toast.success('Xóa bài học thành công!');
            navigate('/admin/lesson');
            window.location.reload();
        } else {
            toast.error('Xóa bài học thất bại. Vui lòng thử lại!');
        }
    };

    return (
        <div className="p-4">
            <div className="px-4 flex justify-between text-custom-color-blue items-end pb-2">
                <div className="font-medium text-lg">
                    Danh sách bài học
                </div>

                <div className="" onClick={toggleSubNav}>
                    <ButtonAdd />
                    <CSSTransition
                        in={showSubNav}
                        timeout={300}
                        classNames="dropdown"
                        unmountOnExit>
                        <div className="absolute top-12 right-10">
                            <ul className="text-sm">
                                <div id="dropdown-menu" className="origin-top-right absolute right-0 mt-2 w-64 px-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                                        <div className="border-t-2 border-b-2">
                                            <a className="flex item-center items-stretch block rounded-md px-4 py-2 my-1 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer hover:scale-110 transition-all" role="menuitem">
                                                <Link to={'/admin/lesson/add-lesson'} className="self-center ml-2 w-full flex">
                                                    <FontAwesomeIcon icon={faFile} className="self-center" />
                                                    <div className="self-center ml-2">Thêm bài học</div>
                                                </Link>
                                            </a>
                                            <a className="flex item-center items-stretch block rounded-md px-4 py-2 my-1 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer hover:scale-110 transition-all" role="menuitem">
                                                <Link to={''} className="self-center ml-2 w-full flex">
                                                    <FontAwesomeIcon icon={faFileContract} className="self-center" />
                                                    <div className="self-center ml-2">Thêm nội dung bài học</div>
                                                </Link>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </CSSTransition>
                </div>
            </div>

            <section className="container px-4 mx-auto">
                <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-custom-color-blue">
                                        <tr>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                STT
                                            </th>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white">
                                                <div className="flex items-center gap-x-3">
                                                    <span>Tên bài học</span>
                                                </div>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                Hình ảnh
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                Thể loại
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                Trạng thái
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                Thao tác
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {lessons && lessons.map((item, index) => (
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    <div className="flex items-center text-center ml-2">
                                                        <span>{item.lesson_id}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.lesson_name}</td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className="">
                                                        <img src={item.lesson_img} alt="lesson_img" className="w-[170px] h-[80px] rounded-lg object-cover" />
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <div className="flex items-center gap-x-2">
                                                        {item.type.type_name}
                                                    </div>
                                                </td>
                                                {item.lesson_status === 1 ? (
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                            <h2 className="text-sm font-normal">Xuất bản</h2>
                                                        </div>
                                                    </td>
                                                ) : (
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                        <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>

                                                            <h2 className="text-sm font-normal">Chưa xuất bản</h2>
                                                        </div>
                                                    </td>
                                                )}
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center gap-x-6">
                                                        <FontAwesomeIcon icon={faEye} className="text-lg cursor-pointer hover:scale-125 transition-all text-custom-color-blue" />
                                                        <FontAwesomeIcon icon={faPenToSquare} className="text-lg cursor-pointer hover:scale-125 transition-all text-custom-color-blue" />
                                                        <FontAwesomeIcon icon={faTrash} className="text-lg cursor-pointer hover:scale-125 transition-all text-custom-color-red-gray"
                                                            onClick={() => handleDeleteLesson(item.lesson_id)} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex items-center justify-center mt-6">
                        <button
                            onClick={handlePreviousPage}
                            className={`flex items-center px-5 py-2 text-sm capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:scale-110 cursor-pointer'
                                }`}
                            disabled={currentPage === 1}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <span>Trang trước</span>
                        </button>

                        <div className="items-center hidden md:flex gap-x-3 mx-10">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)} className={`px-2 py-1 text-sm rounded-md ${currentPage === pageNumber ? 'bg-blue-100/60 text-blue-500 hover:scale-125 transition-all' : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-indigo-500 hover:scale-125 transition-all'}`}>{pageNumber}</button>
                            ))}
                        </div>

                        <button
                            onClick={handleNextPage}
                            className={`flex items-center px-5 py-2 text-sm capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:scale-110 cursor-pointer'
                                }`}
                            disabled={currentPage === totalPages}>
                            <span>Trang sau</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LessonPage;