import React, { useState, useEffect } from 'react';
import { handleDeleteImage, handleUploadImage } from '../../../services/FileServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faImage} from '@fortawesome/free-solid-svg-icons';
import { addUser } from '../../../services/UserServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddUserPage = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [formData, setFormData] = useState({
        user_name: '',
        email: '',
        password: '',
        user_avatar: '',
        user_role_id: ''
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
            const response = await addUser(formData, csrfToken);
            if (response.status === 201) {
                toast.success('Thêm học viên mới thành công!');
                navigate('/admin/user');
            } else {
                toast.error('Thêm học viên mới thất bại. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Failed to register:', error);
            toast.error('Đã xảy ra lỗi trong quá trình thêm học viên.');
        }
    };
    
    return (
        <div class="flex items-center justify-center p-2">
            <div class="mx-auto w-full bg-white">
                <div class="px-9 pt-4 font-medium text-xl text-custom-color-blue">Thêm học viên mới</div>
                <form class="py-4 px-9" method="POST">
                    <div class="mb-5">
                        <label
                            for="lesson_name"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Tên học viên
                        </label>
                        <input
                            type="text"
                            name="user_name"
                            id="user_name"
                            placeholder="Tên học viên"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={formData.user_name}
                                onChange={handleChange}
                        />
                    </div>
                    <div class="mb-5">
                     <label
                            for="lesson_name"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={formData.email}
                                onChange={handleChange}
                    />
                    </div>
                    <div class="mb-5">
                        <label
                            for="password"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Password
                        </label>
                        <input
                            type="text"
                            name="password"
                            id="password"
                            placeholder="Password"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={formData.password}
                                onChange={handleChange}/>
                    </div>

                    <div>
                        <button
                            className={`hover:shadow-form w-full rounded-md py-3 px-8 text-center text-base font-semibold text-white outline-none bg-[#6A64F1] hover:bg-[#5C59C2] cursor-pointer`}
                            onClick={handleSubmit}>
                            Thêm học viên mới
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddUserPage;