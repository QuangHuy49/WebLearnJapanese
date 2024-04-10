import React, { useEffect, useState } from 'react';
import { deleteQuestionAudio, deleteQuestionImage, getQuestionByid, updateQuestion } from '../../../../services/QuestionServices';
import { getTest } from '../../../../services/TestServices';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../../../firebase';
import LoadingUploadFile from '../../../../components/loading/LoadingUploadFile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditQuestionPage = () => {
    let { id } = useParams();
    const [formData, setFormData] = useState({
        test_id: '',
        question_name: '',
        question_img: '',
        question_audio: '',
        question_status: 0
    });
    const statusOptions = [
        { value: 1, label: 'Xuất bản' },
        { value: 0, label: 'Chưa xuất bản' }
    ];
    const [csrfToken, setCsrfToken] = useState('');
    const [tests, setTests] = useState([]);
    const navigate = useNavigate();
    const [uploadedImageQuestion, setUploadedImageQuestion] = useState(null);
    const [uploadProgressUploadImageQuestion, setUploadProgressUpLoadImageQuestion] = useState(0);
    const [uploadedAudioQuestion, setUploadedAudioQuestion] = useState(null);
    const [uploadProgressUploadAudioQuestion, setUploadProgressUpLoadAudioQuestion] = useState(0);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }

        getQuestionAnswer();
        fetchTests();
    }, []);

    const getQuestionAnswer = async () => {
        const data = await getQuestionByid(id);
        if (data) {
            setFormData(data);
        } else {
            setFormData([]);
        }
    }

    const fetchTests = async () => {
        const data = await getTest();
        if (data) {
            setTests(data);
        } else {
            setTests([]);
        }
    };

    const handleImageQuestionChange = async (event) => {
        const file = event.target.files[0];
        setUploadedImageQuestion(file);
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
                    setUploadProgressUpLoadImageQuestion(progress);
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
                        setFormData({ ...formData, question_img: downloadURL });
                    });
                }
            );
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleDeleteImageQuestionSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!uploadedImageQuestion) {
                return;
            }

            const storageRef = ref(storage, `images/${uploadedImageQuestion.name}`);
            await deleteObject(storageRef);

            setUploadedImageQuestion(null);
            setUploadProgressUpLoadImageQuestion(0);
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleAudioQuestionChange = async (event) => {
        const file = event.target.files[0];
        setUploadedAudioQuestion(file);
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
                    setUploadProgressUpLoadAudioQuestion(progress);
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
                        setFormData({ ...formData, question_audio: downloadURL });
                    });
                }
            );
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleDeleteAudioQuestionSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!uploadedAudioQuestion) {
                return;
            }

            const storageRef = ref(storage, `audios/${uploadedAudioQuestion.name}`);
            await deleteObject(storageRef);

            setUploadedAudioQuestion(null);
            setUploadProgressUpLoadAudioQuestion(0);
        } catch (error) {
            console.error('Error deleting audio:', error);
        }
    };

    const playAudio = (audioUrl) => {
        const audio = new Audio(audioUrl);
        audio.play()
            .catch(error => {
                console.error('Failed to play audio:', error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateQuestion(id, formData, csrfToken);
            if (response.status === 201) {
                toast.success('Cập nhật câu hỏi thành công!');
                navigate(`/admin/test/question/${formData.test_id}`);
            } else {
                toast.error('Cập nhật câu hỏi thất bại. Vui lòng thử lại!');
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi trong quá trình cập nhật câu hỏi');
        }
    };

    const handleDeleteQuestionImage = async () => {
        const response = await deleteQuestionImage(id, csrfToken);
        if (response === 200) {
            setFormData({ ...formData, question_img: null });
            setUploadedImageQuestion(null);
        }
    }

    const handleDeleteQuestionImageButtonClick = (e) => {
        e.preventDefault();
        handleDeleteImageQuestionSubmit(e);
        handleDeleteQuestionImage();
    };

    const handleDeleteQuestionAudio = async () => {
        const response = await deleteQuestionAudio(id, csrfToken);
        if (response === 200) {
            setFormData({ ...formData, question_audio: null });
            setUploadedAudioQuestion(null);
        }
    }

    const handleDeleteQuestionAudioButtonClick = (e) => {
        e.preventDefault();
        handleDeleteAudioQuestionSubmit(e);
        handleDeleteQuestionAudio();
    };

    return (
        <div class="flex items-center justify-center p-2">
            <div class="mx-auto w-full bg-white">
                <div class="px-9 pt-4 font-medium text-xl text-custom-color-blue">Cập nhật câu hỏi</div>
                <form class="py-4 px-9" method="POST" type="submit">
                    <div class="mb-5">
                        <label
                            for="test_id"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Bài kiểm tra
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        {tests && tests.length > 0 && (
                            <select
                                name="test_id"
                                id="test_id"
                                value={formData.test_id}
                                required
                                onChange={(e) => setFormData({ ...formData, test_id: e.target.value })}
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md">
                                <option value="">Chọn bài kiểm tra</option>
                                {tests.map((test) => (
                                    <option key={test.test_id} value={test.test_id}>
                                        {test.test_name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div class="mb-5">
                        <label
                            for="question_name"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Câu hỏi
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        <input
                            type="text"
                            name="question_name"
                            id="question_name"
                            required
                            placeholder="Đâu là 'あ'"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={formData.question_name}
                            onChange={(e) => setFormData({ ...formData, question_name: e.target.value })}
                        />
                    </div>

                    <div class="mb-5">
                        <label class="block text-base font-medium text-custom-color-blue mb-2">
                            Upload hình ảnh câu hỏi
                        </label>

                        <div class="">
                            <input type="file" name="question_img" id="question_img" class="sr-only" onChange={handleImageQuestionChange} />
                            <label
                                for="question_img"
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

                    {(formData.question_img !== null || uploadedImageQuestion) ? (
                        <div className="mb-5">
                            <div className="relative rounded-md bg-[#F5F7FB] py-4 px-8">
                                {(uploadProgressUploadAudioQuestion === 100 || formData.question_img) && (
                                    <button
                                        className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 text-xl"
                                        onClick={(e) => handleDeleteQuestionImageButtonClick(e)}>
                                        <FontAwesomeIcon icon={faClose} className="hover:scale-110 transition-all" />
                                    </button>)}
                                <div className="flex items-center">
                                    {formData.question_img ? (
                                        <>
                                            <img src={formData.question_img} alt="question_img" className="w-[170px] h-[80px] rounded-lg object-cover" />
                                            <span className="truncate pr-3 text-base font-medium text-custom-color-blue ml-3">
                                                {formData.question_img || uploadedImageQuestion.name}
                                            </span>
                                        </>
                                    ) : (
                                        <LoadingUploadFile />
                                    )}
                                </div>
                            </div>
                            <div className="relative">
                                {uploadProgressUploadImageQuestion ? (
                                    <>
                                        <div className="mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                                            <div
                                                className="absolute left-0 h-full rounded-lg bg-[#6A64F1]"
                                                style={{ width: `${uploadProgressUploadImageQuestion}%` }}>
                                            </div>
                                            <span className="absolute top-0 right-0 mt-[-20px] text-sm font-medium text-custom-color-blue">
                                                {uploadProgressUploadImageQuestion}%
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
                            Upload audio câu hỏi
                        </label>

                        <div class="">
                            <input type="file" name="question_audio" id="question_audio" class="sr-only" onChange={handleAudioQuestionChange} />
                            <label
                                for="question_audio"
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

                    {(formData.question_audio !== null || uploadedAudioQuestion) ? (
                        <div className="mb-5">
                            <div className="relative rounded-md bg-[#F5F7FB] py-4 px-8">
                                {(uploadProgressUploadAudioQuestion === 100 || formData.question_audio) && (
                                    <button
                                        className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 text-xl"
                                        onClick={(e) => handleDeleteQuestionAudioButtonClick(e)}>
                                        <FontAwesomeIcon icon={faClose} className="hover:scale-110 transition-all" />
                                    </button>)}
                                <div className="flex items-center">
                                    {(formData.question_audio) ? (
                                        <>
                                            <span onClick={() => playAudio(formData.question_audio)}>
                                                <FontAwesomeIcon icon={faPlay} className="text-xl pl-2 hover:scale-125 cursor-pointer transition-all text-custom-color-blue" />
                                            </span>
                                            <span className="truncate w-[600px] pr-3 text-base font-medium text-custom-color-blue ml-3">
                                                {formData.question_audio || uploadedAudioQuestion.name}
                                            </span>
                                        </>
                                    ) : (
                                        <LoadingUploadFile />
                                    )}
                                </div>
                            </div>
                            <div className="relative">
                                {uploadProgressUploadAudioQuestion ? (
                                    <>
                                        <div className="mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                                            <div
                                                className="absolute left-0 h-full rounded-lg bg-[#6A64F1]"
                                                style={{ width: `${uploadProgressUploadAudioQuestion}%` }}>
                                            </div>
                                            <span className="absolute top-0 right-0 mt-[-20px] text-sm font-medium text-custom-color-blue">
                                                {uploadProgressUploadAudioQuestion}%
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
                        <label
                            for="question_status"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Trạng thái
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        <select
                            name="question_status"
                            id="question_status"
                            value={formData.question_status}
                            required
                            onChange={(e) => setFormData({ ...formData, question_status: e.target.value })}
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md">
                            <option value="">Chọn trạng thái</option>
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <button
                            className={"hover:shadow-form w-full rounded-md py-3 px-8 text-center text-base font-semibold text-white outline-none bg-[#6A64F1] hover:bg-[#5C59C2] cursor-pointer"}
                            onClick={handleSubmit}>
                            Cập nhật câu hỏi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditQuestionPage;
