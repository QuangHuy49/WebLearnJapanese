import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlay, faEye, faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
import ButtonAdd from '../../../../../components/button/ButtonAdd';
import { toast } from 'react-toastify';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../../../../../firebase';
import { deleteAnswer, getAnswerDataByIdQuestion } from '../../../../../services/AnswerServices';

const AnswerPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [answer, setAnswers] = useState(null);
    const [question, setQuestion] = useState(null);
    const [csrfToken, setCsrfToken] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [answerIdToDelete, setAnswerIdToDelete] = useState(null);
    const [answerImageToDelete, setAnswerImageToDelete] = useState(null);
    const [answerAudioToDelete, setAnswerAudioToDelete] = useState(null);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }

        getAnswerData();
    }, []);

    const getAnswerData = async () => {
        const data = await getAnswerDataByIdQuestion(id);
        if (data) {
            setAnswers(data.answers);
            setQuestion(data.question);
        } else {
            setAnswers([]);
        }
    };

    const playAudio = (audioUrl) => {
        const audio = new Audio(audioUrl);
        audio.play()
            .catch(error => {
                console.error('Failed to play audio:', error);
            });
    };

    const handleDeleteAnswer = async (id, img, audio) => {
        setAnswerIdToDelete(id);
        setAnswerImageToDelete(img);
        setAnswerAudioToDelete(audio);
        setShowConfirmationModal(true);
    };

    const confirmDeleteAnswer = async () => {
        try {
            // Xóa hình ảnh
            if (answerImageToDelete) {
                const imageRef = ref(storage, answerImageToDelete);
                await deleteObject(imageRef);
            }

            // Xóa âm thanh
            if (answerAudioToDelete) {
                const audioRef = ref(storage, answerAudioToDelete);
                await deleteObject(audioRef);
            }

            // Tiến hành xóa câu trả lời trên cơ sở dữ liệu
            const response = await deleteAnswer(answerIdToDelete, csrfToken);
            if (response === 200) {
                toast.success('Xóa câu trả lời thành công!');
                window.location.reload();
            } else {
                toast.error('Xóa câu trả lời thất bại. Vui lòng thử lại!');
            }

            setShowConfirmationModal(false);
        } catch (error) {
            console.error('Error deleting answer:', error);
            toast.error('Đã xảy ra lỗi khi xóa câu trả lời. Vui lòng thử lại!');
            setShowConfirmationModal(false);
        }
    };

    const cancelDeleteAnswer = () => {
        setShowConfirmationModal(false);
    };

    return (
        <div className="p-4">
            <div className="px-14 flex justify-between text-custom-color-blue items-end pb-2">
                <div className="font-medium text-lg">
                    Danh sách câu trả lời của câu hỏi
                    {question && <span className="font-semibold ml-1">'{question.question_name}'</span>}
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
                                                    <span>Câu trả lời</span>
                                                </div>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                Đáp án đúng
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                Hình ảnh
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                Audio
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                Thao tác
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {answer && answer.map((item, index) => (
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    <div className="flex items-center text-center ml-2">
                                                        <span>{index + 1}</span>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <span className="">
                                                        {item.answer_name}
                                                    </span>
                                                </td>

                                                {item.answer_correct === 1 ? (
                                                    <td className="px-4 py-4 font-medium text-gray-700 whitespace-nowrap">
                                                        <FontAwesomeIcon icon={faCheckToSlot} className="text-2xl pl-4" />
                                                    </td>
                                                ) : (<span></span>)}

                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {item.answer_img !== null && (
                                                        <img src={item.answer_img} alt="answer_img" className="w-[170px] h-[80px] rounded-lg object-cover" />
                                                    )}
                                                </td>

                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {item.answer_audio !== null ? (
                                                        <span onClick={() => playAudio(item.answer_audio)}>
                                                            <FontAwesomeIcon icon={faPlay} className="text-xl pl-2 hover:scale-125 cursor-pointer transition-all" />
                                                        </span>
                                                    ) : (
                                                        null
                                                    )}
                                                </td>

                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center gap-x-6">
                                                        <Link to={`/admin/test/question/answer/edit-answer/${question.question_id}`}>
                                                            <FontAwesomeIcon icon={faPenToSquare} className="text-lg cursor-pointer hover:scale-125 transition-all text-custom-color-blue" />
                                                        </Link>
                                                        {answer.length > 1 && (
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                                className="text-lg cursor-pointer hover:scale-125 transition-all text-custom-color-red-gray"
                                                                onClick={() => handleDeleteAnswer(item.answer_id, item.answern_img, item.answer_audio)}
                                                            />
                                                        )}
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
            </section>

            {showConfirmationModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 max-w-md">
                        <p className="text-lg">Bạn có chắc chắn muốn xóa câu trả lời này?</p>
                        <div className="flex justify-end mt-9">
                            <button onClick={cancelDeleteAnswer} className="bg-gray-300 hover:bg-gray-400 hover:scale-110 transition-all text-gray-800 font-bold py-2 px-4 mr-2 rounded">Hủy</button>
                            <button onClick={confirmDeleteAnswer} className="bg-custom-color-red-gray hover:bg-red-600 hover:scale-110 transition-all text-white font-bold py-2 px-4 rounded">Xác nhận</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AnswerPage;