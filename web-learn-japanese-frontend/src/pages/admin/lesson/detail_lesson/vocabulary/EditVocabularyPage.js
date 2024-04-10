import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteVocabularyAudio, getVocabularyByid, updateVocabulary } from '../../../../../services/VocabularyServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPlay } from '@fortawesome/free-solid-svg-icons';
import { getLesson } from '../../../../../services/LessonServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../../../../firebase';
import LoadingUploadFile from '../../../../../components/loading/LoadingUploadFile';

const EditVocabularyPage = () => {
    let { id } = useParams();
    id = id ?? 0;
    const initState = {
        lesson_id: '',
        vocabulary_name: '',
        vocabulary_character: '',
        vocabulary_yin_han: '',
        vocabulary_mean: '',
        vocabulary_audio: '',
        vocabulary_status: 0
    }, [vocabulary, setVocabulary] = useState(initState);

    const statusOptions = [
        { value: 1, label: 'Xuất bản' },
        { value: 0, label: 'Chưa xuất bản' }
    ];

    const [uploadedAudio, setUploadedAudio] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [lessons, setLessons] = useState([]);
    const [csrfToken, setCsrfToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }

        getVocabulary();
        fetchTypes();
    }, []);

    const getVocabulary = async () => {
        const data = await getVocabularyByid(id);
        if (data) {
            setVocabulary(data);
        } else {
            setVocabulary([]);
        }
    }

    const fetchTypes = async () => {
        try {
            const response = await getLesson();
            setLessons(response);
        } catch (error) {
            console.error('Error fetching types:', error);
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setUploadedAudio(file);
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
                    setUploadProgress(progress);
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
                        setVocabulary({ ...vocabulary, vocabulary_audio: downloadURL });
                    });
                }
            );
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleDeleteAudioSubmit = async () => {
        try {
            if (!uploadedAudio) {
                return;
            }

            const storageRef = ref(storage, `audios/${uploadedAudio.name}`);
            await deleteObject(storageRef);

            setUploadedAudio(null);
            setUploadProgress(0);
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

    const handleDeleteButtonClick = (e) => {
        e.preventDefault();
        handleDeleteVocabularyAudio();
        handleDeleteAudioSubmit();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVocabulary({ ...vocabulary, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateVocabulary(id, vocabulary, csrfToken);
            if (response.status === 201) {
                toast.success('Cập nhật từ vựng thành công!');
                navigate(`/admin/lesson/detail-lesson/${vocabulary.lesson_id}`);
            } else {
                toast.error('Cập nhật từ vựng thất bại. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Failed to update vocabulary:', error);
            toast.error('Đã xảy ra lỗi trong quá trình cập nhật từ vựng.');
        }
    };

    const handleDeleteVocabularyAudio = async () => {
        const response = await deleteVocabularyAudio(id, csrfToken);
        if (response === 200) {
            setVocabulary({ ...vocabulary, vocabulary_audio: null });
            setUploadedAudio(null);
        }
    }

    return (
        <div class="flex items-center justify-center p-2">
            <div class="mx-auto w-full bg-white">
                <div class="px-9 pt-4 font-medium text-xl text-custom-color-blue">Cập nhật từ vựng</div>
                <form class="py-4 px-9" method="POST">
                    <div class="mb-5">
                        <label
                            for="vocabulary_name"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Từ vựng
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        <input
                            type="text"
                            name="vocabulary_name"
                            id="vocabulary_name"
                            required
                            placeholder="にほんご"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={vocabulary.vocabulary_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div class="mb-5">
                        <label
                            for="vocabulary_character"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Hán tự
                        </label>
                        <input
                            type="text"
                            name="vocabulary_character"
                            id="vocabulary_character"
                            placeholder="日本語"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={vocabulary.vocabulary_character}
                            onChange={handleChange}
                        />
                    </div>

                    <div class="mb-5">
                        <label
                            for="vocabulary_yin_han"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Âm hán
                        </label>
                        <input
                            type="text"
                            name="vocabulary_yin_han"
                            id="vocabulary_yin_han"
                            placeholder="NHẬT BỔN NGỮ"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={vocabulary.vocabulary_yin_han}
                            onChange={handleChange}
                        />
                    </div>

                    <div class="mb-5">
                        <label
                            for="vocabulary_mean"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Nghĩa
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        <input
                            type="text"
                            name="vocabulary_mean"
                            id="vocabulary_mean"
                            required
                            placeholder="Tiếng Nhật"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={vocabulary.vocabulary_mean}
                            onChange={handleChange}
                        />
                    </div>

                    <div class="mb-6">
                        <label class="block text-base font-medium text-custom-color-blue">
                            Upload audio
                        </label>

                        <div class="mb-8">
                            <input type="file" name="file" id="file" class="sr-only" onChange={handleFileChange} />
                            <label
                                for="file"
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

                    {(vocabulary.vocabulary_audio !== null || uploadedAudio) ? (
                        <div className="mb-5">
                            <div className="relative rounded-md bg-[#F5F7FB] py-4 px-8">
                            {(uploadProgress === 100 || vocabulary.vocabulary_audio) && (
                                    <button
                                        className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 text-xl"
                                        onClick={handleDeleteButtonClick}>
                                        <FontAwesomeIcon icon={faClose} className="hover:scale-110 transition-all" />
                                    </button>)}
                                <div className="flex items-center">
                                    {(vocabulary.vocabulary_audio) ? (
                                        <>
                                            <span onClick={() => playAudio(vocabulary.vocabulary_audio)}>
                                                <FontAwesomeIcon icon={faPlay} className="text-xl pl-2 hover:scale-125 cursor-pointer transition-all text-custom-color-blue" />
                                            </span>
                                            <span className="truncate w-[600px] pr-3 text-base font-medium text-custom-color-blue ml-3">
                                                {(vocabulary.vocabulary_audio || uploadedAudio.name)}
                                            </span>
                                        </>
                                    ) : (
                                        <LoadingUploadFile />
                                    )}
                                </div>
                            </div>
                            <div className="relative">
                                {uploadedAudio ? (
                                    <>
                                        <div className="mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                                            <div
                                                className="absolute left-0 h-full rounded-lg bg-[#6A64F1]"
                                                style={{ width: `${uploadProgress}%` }}>
                                            </div>
                                            <span className="absolute top-0 right-0 mt-[-20px] text-sm font-medium text-custom-color-blue">
                                                {uploadProgress}%
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
                            for="lesson_id"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Bài học
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        {lessons && lessons.length > 0 && (
                            <select
                                name="lesson_id"
                                id="lesson_id"
                                required
                                value={vocabulary.lesson_id}
                                onChange={handleChange}
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md">
                                <option value="">Chọn bài học</option>
                                {lessons.map((lesson) => (
                                    <option key={lesson.lesson_id} value={lesson.lesson_id}>
                                        {lesson.lesson_name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div class="mb-5">
                        <label
                            for="vocabulary_status"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Trạng thái
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        <select
                            name="vocabulary_status"
                            id="vocabulary_status"
                            required
                            value={vocabulary.vocabulary_status}
                            onChange={handleChange}
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
                            className='hover:shadow-form w-full rounded-md py-3 px-8 text-center text-base font-semibold text-white outline-none bg-[#6A64F1] hover:bg-[#5C59C2] cursor-pointer'
                            onClick={handleSubmit}
                        >
                            Cập nhật từ vựng
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditVocabularyPage;