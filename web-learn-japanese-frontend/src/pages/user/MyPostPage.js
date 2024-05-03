import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faComment as farComment } from '@fortawesome/free-regular-svg-icons';
import { faClock as farClock } from '@fortawesome/free-regular-svg-icons';
import oops_cat from '../../assets/image/oops_cat.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getMyPostByIdUser } from '../../services/PostServices';
import moment from 'moment';

const MyPostPage = () => {
    const [user, setUser] = useState([]);
    const [myPost, setMyPost] = useState([]);

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        getMyPostByIdUser(user.user_id).then((data) => {
            if (data) {
                setMyPost(data);
            } else {
                setMyPost([]);
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
                <h2 className="mb-2 font-bold text-xl text-custom-color-blue">Bài viết của tôi</h2>
                {myPost.posts && myPost.posts.length > 0 ? (
                    <div class='grid grid-cols-2 gap-2 w-full'>
                        {myPost.posts.map((item, index) => (
                            <>
                                <div class="pr-6 items-center justify-center rounded-xl group sm:flex space-x-2 bg-white border hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer" key={index}>
                                    <img class="mx-auto block w-4/12 h-40 rounded-lg object-cover" alt="post_img" loading="lazy" src={item.post_img} />
                                    <div class="sm:w-8/12 pl-4">
                                        <div class="space-y-2">
                                            <div class="space-y-4">
                                                <Link to={`/post/detail-post/${item.post_id}`}>
                                                    <h4 class="text-md font-semibold text-justify truncate mb-4 text-custom-color-blue">
                                                        {item.post_title}
                                                    </h4>
                                                </Link>
                                            </div>
                                            <div class="flex items-center space-x-4 justify-between">
                                                <div class="flex gap-3 space-y-1">
                                                    <img src={item.user.user_avatar} alt="user_avatar" class="rounded-full h-8 w-8" />
                                                    <span class="text-sm">{item.user.user_name}</span>
                                                </div>
                                                <div class="flex items-center space-x-4 justify-between">
                                                    <div class="text-grey-500 flex flex-row space-x-1 mt-4">
                                                        <FontAwesomeIcon icon={farClock} />
                                                        <p class="text-xs">{moment(item.created_at).format('MMMM DD, YYYY')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="pt-2 rounded-lg flex space-x-3 flex-row">
                                                <div class="cursor-pointer text-center text-md justify-center items-center flex">
                                                    <FontAwesomeIcon icon={farHeart} />
                                                    <span class="text-md mx-1">{item.total_likes}</span>
                                                </div>
                                                <div class="cursor-pointer text-center text-md justify-center items-center flex">
                                                    <FontAwesomeIcon icon={farComment} />
                                                    <span class="text-md mx-1">{item.total_comments}</span>
                                                </div>
                                                <div class="text-center text-md justify-center items-center flex">
                                                    <FontAwesomeIcon icon={faEye} />
                                                    <span class="text-md mx-1">{item.total_views}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                        <Link to={'/post/add-post'}>
                            <div class="h-[162px] pr-6 items-center justify-center rounded-xl group sm:flex space-x-2 bg-white border-dashed border-2 transition-all cursor-pointer hover:border-gray-400">
                                <div className="flex items-center justify-center text-custom-color-blue">
                                    <FontAwesomeIcon icon={faPlus} className="text-xl mr-2" />
                                    <span>Thêm bài viết</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ) : (
                    <div className="flex justify-between px-[12rem] py-20">
                        <div className="flex flex-col items-center text-custom-color-blue">
                            <h1 className="fontCoiny text-[150px] text-custom-color-red-gray">Oops!</h1>
                            <span className="text-3xl font-semibold mb-2">Bạn chưa đăng bài viết nào cả</span>
                            <span className="text-xl mb-5">Thêm bài viết tại nút bên dưới nè</span>
                            <FontAwesomeIcon icon={faArrowDown} className="mb-2 text-xl" />
                            <Link to={'/post/add-post'}>
                                <button className="px-4 py-2 text-lg text-white hover:scale-110 transition-all duration-150 bg-custom-color-blue rounded-lg shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none">
                                    Đăng bài viết
                                </button>
                            </Link>
                        </div>
                        <div>
                            <img src={oops_cat} className="w-[50vh] h-[50vh]" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyPostPage;