import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { deleteQuestion, getQuestionDataByIdTestWithPaging } from '../../../../services/QuestionServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlay, faEye } from '@fortawesome/free-solid-svg-icons';
import ButtonAdd from '../../../../components/button/ButtonAdd';
import { toast } from 'react-toastify';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../../../../firebase';

const QuestionPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState(null);
    const [test, setTest] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 10;
    const [csrfToken, setCsrfToken] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [questionIdToDelete, setQuestionIdToDelete] = useState(null);
    const [questionImageToDelete, setQuestionImageToDelete] = useState(null);
    const [questionAudioToDelete, setQuestionAudioToDelete] = useState(null);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }

        getQuestionData(currentPage);
    }, [currentPage]);

    const getQuestionData = async (page) => {
        const data = await getQuestionDataByIdTestWithPaging(id, page, perPage);
        if (data) {
            setQuestions(data.questions);
            setTest(data.test);
            setTotalPages(data.totalPages);
            navigate(`/admin/test/question/${id}?page=${page}&perpage=${perPage}`);
        } else {
            setQuestions([]);
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

    const playAudio = (audioUrl) => {
        const audio = new Audio(audioUrl);
        audio.play()
            .catch(error => {
                console.error('Failed to play audio:', error);
            });
    };

    const handleDeleteQuestion = async (id, img, audio) => {
        setQuestionIdToDelete(id);
        setQuestionImageToDelete(img);
        setQuestionAudioToDelete(audio);
        setShowConfirmationModal(true);
    };

    const confirmDeleteQuestion = async () => {
        try {
            // Xóa hình ảnh
            if (questionImageToDelete) {
                const imageRef = ref(storage, questionImageToDelete);
                await deleteObject(imageRef);
            }
    
            // Xóa âm thanh
            if (questionAudioToDelete) {
                const audioRef = ref(storage, questionAudioToDelete);
                await deleteObject(audioRef);
            }
    
            // Tiến hành xóa câu hỏi trên cơ sở dữ liệu
            const response = await deleteQuestion(questionIdToDelete, csrfToken);
            if (response === 200) {
                toast.success('Xóa câu hỏi thành công!');
                window.location.reload();
            } else {
                toast.error('Xóa câu hỏi thất bại. Vui lòng thử lại!');
            }
            
            setShowConfirmationModal(false);
        } catch (error) {
            console.error('Error deleting question:', error);
            toast.error('Đã xảy ra lỗi khi xóa câu hỏi. Vui lòng thử lại!');
            setShowConfirmationModal(false);
        }
    };

    const cancelDeleteQuestion = () => {
        setShowConfirmationModal(false);
    };

    return (
        <div className="p-4">
            <div className="px-14 flex justify-between text-custom-color-blue items-end pb-2">
                <div className="font-medium text-lg">
                    Danh sách câu hỏi của
                    {test && <span className="font-semibold ml-1">'{test.test_name}'</span>}
                </div>

                <div className="relative">
                    <Link to={'/admin/test/add-question'}>
                        <ButtonAdd />
                    </Link>
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
                                                    <span>Câu hỏi</span>
                                                </div>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                Hình ảnh
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                Audio
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
                                        {questions && questions.map((item, index) => (
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    <div className="flex items-center text-center ml-2">
                                                        <span>{index + 1}</span>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <span className="">
                                                        {item.question_name}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {item.question_img !== null && (
                                                        <img src={item.question_img} alt="question_img" className="w-[170px] h-[80px] rounded-lg object-cover" />
                                                    )}
                                                </td>

                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {item.question_audio !== null ? (
                                                        <span onClick={() => playAudio(item.question_audio)}>
                                                            <FontAwesomeIcon icon={faPlay} className="text-xl pl-2 hover:scale-125 cursor-pointer transition-all" />
                                                        </span>
                                                    ) : (
                                                        null
                                                    )}
                                                </td>

                                                {item.question_status === 1 ? (
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
                                                        <Link to={`/admin/test/question/answer/${item.question_id}`}>
                                                            <FontAwesomeIcon icon={faEye} className="text-lg cursor-pointer hover:scale-125 transition-all text-custom-color-blue" />
                                                        </Link>
                                                        <Link to={`/admin/test/edit-question/${item.question_id}`}>
                                                            <FontAwesomeIcon icon={faPenToSquare} className="text-lg cursor-pointer hover:scale-125 transition-all text-custom-color-blue" />
                                                        </Link>
                                                        <FontAwesomeIcon icon={faTrash} className="text-lg cursor-pointer hover:scale-125 transition-all text-custom-color-red-gray"
                                                            onClick={() => handleDeleteQuestion(item.question_id, item.question_img, item.question_audio)}/>
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

            {showConfirmationModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 max-w-md">
                        <p className="text-lg">Bạn có chắc chắn muốn xóa câu hỏi này?</p>
                        <div className="flex justify-end mt-9">
                            <button onClick={cancelDeleteQuestion} className="bg-gray-300 hover:bg-gray-400 hover:scale-110 transition-all text-gray-800 font-bold py-2 px-4 mr-2 rounded">Hủy</button>
                            <button onClick={confirmDeleteQuestion} className="bg-custom-color-red-gray hover:bg-red-600 hover:scale-110 transition-all text-white font-bold py-2 px-4 rounded">Xác nhận</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default QuestionPage;