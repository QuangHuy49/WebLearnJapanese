import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faComment as farComment } from '@fortawesome/free-regular-svg-icons';
import { faClock as farClock } from '@fortawesome/free-regular-svg-icons';
import { getLatestPost } from '../../services/PostServices';
import moment from 'moment';
import axios from "axios";
import { likePost } from '../../services/LikeServices';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PostPage = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [latestPost, setLatestPost] = useState([]);
    const [user, setUser] = useState([]);
    const [likedPosts, setLikedPosts] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }

        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/auth/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUser(response.data);
        } catch (error) {
            setLikedPosts({});
            console.error('Failed to fetch user data:', error);
        }
    };

    useEffect(() => {
        getLatestPost().then((data) => {
            if (data) {
                setLatestPost(data);
                const likedPosts = {};
                data.posts.forEach((post) => {
                    const postLikes = post.likes.reduce((acc, curr) => {
                        acc[curr.post_id] = curr.user_id;
                        return acc;
                    }, {});
                    Object.assign(likedPosts, postLikes);
                });
                setLikedPosts(likedPosts);
            } else {
                setLatestPost([]);
            }
        });
    }, []);

    const handleLikePost = async (e, id) => {
        e.preventDefault();
        if (!user.user_id) {
            navigate('/login');
        }

        try {
            await likePost({ post_id: id, user_id: user.user_id }, csrfToken);
            setLatestPost(prevLatestPost => {
                const updatedPosts = prevLatestPost.posts.map(post => {
                    if (post.post_id === id) {
                        return { ...post, total_likes: post.total_likes + 1 };
                    }
                    return post;
                });
                return { ...prevLatestPost, posts: updatedPosts };
            });

            setLikedPosts(prevLikedPosts => ({ ...prevLikedPosts, [id]: user.user_id }));
        } catch (error) {
            console.error('Failed to like post:', error);
        }
    }

    return (
        <div className="relative flex flex-col overflow-hidden py-6 sm:py-12">
            <div className="mx-auto w-[1600px]">
                <h2 className="mb-2 font-bold text-xl text-custom-color-blue">Bài viết mới nhất</h2>
                {latestPost.posts && latestPost.posts.length > 0 && (
                    <div class='grid grid-cols-2 gap-2 w-full'>
                        {latestPost.posts.map((item, index) => (
                            <>
                                <Link to={`/post/detail-post/${item.post_id}`}>
                                    <div class="pr-6 items-center justify-center rounded-xl group sm:flex space-x-2 bg-white border hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer" key={index}>
                                        <img class="mx-auto block w-4/12 h-40 rounded-lg object-cover" alt="post_img" loading="lazy" src={item.post_img} />
                                        <div class="sm:w-8/12 pl-4">
                                            <div class="space-y-2">
                                                <div class="space-y-4">
                                                    <h4 class="text-md font-semibold text-justify truncate mb-4 text-custom-color-blue">
                                                        {item.post_title}
                                                    </h4>
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
                                                    <div class="cursor-pointer text-center text-md justify-center items-center flex"
                                                        onClick={(e) => handleLikePost(e, item.post_id)}>
                                                        {likedPosts[item.post_id] ? (
                                                            <FontAwesomeIcon icon={faHeart} className="text-custom-color-red-gray cursor-pointer hover:scale-110 transition-all" />
                                                        ) : (
                                                            <FontAwesomeIcon icon={farHeart} className="cursor-pointer hover:scale-110 transition-all" />
                                                        )}
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
                                </Link>
                            </>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostPage;