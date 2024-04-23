import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTestDataByIdLesson } from '../../services/TestServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TestLessonPage = () => {
    let { id } = useParams();
    const [tests, setTests] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        // const token = document.querySelector('meta[name="csrf-token"]');
        // if (token) {
        //     setCsrfToken(token.getAttribute('content'));
        // }

        fetchUserData();
    }, [])

    useEffect(() => {
        if (user.user_id) {
            getTestData(user.user_id);
        }
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

    const getTestData = async (user_id) => {
        try {
            const data = await getTestDataByIdLesson(id, user_id);
            if (data) {
                setTests(data.tests);
            } else {
                setTests([]);
            }
        } catch (error) {
            if (error.response && error.response.status === 429) {
                setTimeout(() => getTestData(user_id), 1000);
            }
        }
    };

    return (
        <>
            {tests.length > 0 && (
                <>
                    <div className="pr-[12rem]">
                        <span className="text-2xl text-custom-color-blue fontCoiny flex items-center justify-around">Luyện tập</span>

                        <section class="">
                            <div class="w-full mb-6 overflow-hidden rounded-lg">
                                <div class="w-full overflow-x-auto">
                                    {tests.map((test, index) => {
                                        return (
                                            <div key={index}>
                                                <Link to={`/lesson/question/${test.test_id}`}>
                                                    <div className="flex justify-between m-4 border py-2 px-4 rounded-lg hover:scale-110 cursor-pointer transition-all">
                                                        <div className="mr-8 text-lg font-extralight">
                                                            Bài {index + 1}: {test.test_name}
                                                        </div>
                                                        <div>
                                                            {test.test_user_info.is_complete === 1 ? (
                                                                <FontAwesomeIcon icon={faCheck} />
                                                            ) : (
                                                                <FontAwesomeIcon icon={faArrowRight} />
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>
                </>
            )}
        </>
    );
}

export default TestLessonPage;