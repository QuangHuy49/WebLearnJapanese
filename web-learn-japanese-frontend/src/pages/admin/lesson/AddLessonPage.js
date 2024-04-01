import React, { useState, useEffect } from 'react';
import { handleDeleteImage, handleUploadImage } from '../../../services/FileServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faImage} from '@fortawesome/free-solid-svg-icons';
import { getType } from '../../../services/TypeServices';
import { addLesson } from '../../../services/LessonServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddLessonPage = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showProgressBar, setShowProgressBar] = useState(false);
    const [types, setTypes] = useState([]);
    const statusOptions = [
        { value: 1, label: 'Xuất bản' },
        { value: 0, label: 'Chưa xuất bản' }
    ];
    const [csrfToken, setCsrfToken] = useState('');
    const [formData, setFormData] = useState({
        type_id: '',
        lesson_name: '',
        lesson_img: '',
        lesson_status: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }

        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        try {
            const response = await getType();
            console.log(response);
            setTypes(response);
        } catch (error) {
            console.error('Error fetching types:', error);
        }
    };

    const createImageUrl = (imageName) => {
        return `http://127.0.0.1:8000/storage/img/${imageName}`;
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setUploadProgress(0);
        setShowProgressBar(true);
        const response = await handleUploadImage(file, handleProgress);
        if (response.status === 200) {
            setUploadedImage(response.data);
            setFormData({ ...formData, lesson_img: createImageUrl(response.data.filename) });
        }
    };

    const handleProgress = (progress) => {
        setUploadProgress(progress);
    };

    const handleDeleteImageSubmit = async () => {
        try {
            const deleteResult = await handleDeleteImage(uploadedImage.filename);
            if (deleteResult.success) {
                setUploadedImage(null);
                setUploadProgress(0);
                setShowProgressBar(false);
            } else {
                console.error(deleteResult.error);
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleDeleteButtonClick = (e) => {
        e.preventDefault();
        handleDeleteImageSubmit();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addLesson(formData, csrfToken);
            if (response.status === 201) {
                toast.success('Thêm bài học mới thành công!');
                navigate('/admin/lesson');
            } else {
                toast.error('Thêm bài học mới thất bại. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Failed to register:', error);
            toast.error('Đã xảy ra lỗi trong quá trình thêm bài học.');
        }
    };
    
    return (
        <div class="flex items-center justify-center p-2">
            <div class="mx-auto w-full bg-white">
                <div class="px-9 pt-4 font-medium text-xl text-custom-color-blue">Thêm bài học mới</div>
                <form class="py-4 px-9" method="POST">
                    <div class="mb-5">
                        <label
                            for="lesson_name"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Tên bài học
                        </label>
                        <input
                            type="text"
                            name="lesson_name"
                            id="lesson_name"
                            placeholder="Bài 1 - Minna no Nihongo"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={formData.lesson_name}
                                onChange={handleChange}
                        />
                    </div>

                    <div class="mb-6">
                        <label class="block text-base font-medium text-custom-color-blue">
                            Upload File
                        </label>

                        <div class="mb-8">
                            <input type="file" name="file" id="file" class="sr-only" onChange={handleFileChange} />
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

                    {uploadedImage && (
                        <div className="mb-5">
                            <div className="rounded-md bg-[#F5F7FB] py-4 px-8">
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faImage} />
                                    <span className="truncate pr-3 text-base font-medium text-custom-color-blue ml-3">
                                        {uploadedImage.filename}
                                    </span>
                                </div>
                            </div>
                            {showProgressBar && (
                                <div className="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                                    <button
                                        className="absolute top-[-59px] right-4 text-gray-500"
                                        onClick={handleDeleteButtonClick}>
                                        <FontAwesomeIcon icon={faClose} className="hover:scale-110 transition-all" />
                                    </button>
                                    <div
                                        className="absolute left-0 h-full rounded-lg bg-[#6A64F1]"
                                        style={{ width: `${uploadProgress}%` }}>
                                    </div>
                                    <span className="absolute top-0 right-0 mt-[-20px] text-sm font-medium text-custom-color-blue">
                                        {uploadProgress}%
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    <div class="mb-5">
                        <label
                            for="type_id"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Thể loại
                        </label>
                        {types && types.length > 0 && (
                            <select
                                name="type_id"
                                id="type_id"
                                value={formData.type_id}
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
                        </label>
                        <select
                            name="lesson_status"
                            id="lesson_status"
                            value={formData.lesson_status}
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
                            className={`hover:shadow-form w-full rounded-md py-3 px-8 text-center text-base font-semibold text-white outline-none ${uploadProgress < 100 ? 'bg-[#E5E7EB] cursor-not-allowed' : 'bg-[#6A64F1] hover:bg-[#5C59C2] cursor-pointer'}`}
                            disabled={uploadProgress < 100}
                            onClick={handleSubmit}
                        >
                            Thêm bài học mới
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddLessonPage;