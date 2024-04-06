import React, { useState, useEffect } from 'react';
import { addType } from '../../../services/TypeServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddTypePage = () => {
    const statusOptions = [
        { value: 1, label: 'Xuất bản' },
        { value: 0, label: 'Chưa xuất bản' }
    ];
    const [csrfToken, setCsrfToken] = useState('');
    const [formData, setFormData] = useState({
        type_name: '',
        type_status: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addType(formData, csrfToken);
            if (response.status === 201) {
                toast.success('Thêm thể loại bài học mới thành công!');
                navigate('/admin/type');
            } else {
                toast.error('Thêm thể loại bài học mới thất bại. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Failed to register:', error);
            toast.error('Đã xảy ra lỗi trong quá trình thêm thể loại bài học.');
        }
    };
    
    return (
        <div class="flex items-center justify-center p-2">
            <div class="mx-auto w-full bg-white">
                <div class="px-9 pt-4 font-medium text-xl text-custom-color-blue">Thêm thể loại mới</div>
                <form class="py-4 px-9" method="POST">        
                    <div class="mb-5">
                        <label
                            for="type_name"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Tên thể loại
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        <input
                            type="text"
                            name="type_name"
                            id="type_name"
                            required
                            placeholder="Tên thể loại"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={formData.type_name}
                                onChange={handleChange}
                        />
                    </div>

                    <div class="mb-5">
                        <label
                            for="type_status"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Trạng thái
                            <span className="ml-2 text-sm text-custom-color-red-gray">(*)</span>
                        </label>
                        <select
                            name="type_status"
                            id="type_status"
                            required
                            value={formData.type_status}
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
                             className="hover:shadow-form w-full rounded-md py-3 px-8 text-center text-base font-semibold text-white outline-none bg-[#6A64F1] hover:bg-[#5C59C2] cursor-pointer"
                            onClick={handleSubmit}>
                            Thêm thể loại mới
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTypePage;