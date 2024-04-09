import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTestByid, updateTest } from '../../../services/TestServices';
import { getLesson } from '../../../services/LessonServices';
import { toast } from 'react-toastify';

const EditTestPage = () => {
    let { id } = useParams();
    id = id ?? 0;
    const initState = {
        lesson_id: '',
        test_name: '',
        test_status: ''
    }, [test, setTest] = useState(initState);
    const statusOptions = [
        { value: 1, label: 'Xuất bản' },
        { value: 0, label: 'Chưa xuất bản' }
    ];
    const [lessons, setLessons] = useState([]);
    const [csrfToken, setCsrfToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }

        getTest();
        fetchLessons();
    }, []);

    const getTest = async () => {
        const data = await getTestByid(id);
        if (data) {
            setTest(data);
        } else {
            setTest([]);
        }
    }

    const fetchLessons = async () => {
        try {
            const response = await getLesson();
            setLessons(response);
        } catch (error) {
            console.error('Error fetching types:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTest({ ...test, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateTest(id, test, csrfToken);
            if (response.status === 201) {
                toast.success('Cập nhật bài kiểm tra thành công!');
                navigate('/admin/test');
            } else {
                toast.error('Cập nhật bài kiểm tra thất bại. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Failed to register:', error);
            toast.error('Đã xảy ra lỗi trong quá trình cập nhật bài kiểm tra.');
        }
    };

    return (
        <div class="flex items-center justify-center p-2">
            <div class="mx-auto w-full bg-white">
                <div class="px-9 pt-4 font-medium text-xl text-custom-color-blue">Cập nhật bài kiểm tra</div>
                <form class="py-4 px-9" method="POST">
                    <div class="mb-5">
                        <label
                            for="test_name"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Tên bài bài kiểm tra
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        <input
                            type="text"
                            name="test_name"
                            id="test_name"
                            required
                            placeholder="Bài kiểm tra số 1"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={test.test_name}
                            onChange={handleChange}
                        />
                    </div>

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
                                value={test.lesson_id}
                                onChange={handleChange}
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md">
                                <option value="">Chọn thể loại</option>
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
                            for="test_status"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Trạng thái
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        <select
                            name="test_status"
                            id="test_status"
                            required
                            value={test.test_status}
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
                            onClick={handleSubmit}>
                            Cập nhật kiểm tra
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTestPage;