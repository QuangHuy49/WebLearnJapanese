import React, { useEffect, useState } from 'react';
import { getLessonsByIdUser } from '../../services/LessonServices';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import oops_cat from '../../assets/image/oops_cat.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MyCoursePage = () => {
    const [user, setUser] = useState([]);
    const [lessonsUser, setLessonsUser] = useState([]);
    const { t } = useTranslation('course', 'lesson_button', 'my_course', 'button');

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        getLessonsByIdUser(user.user_id).then((data) => {
            if (data) {
                setLessonsUser(data);
            } else {
                setLessonsUser([]);
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

    return (
        <div className="relative flex flex-col overflow-hidden py-6 sm:py-12">
            <div className="mx-auto w-[1600px]">
                <h2 className="mb-2 font-bold text-xl text-custom-color-blue">{t('course.my_course')}</h2>
                {lessonsUser.length > 0 ? (
                    <div className="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {lessonsUser.map((item, index) => (
                            <div className="relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-500 max-w-sm" key={index}>
                                <div className="h-auto overflow-hidden relative group cursor-pointer">
                                    <div className="absolute -bottom-full group-hover:inset-0 w-full h-full group-hover:bg-[#e24943] group-hover:bg-opacity-40 transition-all ease-in-out duration-500">
                                        <div className="w-full h-full p-5 relative">
                                            <div className="absolute bottom-12 group-hover:bottom-16 left-[150px] text-white transition-all ease-in-out duration-500">
                                                <Link to={`/lesson-detail/${item.lesson.lesson_id}`}>
                                                    <button className="text-sm font-semibold px-4 py-2 bg-blue-500 text-white rounded-lg">
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
                ) : (
                    <>
                        <div className="flex justify-between px-[12rem] py-20">
                            <div className="flex flex-col items-center text-custom-color-blue">
                                <h1 className="fontCoiny text-[150px] text-custom-color-red-gray">Oops!</h1>
                                <span className="text-3xl font-semibold mb-2">{t('my_course.text', { ns: 'my_course' })}</span>
                                <span className="text-xl mb-5">{t('my_course.sub_test', { ns: 'my_course' })}</span>
                                <FontAwesomeIcon icon={faArrowDown} className="mb-2 text-xl" />
                                <Link to={'/'}>
                                    <button className="px-4 py-2 text-xl text-white hover:scale-110 transition-all duration-150 bg-custom-color-blue rounded-lg shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none">
                                        {t('button.register', { ns: 'button' })}
                                    </button>
                                </Link>
                            </div>
                            <div>
                                <img src={oops_cat} className="w-[50vh] h-[50vh]" />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>

    );
}

export default MyCoursePage;