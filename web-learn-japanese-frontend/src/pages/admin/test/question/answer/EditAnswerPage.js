import React, { useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../../../../firebase';
import LoadingUploadFile from '../../../../../components/loading/LoadingUploadFile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteAnswerAudio, deleteAnswerImage, updateAnswer } from '../../../../../services/AnswerServices';
import { getAnswerDataByIdQuestion } from '../../../../../services/AnswerServices';
import { getQuestion } from '../../../../../services/QuestionServices';

const EditAnswerPage = () => {
    let { id } = useParams();
    const [formData, setFormData] = useState({
        answers: [
            {
                answer_name: '',
                answer_img: '',
                answer_audio: '',
                answer_correct: false,
                uploadedImageAnswer: null,
                uploadProgressUploadImageAnswer: 0,
                uploadedAudioAnswer: null,
                uploadProgressUploadAudioAnswer: 0,
            }
        ],
        question: {
            question_id: '' 
        }
    });
    const [csrfToken, setCsrfToken] = useState('');
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }

        fetchQuestions();
        getAnswerData();
    }, []);

    const fetchQuestions = async () => {
        const data = await getQuestion();
        if (data) {
            setQuestions(data);
        } else {
            setQuestions([]);
        }
    };

    const getAnswerData = async () => {
        const data = await getAnswerDataByIdQuestion(id);
        if (data) {
            setFormData(data);
        } else {
            setFormData([]);
        }
    };

    const handleImageAnswerChange = async (event, index) => {
        const file = event.target.files[0];
        const newAnswers = [...formData.answers];
        newAnswers[index].uploadedImageAnswer = file;
        setFormData({ ...formData, answers: newAnswers });
        try {
            // Create a reference to where you want to store the file in Firebase Storage
            const storageRef = ref(storage, `images/${file.name}`);

            // Upload the file using uploadBytesResumable method
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Track upload progress
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Update upload progress if needed
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    const updatedAnswers = [...formData.answers];
                    updatedAnswers[index].uploadProgressUploadImageAnswer = progress;
                    setFormData({ ...formData, answers: updatedAnswers });
                },
                (error) => {
                    // Handle error during upload
                    console.error('Error uploading file:', error);
                },
                async () => {
                    // Handle upload completion
                    console.log('Upload complete');
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // Store the download URL of the uploaded file
                        const updatedAnswers = [...formData.answers];
                        updatedAnswers[index].answer_img = downloadURL;
                        setFormData({ ...formData, answers: updatedAnswers });
                    });
                }
            );
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleDeleteImageAnswerSubmit = async (e, index) => {
        e.preventDefault();
        try {
            const updatedAnswers = [...formData.answers];
            const fileToDelete = updatedAnswers[index].uploadedImageAnswer;

            if (!fileToDelete) {
                return;
            }

            const storageRef = ref(storage, `images/${fileToDelete.name}`);
            await deleteObject(storageRef);

            updatedAnswers[index].uploadedImageAnswer = null;
            updatedAnswers[index].uploadProgressUploadImageAnswer = 0;
            updatedAnswers[index].answer_img = '';

            setFormData({ ...formData, answers: updatedAnswers });
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleAudioAnswerChange = async (event, index) => {
        const file = event.target.files[0];
        const newAnswers = [...formData.answers];
        newAnswers[index].uploadedAudioAnswer = file;
        setFormData({ ...formData, answers: newAnswers });
        try {
            // Create a reference to where you want to store the file in Firebase Storage
            const storageRef = ref(storage, `audios/${file.name}`);

            // Upload the file using uploadBytesResumable method
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Track upload progress
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Update upload progress if needed
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    const updatedAnswers = [...formData.answers];
                    updatedAnswers[index].uploadProgressUploadAudioAnswer = progress;
                    setFormData({ ...formData, answers: updatedAnswers });
                },
                (error) => {
                    // Handle error during upload
                    console.error('Error uploading file:', error);
                },
                async () => {
                    // Handle upload completion
                    console.log('Upload complete');
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // Store the download URL of the uploaded file
                        const updatedAnswers = [...formData.answers];
                        updatedAnswers[index].answer_audio = downloadURL;
                        setFormData({ ...formData, answers: updatedAnswers });
                    });
                }
            );
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleDeleteAudioAnswerSubmit = async (e, index) => {
        e.preventDefault();
        try {
            const updatedAnswers = [...formData.answers];
            const fileToDelete = updatedAnswers[index].uploadedAudioAnswer;

            if (!fileToDelete) {
                return;
            }

            const storageRef = ref(storage, `audios/${fileToDelete.name}`);
            await deleteObject(storageRef);

            updatedAnswers[index].uploadedAudioAnswer = null;
            updatedAnswers[index].uploadProgressUploadAudioAnswer = 0;
            updatedAnswers[index].answer_audio = '';

            setFormData({ ...formData, answers: updatedAnswers });
        } catch (error) {
            console.error('Error deleting audio:', error);
        }
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'answer_correct') {
            const updatedAnswers = formData.answers.map((answer, i) => {
                if (index === i) {
                    return { ...answer, [name]: true };
                } else {
                    return { ...answer, [name]: false };
                }
            });
            setFormData({
                ...formData,
                answers: updatedAnswers
            });
        } else {
            const updatedAnswers = [...formData.answers];
            updatedAnswers[index] = { ...updatedAnswers[index], [name]: value };
            setFormData({
                ...formData,
                answers: updatedAnswers
            });
        }
    };

    const playAudio = (audioUrl) => {
        const audio = new Audio(audioUrl);
        audio.play()
            .catch(error => {
                console.error('Failed to play audio:', error);
            });
    };

    const handleAddAnswer = () => {
        setFormData({
            ...formData,
            answers: [...formData.answers, { answer_name: '', answer_img: '', answer_audio: '', answer_correct: false }],
            question: {
                question_id: formData.question.question_id 
            }
        });
    };

    const handleDeleteAnswer = async (e, index) => {
        try {
            await handleDeleteImageAnswerSubmit(e, index);
            await handleDeleteAudioAnswerSubmit(e, index);

            const updatedAnswers = [...formData.answers];
            updatedAnswers.splice(index, 1);
            setFormData({ ...formData, answers: updatedAnswers });
        } catch (error) {
            console.error('Error deleting answer:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            question_id: formData.question.question_id
        };
        try {
            const response = await updateAnswer(updatedFormData, csrfToken);
            if (response.status === 200) {
                toast.success('Cập nhật câu trả lời thành công!');
                navigate(`/admin/test/question/answer/${id}`);
            } else {
                toast.error('Cập nhật câu trả lời thất bại. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Failed to add vocabulary:', error);
            toast.error('Đã xảy ra lỗi trong quá trình Cập nhật câu trả lời');
        }
    };

    const handleDeleteAnswerImage = async (id, index) => {
        const response = await deleteAnswerImage(id, csrfToken);
        if (response === 200) {
            const updatedAnswers = [...formData.answers];
            updatedAnswers[index].uploadedImageAnswer = null;
            setFormData(prevState => ({
                ...prevState,
                answers: updatedAnswers
            }));
            window.location.reload();
        }
    }

    const handleDeleteAnswerImageButtonClick = (e, id, index) => {
        e.preventDefault();
        handleDeleteImageAnswerSubmit(e);
        handleDeleteAnswerImage(id, index);
    };

    const handleDeleteAnswerAudio = async (id, index) => {
        const response = await deleteAnswerAudio(id, csrfToken);
        if (response === 200) {
            const updatedAnswers = [...formData.answers];
            updatedAnswers[index].uploadedAudioAnswer = null;
            setFormData(prevState => ({
                ...prevState,
                answers: updatedAnswers
            }));
            window.location.reload();
        }
    }

    const handleDeleteAnswerAudioButtonClick = (e, id, index) => {
        e.preventDefault();
        handleDeleteAudioAnswerSubmit(e);
        handleDeleteAnswerAudio(id, index);
    };

    return (
        <div class="flex items-center justify-center p-2">
            <div class="mx-auto w-full bg-white">
                <div class="px-9 pt-4 font-medium text-xl text-custom-color-blue">Cập nhật câu trả lời</div>
                <form class="py-4 px-9" method="POST" type="submit">
                    {/* answer */}
                    <div class="mb-5">
                        <label
                            for="question_id"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Câu hỏi
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        {questions && questions.length > 0 && (
                            <select
                                name="question_id"
                                id="question_id"
                                value={formData.question.question_id}
                                required
                                onChange={(e) => setFormData({ ...formData, question: { question_id: e.target.value } })}
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md">
                                <option value="">Chọn câu hỏi</option>
                                {questions.map((question) => (
                                    <option key={question.question_id} value={question.question_id}>
                                        {question.question_name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div class="mb-5">
                        <label
                            for="answers"
                            class="mb-3 block text-base font-semibold text-custom-color-blue">
                            Câu trả lời
                            <span className="ml-2 text-sm text-custom-color-red-gray">(Ít nhất gồm 2 câu trả lời) (*)</span>
                        </label>

                        {formData.answers.map((answer, index) => (
                            <>
                                <div className="border-2 border-dashed p-6 my-4">
                                    <div className="flex justify-between items-center">
                                        <div className="block text-base font-medium text-custom-color-blue">
                                            Câu trả lời số {index + 1}

                                        </div>
                                        <button
                                            className="w-1/6 text-sm text-white bg-custom-color-red-gray py-2 rounded-lg font-semibold hover:scale-105 cursor-pointer transition-all"
                                            onClick={(e) => handleDeleteAnswer(e, index)}>
                                            Xóa câu trả lời {index + 1}
                                        </button>
                                    </div>

                                    <div key={index} className="flex py-2 items-center mb-2">
                                        <input
                                            type="text"
                                            name="answer_name"
                                            id="answer_name"
                                            required
                                            placeholder="い"
                                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 mr-10 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            value={answer.answer_name}
                                            onChange={(e) => handleChange(e, index)} />
                                        <input
                                            type="radio"
                                            name="answer_correct"
                                            id="answer_correct"
                                            className="w-5 h-5"
                                            checked={answer.answer_correct}
                                            onChange={(e) => handleChange(e, index)} />
                                    </div>

                                    <div class="mb-5">
                                        <label class="block text-base font-medium text-custom-color-blue mb-2">
                                            Upload hình ảnh trả lời số {index + 1}
                                        </label>

                                        <div class="">
                                            <input type="file" name={`answer_img_${index}`} id={`answer_img_${index}`} class="sr-only" onChange={(e) => handleImageAnswerChange(e, index)} />
                                            <label
                                                for={`answer_img_${index}`}
                                                class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                                                <div>
                                                    <span class="mb-2 block text-xl font-semibold text-custom-color-blue">
                                                        Kéo thả ảnh ở đây
                                                    </span>
                                                    <span class="mb-2 block text-base font-medium text-[#6B7280]">
                                                        Hoặc
                                                    </span>
                                                    <span
                                                        class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-custom-color-blue">
                                                        Chọn từ máy tính
                                                    </span>
                                                    <span
                                                        class="mb-2 block text-base font-medium text-[#6B7280] mt-4 text-custom-color-red-gray">
                                                        Chỉ nhận file .jpg, .png, .jpeg
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {(formData.answers[index].answer_img !== null || formData.answers[index].uploadedImageAnswer) ? (
                                        <div className="mb-5">
                                            <div className="relative rounded-md bg-[#F5F7FB] py-4 px-6">
                                                {(formData.answers[index].uploadProgressUploadImageAnswer === 100 || formData.answers[index].answer_img) && (
                                                    <button
                                                        className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 text-xl"
                                                        onClick={(e) => handleDeleteAnswerImageButtonClick(e, formData.answers[index].answer_id, index)}>
                                                        <FontAwesomeIcon icon={faClose} className="hover:scale-110 transition-all" />
                                                    </button>)}
                                                <div className="flex items-center">
                                                    {formData.answers[index].answer_img ? (
                                                        <>
                                                            <img src={formData.answers[index].answer_img} alt="question_img" className="w-[170px] h-[80px] rounded-lg object-cover" />
                                                            <span className="truncate pr-3 text-base font-medium text-custom-color-blue ml-3">
                                                                {formData.answers[index].answer_img || formData.answers[index].uploadedImageAnswer.name}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <LoadingUploadFile />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="relative">
                                                {formData.answers[index].uploadProgressUploadImageAnswer ? (
                                                    <>
                                                        <div className="mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                                                            <div
                                                                className="absolute left-0 h-full rounded-lg bg-[#6A64F1]"
                                                                style={{ width: `${formData.answers[index].uploadProgressUploadImageAnswer}%` }}>
                                                            </div>
                                                            <span className="absolute top-0 right-0 mt-[-20px] text-sm font-medium text-custom-color-blue">
                                                                {formData.answers[index].uploadProgressUploadImageAnswer}%
                                                            </span>
                                                        </div>
                                                    </>
                                                ) : (null)}
                                            </div>
                                        </div>
                                    ) : (
                                        null
                                    )}

                                    <div class="mb-5">
                                        <label class="block text-base font-medium text-custom-color-blue mb-2">
                                            Upload audio trả lời số {index + 1}
                                        </label>

                                        <div class="">
                                            <input type="file" name={`answer_audio_${index}`} id={`answer_audio_${index}`} class="sr-only" onChange={(e) => handleAudioAnswerChange(e, index)} />
                                            <label
                                                for={`answer_audio_${index}`}
                                                class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                                                <div>
                                                    <span class="mb-2 block text-xl font-semibold text-custom-color-blue">
                                                        Kéo thả audio ở đây
                                                    </span>
                                                    <span class="mb-2 block text-base font-medium text-[#6B7280]">
                                                        Hoặc
                                                    </span>
                                                    <span
                                                        class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-custom-color-blue">
                                                        Chọn từ máy tính
                                                    </span>
                                                    <span
                                                        class="mb-2 block text-base font-medium text-[#6B7280] mt-4 text-custom-color-red-gray">
                                                        Chỉ nhận file.mp3
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {(formData.answers[index].answer_audio !== null || formData.answers[index].uploadedAudioAnswer) ? (
                                        <div className="mb-5">
                                            <div className="relative rounded-md bg-[#F5F7FB] py-4 px-6">
                                                {(formData.answers[index].uploadedAudioAnswer === 100 || formData.answers[index].answer_audio) && (
                                                    <button
                                                        className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 text-xl"
                                                        onClick={(e) => handleDeleteAnswerAudioButtonClick(e, formData.answers[index].answer_id, index)}>
                                                        <FontAwesomeIcon icon={faClose} className="hover:scale-110 transition-all" />
                                                    </button>)}
                                                <div className="flex items-center">
                                                    {(formData.answers[index].answer_audio) ? (
                                                        <>
                                                            <span onClick={() => playAudio(formData.answers[index].answer_audio)}>
                                                                <FontAwesomeIcon icon={faPlay} className="text-xl pl-2 hover:scale-125 cursor-pointer transition-all text-custom-color-blue" />
                                                            </span>
                                                            <span className="truncate pr-3 text-base font-medium text-custom-color-blue ml-3">
                                                                {formData.answers[index].answer_audio || formData.answers[index].uploadedAudioAnswer.name}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <LoadingUploadFile />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="relative">
                                                {formData.answers[index].uploadedAudioAnswer ? (
                                                    <>
                                                        <div className="mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                                                            <div
                                                                className="absolute left-0 h-full rounded-lg bg-[#6A64F1]"
                                                                style={{ width: `${formData.answers[index].uploadedAudioAnswer}%` }}>
                                                            </div>
                                                            <span className="absolute top-0 right-0 mt-[-20px] text-sm font-medium text-custom-color-blue">
                                                                {formData.answers[index].uploadedAudioAnswer}%
                                                            </span>
                                                        </div>
                                                    </>
                                                ) : (null)}
                                            </div>
                                        </div>
                                    ) : (
                                        null
                                    )}
                                </div>
                            </>
                        ))}

                        <button
                            type="button"
                            className="w-1/6 text-sm text-white bg-custom-color-blue py-2 rounded-lg font-semibold hover:scale-105 cursor-pointer transition-all"
                            onClick={handleAddAnswer}>Thêm câu trả lời</button>
                    </div>

                    <div>
                        <button
                            className={"hover:shadow-form w-full rounded-md py-3 px-8 text-center text-base font-semibold text-white outline-none bg-[#6A64F1] hover:bg-[#5C59C2] cursor-pointer"}
                            onClick={handleSubmit}>
                            Cập nhật câu trả lời
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAnswerPage;
