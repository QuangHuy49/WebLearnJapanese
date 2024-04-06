import React, { useState, useEffect } from 'react';
import { getLesson } from '../../../../../services/LessonServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addGrammar } from '../../../../../services/GrammarServices';

const AddGrammarPage = () => {
    const [formData, setFormData] = useState({
        lesson_id: '',
        grammar_title: '',
        grammar_mean: '',
        grammar_detail: '',
        grammar_example: '',
        grammar_note: '',
        grammar_status: ''
    });
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

        fetchTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const fetchTypes = async () => {
        try {
            const response = await getLesson();
            setLessons(response);
        } catch (error) {
            console.error('Error fetching types:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addGrammar(formData, csrfToken);
            if (response.status === 201) {
                toast.success('Thêm ngữ pháp mới thành công!');
                navigate(`/admin/lesson/detail-lesson/${formData.lesson_id}/grammar`);
            } else {
                toast.error('Thêm ngữ pháp mới thất bại. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Failed to add grammar:', error);
            toast.error('Đã xảy ra lỗi trong quá trình thêm ngữ pháp.');
        }
    };

    return (
        <div class="flex items-center justify-center p-2">
            <div class="mx-auto w-full bg-white">
                <div class="px-9 pt-4 font-medium text-xl text-custom-color-blue">Thêm ngữ pháp mới</div>
                <form class="py-4 px-9" method="POST">
                    <div class="mb-5">
                        <label
                            for="grammar_title"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Chủ đề ngữ pháp
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        <input
                            type="text"
                            name="grammar_title"
                            id="grammar_title"
                            required
                            placeholder="Danh từ 1 は Danh từ 2 です。"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={formData.grammar_title}
                                onChange={handleChange}
                        />
                    </div>

                    <div class="mb-5">
                        <label
                            for="grammar_mean"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Nghĩa
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        <input
                            type="text"
                            name="grammar_mean"
                            id="grammar_mean"
                            required
                            placeholder="Danh từ 1 là danh từ 2"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={formData.grammar_mean}
                                onChange={handleChange}
                        />
                    </div>

                    <div class="mb-5">
                        <label
                            for="grammar_detail"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Giải thích ngữ pháp
                            <span className="ml-2 text-sm text-custom-color-red-gray">(Mỗi dòng giải thích cách nhau bởi dấu ".")</span>
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        <textarea rows="10"
                            type="text"
                            name="grammar_detail"
                            id="grammar_detail"
                            required
                            placeholder="Trợ từ 「は」 được dừng sau Danh từ 1 để biểu thị Danh từ 1 là chủ đề của câu. です được dùng ở cuối câu khẳng định thì hiện tại dạng “Danh từ 1 là Danh từ 2” và thể hiện sự tôn trọng, lịch sự đối với người nghe. Trợ từ「は」đọc là 「わ」。"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={formData.grammar_detail}
                                onChange={handleChange}
                        />
                    </div>

                    <div class="mb-5">
                        <label
                            for="grammar_example"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Ví dụ
                            <span className="ml-2 text-sm text-custom-color-red-gray">(Nếu có nhiều ví dụ thì phải bao gồm "例 1 (ví dụ 1), 例 2 (ví dụ 2), ...")</span>
                        </label>
                        <textarea rows="10"
                            type="text"
                            name="grammar_example"
                            id="grammar_example"
                            placeholder="例 1 (ví dụ 1): 私 は 学生 です。(Tôi là sinh viên.)"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={formData.grammar_example}
                                onChange={handleChange}
                        />
                    </div>

                    <div class="mb-5">
                        <label
                            for="grammar_note"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Lưu ý
                        </label>
                        <input
                            type="text-area"
                            name="grammar_note"
                            id="grammar_note"
                            placeholder="Note"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={formData.grammar_note}
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
                                value={formData.lesson_id}
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
                            for="grammar_status"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Trạng thái
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        <select
                            name="grammar_status"
                            id="grammar_status"
                            required
                            value={formData.grammar_status}
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
                            className={`hover:shadow-form w-full rounded-md py-3 px-8 text-center text-base font-semibold text-white outline-none bg-[#6A64F1] hover:bg-[#5C59C2] cursor-pointer`}
                            onClick={handleSubmit}>
                            Thêm ngữ pháp mới
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddGrammarPage;