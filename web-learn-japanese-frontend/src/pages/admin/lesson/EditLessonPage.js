import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteLessonImage, getLessonByid, updateLesson } from '../../../services/LessonServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faImage } from '@fortawesome/free-solid-svg-icons';
import { getType } from '../../../services/TypeServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../../firebase';
import LoadingUploadFile from '../../../components/loading/LoadingUploadFile';

const EditLessonPage = () => {
    let { id } = useParams();
    id = id ?? 0;
    const initState = {
        type_id: '',
        lesson_name: '',
        lesson_img: '',
        lesson_status: ''
    }, [lesson, setLesson] = useState(initState);
    const statusOptions = [
        { value: 1, label: 'Xuất bản' },
        { value: 0, label: 'Chưa xuất bản' }
    ];
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [types, setTypes] = useState([]);
    const [csrfToken, setCsrfToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }

        getLesson();
        fetchTypes();
    }, []);

    const getLesson = async () => {
        const data = await getLessonByid(id);
        if (data) {
            setLesson(data);
        } else {
            setLesson([]);
        }
    }

    const fetchTypes = async () => {
        try {
            const response = await getType();
            setTypes(response);
        } catch (error) {
            console.error('Error fetching types:', error);
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setUploadedImage(file);
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
                        setLesson({ ...lesson, lesson_img: downloadURL });
                    });
                }
            );
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleDeleteImageSubmit = async () => {
        try {
            if (!uploadedImage) {
                return;
            }

            const storageRef = ref(storage, `images/${uploadedImage.name}`);
            await deleteObject(storageRef);

            setUploadedImage(null);
            setUploadProgress(0);
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleDeleteButtonClick = (e) => {
        e.preventDefault();
        handleDeleteLessonImage();
        handleDeleteImageSubmit();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLesson({ ...lesson, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateLesson(id, lesson, csrfToken);
            if (response.status === 201) {
                toast.success('Cập nhật bài học thành công!');
                navigate('/admin/lesson');
            } else {
                toast.error('Cập nhật bài học thất bại. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Failed to register:', error);
            toast.error('Đã xảy ra lỗi trong quá trình cập nhật bài học.');
        }
    };

    const handleDeleteLessonImage = async () => {
        const response = await deleteLessonImage(id, csrfToken);
        if (response === 200) {
            setLesson({ ...lesson, lesson_img: null });
            setUploadedImage(null);
        }
    }

    return (
        <div class="flex items-center justify-center p-2">
            <div class="mx-auto w-full bg-white">
                <div class="px-9 pt-4 font-medium text-xl text-custom-color-blue">Cập nhật bài học</div>
                <form class="py-4 px-9" method="POST">
                    <div class="mb-5">
                        <label
                            for="lesson_name"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Tên bài học
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        <input
                            type="text"
                            name="lesson_name"
                            id="lesson_name"
                            required
                            placeholder="Bài 1 - Minna no Nihongo"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={lesson.lesson_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div class="mb-6">
                        <label class="block text-base font-medium text-custom-color-blue">
                            Upload File
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>

                        <div class="mb-8">
                            <input type="file" name="file" id="file" class="sr-only" required onChange={handleFileChange} />
                            <label
                                for="file"
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
                                </div>
                            </label>
                        </div>
                    </div>

                    {(lesson.lesson_img !== null || uploadedImage) ? (
                        <div className="mb-5">
                            <div className="rounded-md bg-[#F5F7FB] py-4 px-8">
                                <div className="flex items-center">
                                    {(lesson.lesson_img) ? (
                                        <>
                                            <img src={lesson.lesson_img} alt="lesson_img" className="w-[170px] h-[80px] rounded-lg object-cover" />
                                            <span className="truncate w-[600px] pr-3 text-base font-medium text-custom-color-blue ml-3">
                                                {(lesson.lesson_img || uploadedImage.name)}
                                            </span>
                                        </>
                                    ) : (
                                        <LoadingUploadFile />
                                    )}
                                </div>
                            </div>
                            <div className="relative">
                                {(uploadProgress === 100 || lesson.lesson_img) && (
                                    <button
                                        className="absolute top-[-70px] right-[20px] text-gray-500 text-xl"
                                        onClick={handleDeleteButtonClick}>
                                        <FontAwesomeIcon icon={faClose} className="hover:scale-110 transition-all" />
                                    </button>)}
                                {uploadedImage ? (
                                    <>
                                        <div className="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
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
                            for="type_id"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Thể loại
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        {types && types.length > 0 && (
                            <select
                                name="type_id"
                                id="type_id"
                                required
                                value={lesson.type_id}
                                onChange={handleChange}
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md">
                                <option value="">Chọn thể loại</option>
                                {types.map((type) => (
                                    <option key={type.type_id} value={type.type_id}>
                                        {type.type_name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div class="mb-5">
                        <label
                            for="lesson_status"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Trạng thái
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        <select
                            name="lesson_status"
                            id="lesson_status"
                            required
                            value={lesson.lesson_status}
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
                            Cập nhật bài học
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditLessonPage;