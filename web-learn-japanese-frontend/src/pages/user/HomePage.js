import React, { useEffect, useState } from 'react';
import { addLessonUser, getLatestLesson } from '../../services/LessonServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [lastestLessons, setLastestLessons] = useState([]);
    const [user, setUser] = useState([]);
    const [csrfToken, setCsrfToken] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }

        fetchUserData();
    }, []);
    
    useEffect(() => {
        getLatestLesson(user.user_id).then((data) => {
            if (data) {
                setLastestLessons(data);
            } else {
                setLastestLessons([]);
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
        <div className="relative flex flex-col overflow-hidden py-6 sm:py-12">
            <div className="mx-auto w-[1600px]">
                <h2 className="mb-2 font-bold text-xl text-custom-color-blue">Các khóa học mới</h2>
                <div className="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {lastestLessons && lastestLessons.map((item, index) => (
                        <div className="relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-500 max-w-sm" key={index}>
                            {parseInt(user.user_id) === parseInt(item.user_id) ? (
                                <div className="h-auto overflow-hidden relative group cursor-pointer">
                                    <div className="absolute -bottom-full group-hover:inset-0 w-full h-full group-hover:bg-[#e24943] group-hover:bg-opacity-40 transition-all ease-in-out duration-500">
                                        <div className="w-full h-full p-5 relative">
                                            <div className="absolute bottom-12 group-hover:bottom-16 left-[150px] text-white transition-all ease-in-out duration-500">
                                                <Link to={`/lesson-detail/${item.lesson.lesson_id}`}>
                                                    <button className="text-sm font-semibold px-4 py-2 bg-blue-500 text-white rounded-lg hover:scale-110 transition-all">
                                                        Học tiếp
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
                                                    Xem chi tiết
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
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;