import React, { useEffect, useState } from 'react';
import { addLessonUser, getLessonBasicN4 } from '../../services/LessonServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { addTestUser } from '../../services/TestServices';

const LessonBasicN4 = () => {
    const [lessonsBasicN4, setLessonsBasicN4] = useState([]);
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
        getLessonBasicN4(user.user_id).then((data) => {
            if (data) {
                setLessonsBasicN4(data);
            } else {
                setLessonsBasicN4([]);
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
            const response_lesson = await addLessonUser(formData, user.user_id, csrfToken);
            const response_test = await addTestUser(formData, user.user_id, lesson_id, csrfToken);
            if (response_lesson.status === 200 && response_test.status === 200) {
                // navigate('/my-course');
            } else {
                toast.error('Có lỗi! Thử lại dùm mình nhé!');
            }
        } catch (error) {
            console.error('Failed to register:', error);
            if (error.response && error.response.status === 429) {
                setTimeout(() => handleAddLessonUser(lesson_id), 1000);
            } else {
                toast.error('Oops! Thử lại dùm mình nhé!');
            }
        }
    };

    return (
        <div className="relative flex flex-col overflow-hidden py-6">
            <div className="mx-auto w-[1600px]">
                <div className="mb-6">
                    <h1 className="mb-2 font-bold text-xl text-custom-color-blue">Lộ trình học cơ bản (JLPT N4)</h1>
                    <ul className="list-disc ml-5 text-base font-light">
                        <li>
                            Lộ trình học cơ bản JLPT N4 là một khóa học tiếng Nhật dành cho những người đã có kiến thức cơ bản và muốn nâng cao trình độ của mình. 
                        </li>
                        <li>
                            JLPT N4 là một trong các cấp độ của kỳ thi Năng lực Tiếng Nhật (Japanese Language Proficiency Test), tổ chức bởi Viện Khảo thí Giáo dục Quốc tế (Japan Educational Exchanges and Services).
                        </li>
                        <li>
                            Khóa học này tập trung vào việc phát triển kỹ năng giao tiếp và hiểu biết sâu hơn về ngôn ngữ tiếng Nhật.
                        </li>
                        <li>
                            Nội dung của lộ trình bao gồm:
                            <ul className="list-decimal ml-5">
                                <li>
                                    Ngữ pháp: Học viên sẽ học các cấu trúc ngữ pháp phức tạp hơn so với JLPT N5, giúp họ hiểu và sử dụng câu trình bày linh hoạt hơn trong giao tiếp và viết.
                                </li>
                                <li>
                                    Từ vựng: Học viên sẽ mở rộng vốn từ vựng của mình, bao gồm các từ vựng phổ biến từ nhiều lĩnh vực khác nhau như công việc, du lịch, ...
                                </li>
                                <li>
                                    Đọc hiểu: Luyện tập đọc và hiểu các văn bản phức tạp hơn, bao gồm tin tức, đoạn văn, và câu chuyện ngắn với ngữ cảnh đa dạng.
                                </li>
                                <li>
                                    Nghe hiểu: Học viên sẽ luyện nghe các đoạn hội thoại và bài nói phức tạp hơn, từ đó cải thiện khả năng hiểu và phản ứng với thông tin nghe được.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* minna no nihongo */}
                <h2 className="mb-2 font-bold text-xl text-custom-color-blue">Minna no Nihongo</h2>
                <div className="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {lessonsBasicN4 && lessonsBasicN4.map((item, index) =>
                        parseInt(item.lesson.type_id) === 4 && (
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

export default LessonBasicN4;