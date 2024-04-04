import React, { useEffect, useState } from 'react';
import { deleteType,getType } from '../../../services/TypeServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faEye, faFileContract, faFile } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import ButtonAdd from '../../../components/button/ButtonAdd';
import { CSSTransition } from 'react-transition-group';
import '../../../styles/global.css';
import { toast } from 'react-toastify';

const TypePage = () => {
    const navigate = useNavigate();
    const [csrfToken, setCsrfToken] = useState('');
    const [type, setType] = useState([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); 
    const [typeIdToDelete, setTypeIdToDelete] = useState(null);
    useEffect(() => {
        loadType();
    }, []);

    const handleAddType = () => {
        navigate('/admin/type/add-type');
    };
    
    const loadType = async () => {
        try {
            const data = await getType(); 
            if (data) {
                setType(data); 
            }
        } catch (error) {
            console.error('Failed to load types:', error);
        }
    };

    const handleDeleteType = async (id) => {
        setTypeIdToDelete(id);
        setShowConfirmationModal(true);
    };

    const confirmDeleteType= async () => {
        const response = await deleteType(typeIdToDelete, csrfToken);
        if (response === 200) {
            toast.success('Xóa thể loại thành công!');
            navigate('/admin/type');
            window.location.reload();
        } else {
            toast.error('Xóa học viên thất bại. Vui lòng thử lại!');
        }
        setShowConfirmationModal(false);
    };

    const cancelDeleteType = () => {
        setShowConfirmationModal(false);
    };
    return (
        <div className="p-4">
            <div className="px-4 flex justify-between text-custom-color-blue items-end pb-2">
                <div className="font-medium text-lg">
                    Danh sách thể loại bài học
                </div>

                <div className="" onClick={handleAddType}>
                    <ButtonAdd />
                </div>
            </div>

            <section className="container px-4 mx-auto">
                <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-custom-color-blue">
                                        <tr>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                STT
                                            </th>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white">
                                                <div className="flex items-center gap-x-3">
                                                    <span>Tên thể loại</span>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                Trạng thái
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                Thao tác
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {type && type.map((item, index) => (
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    <div className="flex items-center text-center ml-2">
                                                        <span>{index + 1}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.type_name}</td>
                                                {item.type_status === 1 ? (
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                            <h2 className="text-sm font-normal">Xuất bản</h2>
                                                        </div>
                                                    </td>
                                                ) : (
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                        <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>

                                                            <h2 className="text-sm font-normal">Chưa xuất bản</h2>
                                                        </div>
                                                    </td>
                                                )}
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center gap-x-6">
                                                        <Link to={`/admin/type/edit-type/${item.type_id}`}>
                                                            <FontAwesomeIcon icon={faPenToSquare} className="text-lg cursor-pointer hover:scale-125 transition-all text-custom-color-blue" />
                                                        </Link>
                                                        <FontAwesomeIcon icon={faTrash} className="text-lg cursor-pointer hover:scale-125 transition-all text-custom-color-red-gray"
                                                           onClick={() => handleDeleteType(item.type_id)}  />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {showConfirmationModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 max-w-md">
                        <p className="text-lg">Bạn có chắc chắn muốn xóa thể loại này?</p>
                        <div className="flex justify-end mt-9">
                            <button onClick={cancelDeleteType} className="bg-gray-300 hover:bg-gray-400 hover:scale-110 transition-all text-gray-800 font-bold py-2 px-4 mr-2 rounded">Hủy</button>
                            <button onClick={confirmDeleteType} className="bg-custom-color-red-gray hover:bg-red-600 hover:scale-110 transition-all text-white font-bold py-2 px-4 rounded">Xác nhận</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TypePage;
