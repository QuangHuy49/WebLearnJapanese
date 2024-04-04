import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTypeByid, updateType } from '../../../services/TypeServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EditTypePage = () => {
    let { id } = useParams();
    id = id ?? 0;
    const initState = {
        type_name: '',
        type_status: ''
    }, [type, setType] = useState(initState);
    const statusOptions = [
        { value: 1, label: 'Xuất bản' },
        { value: 0, label: 'Chưa xuất bản' }
    ];
   
    const [csrfToken, setCsrfToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }

        getType();
    }, []);

    const getType= async () => {
        const data = await getTypeByid(id);
        if (data) {
            setType(data);
        } else {
            setType([]);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setType({ ...type, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateType(id, type, csrfToken);
            if (response.status === 201) {
                toast.success('Cập nhật thể loại thành công!');
                navigate('/admin/type');
            } else {
                toast.error('Cập nhật thể loại thất bại. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Failed to register:', error);
            toast.error('Đã xảy ra lỗi trong quá trình cập nhật thể loại.');
        }
    };

    return (
        <div class="flex items-center justify-center p-2">
            <div class="mx-auto w-full bg-white">
                <div class="px-9 pt-4 font-medium text-xl text-custom-color-blue">Cập nhật thể loại</div>
                <form class="py-4 px-9" method="POST">
                    <div class="mb-5">
                        <label
                            for="type_name"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Tên thể loại
                        </label>
                        <input
                            type="text"
                            name="type_name"
                            id="type_name"
                            placeholder="Tên thể loại"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-custom-color-blue outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={type.type_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div class="mb-5">
                        <label
                            for="type_status"
                            class="mb-2 block text-base font-medium text-custom-color-blue">
                            Trạng thái
                        </label>
                        <select
                            name="type_status"
                            id="type_status"
                            value={type.type_status}
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
                            Cập nhật thể loại
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTypePage;