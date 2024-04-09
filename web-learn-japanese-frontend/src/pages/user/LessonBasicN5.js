import React, { useEffect, useState } from 'react';
import { addLessonUser, getLessonBasicN5 } from '../../services/LessonServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LessonBasicN5 = () => {
    const [lessonsBasicN5, setLessonsBasicN5] = useState([]);
    const [user, setUser] = useState([]);
    const [csrfToken, setCsrfToken] = useState('');
    const { t } = useTranslation('course', 'lesson_button');

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }

        fetchUserData();
    }, []);

    useEffect(() => {
        getLessonBasicN5(user.user_id).then((data) => {
            if (data) {
                setLessonsBasicN5(data);
            } else {
                setLessonsBasicN5([]);
            }
        });
    }, [user]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/auth/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUser(response.data);

        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    const handleAddLessonUser = async (lesson_id) => {
        const formData = new FormData();
        formData.append('lesson_id', lesson_id);

        try {
            const response = await addLessonUser(formData, user.user_id, csrfToken);
            if (response.status === 200) {
                // navigate('/my-course');
            } else {
                toast.error('Có lỗi! Thử lại dùm mình nhé!');
            }
        } catch (error) {
            console.error('Failed to register:', error);
            toast.error('Oops! Thử lại dùm mình nhé!');
        }
    };

    return (
        <div className="relative flex flex-col overflow-hidden py-6">
            <div className="mx-auto w-[1600px]">
                <div className="mb-6">
                    <h1 className="mb-2 font-bold text-xl text-custom-color-blue">Lộ trình học cơ bản (JLPT N5)</h1>
                    <ul className="list-disc ml-5 text-base font-light">
                        <li>
                            Lộ trình học cơ bản JLPT N5 là một khóa học dành cho những người mới bắt đầu học tiếng Nhật hoặc những người muốn củng cố kiến thức cơ bản của mình.
                        </li>
                        <li>
                            JLPT N5 là cấp độ đầu tiên trong kỳ thi Năng lực Tiếng Nhật (Japanese Language Proficiency Test), được tổ chức bởi Viện Khảo thí Giáo dục Quốc tế (Japan Educational Exchanges and Services).
                        </li>
                        <li>
                            Khóa học này tập trung vào việc phát triển các kỹ năng ngôn ngữ cần thiết để hiểu và sử dụng tiếng Nhật trong các tình huống hàng ngày.
                        </li>
                        <li>
                            Nội dung của lộ trình bao gồm:
                            <ul className="list-decimal ml-5">
                                <li>
                                    Ngữ pháp cơ bản: Học viên sẽ học các cấu trúc ngữ pháp cơ bản, giúp họ hiểu và sử dụng câu trình bày đơn giản, giao tiếp hàng ngày.
                                </li>
                                <li>
                                    Từ vựng: Học viên sẽ học các từ vựng phổ biến và cơ bản, từ các chủ đề như gia đình, công việc, mua sắm, thời tiết, ... 
                                </li>
                                <li>
                                    Đọc hiểu: Luyện tập đọc và hiểu các văn bản đơn giản, bao gồm thông tin về cuộc sống hàng ngày và giao tiếp cơ bản.
                                </li>
                                <li>
                                    Nghe hiểu: Học viên sẽ luyện nghe các đoạn hội thoại và câu chuyện ngắn, từ các tình huống hàng ngày, để cải thiện khả năng hiểu và phản ứng với thông tin nghe được.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* alphabet */}
                <h2 className="mb-2 font-bold text-xl text-custom-color-blue">Bảng chữ cái</h2>
                <div className="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                    {lessonsBasicN5 && lessonsBasicN5.map((item, index) =>
                        parseInt(item.lesson.type_id) === 1 && (
                            <div className="relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-500 max-w-sm" key={index}>
                                {parseInt(user.user_id) === parseInt(item.user_id) ? (
                                    <div className="h-auto overflow-hidden relative group cursor-pointer">
                                        <div className="absolute -bottom-full group-hover:inset-0 w-full h-full group-hover:bg-[#e24943] group-hover:bg-opacity-40 transition-all ease-in-out duration-500">
                                            <div className="w-full h-full p-5 relative">
                                                <div className="absolute bottom-12 group-hover:bottom-16 left-[150px] text-white transition-all ease-in-out duration-500">
                                                    <Link to={`/lesson-detail/${item.lesson.lesson_id}`}>
                                                        <button className="text-sm font-semibold px-4 py-2 bg-blue-500 text-white rounded-lg hover:scale-110 transition-all">
                                                            {t('lesson_button.learn_continue', { ns: 'lesson_button' })}
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-44 overflow-hidden ">
                                            <img src={item.lesson.lesson_img} alt="lesson_img" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-auto overflow-hidden relative group cursor-pointer">
                                        <div className="absolute -bottom-full group-hover:inset-0 w-full h-full group-hover:bg-[#e24943] group-hover:bg-opacity-40 transition-all ease-in-out duration-500">
                                            <div className="w-full h-full p-5 relative">
                                                <div className="absolute bottom-12 group-hover:bottom-16 left-[125px] text-white transition-all ease-in-out duration-500">
                                                    <Link to={`/lesson-detail/${item.lesson.lesson_id}`}>
                                                        <button className="text-sm font-semibold px-4 py-2 bg-blue-500 text-white rounded-lg hover:scale-110 transition-all"
                                                            onClick={() => handleAddLessonUser(item.lesson.lesson_id)}>
                                                            {t('lesson_button.view_detail', { ns: 'lesson_button' })}
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-44 overflow-hidden ">
                                            <img src={item.lesson.lesson_img} alt="lesson_img" />
                                        </div>
                                    </div>
                                )}
                                <div className="bg-white py-4 px-3">
                                    <h3 className="text-base font-medium text-custom-color-blue">{item.lesson.lesson_name}</h3>
                                    <div className="flex items-center">
                                        <p className="text-base text-custom-color-blue">
                                            <FontAwesomeIcon icon={faPeopleGroup} />
                                        </p>
                                        <span className="ml-2">{item.total_users}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>

                {/* minna no nihongo */}
                <h2 className="mb-2 font-bold text-xl text-custom-color-blue">Minna no Nihongo</h2>
                <div className="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {lessonsBasicN5 && lessonsBasicN5.map((item, index) =>
                        parseInt(item.lesson.type_id) === 2 && (
                            <div className="relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-500 max-w-sm" key={index}>
                                {parseInt(user.user_id) === parseInt(item.user_id) ? (
                                    <div className="h-auto overflow-hidden relative group cursor-pointer">
                                        <div className="absolute -bottom-full group-hover:inset-0 w-full h-full group-hover:bg-[#e24943] group-hover:bg-opacity-40 transition-all ease-in-out duration-500">
                                            <div className="w-full h-full p-5 relative">
                                                <div className="absolute bottom-12 group-hover:bottom-16 left-[150px] text-white transition-all ease-in-out duration-500">
                                                    <Link to={`/lesson-detail/${item.lesson.lesson_id}`}>
                                                        <button className="text-sm font-semibold px-4 py-2 bg-blue-500 text-white rounded-lg hover:scale-110 transition-all">
                                                            {t('lesson_button.learn_continue', { ns: 'lesson_button' })}
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-44 overflow-hidden ">
                                            <img src={item.lesson.lesson_img} alt="lesson_img" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-auto overflow-hidden relative group cursor-pointer">
                                        <div className="absolute -bottom-full group-hover:inset-0 w-full h-full group-hover:bg-[#e24943] group-hover:bg-opacity-40 transition-all ease-in-out duration-500">
                                            <div className="w-full h-full p-5 relative">
                                                <div className="absolute bottom-12 group-hover:bottom-16 left-[125px] text-white transition-all ease-in-out duration-500">
                                                    <Link to={`/lesson-detail/${item.lesson.lesson_id}`}>
                                                        <button className="text-sm font-semibold px-4 py-2 bg-blue-500 text-white rounded-lg hover:scale-110 transition-all"
                                                            onClick={() => handleAddLessonUser(item.lesson.lesson_id)}>
                                                            {t('lesson_button.view_detail', { ns: 'lesson_button' })}
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-44 overflow-hidden ">
                                            <img src={item.lesson.lesson_img} alt="lesson_img" />
                                        </div>
                                    </div>
                                )}
                                <div className="bg-white py-4 px-3">
                                    <h3 className="text-base font-medium text-custom-color-blue">{item.lesson.lesson_name}</h3>
                                    <div className="flex items-center">
                                        <p className="text-base text-custom-color-blue">
                                            <FontAwesomeIcon icon={faPeopleGroup} />
                                        </p>
                                        <span className="ml-2">{item.total_users}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default LessonBasicN5;