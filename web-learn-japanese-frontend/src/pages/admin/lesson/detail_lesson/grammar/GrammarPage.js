import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteGrammar, getGrammarDataByIdWithPaging } from '../../../../../services/GrammarServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPencil, faHeadphonesSimple, faSpellCheck } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import ButtonAdd from '../../../../../components/button/ButtonAdd';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'react-toastify';
import '../../../../../styles/global.css';

const GrammarPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [grammars, setGrammars] = useState(null);
    const [lesson, setLesson] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 10;
    const [showSubNav, setShowSubNav] = useState(false);
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }
        
        getGrammarData(currentPage);
    }, [currentPage]);

    const getGrammarData = async (page) => {
        const data = await getGrammarDataByIdWithPaging(id, page, perPage);
        if (data) {
            setLesson(data.lesson);
            setGrammars(data.grammars);
            setTotalPages(data.totalPages);
            navigate(`/admin/lesson/detail-lesson/${id}/grammar?page=${page}&perpage=${perPage}`);
        } else {
            setGrammars([]);
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

    const handleDeleteGrammar = async (id_grammar) => {
        const response = await deleteGrammar(id_grammar, csrfToken);
        if (response === 200) {
            toast.success('Xóa ngữ pháp thành công!');
            navigate(`/admin/lesson/detail-lesson/${id}/grammar`);
            window.location.reload();
        } else {
            toast.error('Xóa ngữ pháp thất bại. Vui lòng thử lại!');
        }
    };

    return (
        <div className="px-4">
            <div className="px-14 flex justify-between text-custom-color-blue items-end pb-2">
                <div className="font-medium text-lg">
                    Danh sách ngữ pháp của 
                    {lesson && <span className="font-semibold ml-1">'{lesson.lesson_name}'</span>}
                </div>

                <div className="relative" onClick={toggleSubNav}>
                    <ButtonAdd />
                    <CSSTransition
                        in={showSubNav}
                        timeout={300}
                        classNames="dropdown"
                        unmountOnExit>
                        <div className="absolute top-9 right-0">
                            <ul className="text-sm">
                                <div id="dropdown-menu" className="origin-top-right absolute right-0 mt-2 w-64 px-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                                        <div className="border-t-2 border-b-2">
                                            <a className="flex item-center items-stretch block rounded-md px-3 py-2 my-1 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer hover:scale-110 transition-all" role="menuitem">
                                                <Link to={'/admin/add-vocabulary'} className="self-center ml-2 w-full flex">
                                                    <FontAwesomeIcon icon={faPencil} className="self-center" />
                                                    <div className="self-center ml-3">Thêm từ vựng mới</div>
                                                </Link>
                                            </a>
                                            <a className="flex item-center items-stretch block rounded-md px-3 py-2 my-1 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer hover:scale-110 transition-all" role="menuitem">
                                                <Link to={'/admin/add-kaiwa'} className="self-center ml-2 w-full flex">
                                                    <FontAwesomeIcon icon={faHeadphonesSimple} className="self-center" />
                                                    <div className="self-center ml-3">Thêm câu kaiwa mới</div>
                                                </Link>
                                            </a>
                                            <a className="flex item-center items-stretch block rounded-md px-3 py-2 my-1 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer hover:scale-110 transition-all" role="menuitem">
                                                <Link to={'/admin/add-grammar'} className="self-center ml-2 w-full flex">
                                                    <FontAwesomeIcon icon={faSpellCheck} className="self-center" />
                                                    <div className="self-center ml-3">Thêm ngữ pháp mới</div>
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
                                                    <span>Ngữ pháp</span>
                                                </div>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                Nghĩa
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                Nội dung
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                Ví dụ
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                Note
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
                                        {grammars && grammars.map((item, index) => (
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    <div className="flex items-center text-center ml-2">
                                                        <span>{index + 1}</span>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <span>
                                                        {item.grammar_title}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <span>
                                                        {item.grammar_mean}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <span>
                                                        {item.grammar_detail}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <span>
                                                        {item.grammar_example}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <span>
                                                        {item.grammar_note}
                                                    </span>
                                                </td>

                                                {item.grammar_status === 1 ? (
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
                                                        <Link to={`/admin/edit-grammar/${item.grammar_id}`}>
                                                            <FontAwesomeIcon icon={faPenToSquare} className="text-lg cursor-pointer hover:scale-125 transition-all text-custom-color-blue" />
                                                        </Link>
                                                        <FontAwesomeIcon icon={faTrash} className="text-lg cursor-pointer hover:scale-125 transition-all text-custom-color-red-gray"
                                                            onClick={() => handleDeleteGrammar(item.grammar_id)} />
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
                            className={`flex items-center px-5 py-2 text-sm capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:scale-110 cursor-pointer'}`}
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
                            className={`flex items-center px-5 py-2 text-sm capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:scale-110 cursor-pointer'}`}
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

export default GrammarPage;