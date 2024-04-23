import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../services/PostServices';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faComment as farComment } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { viewPost } from '../../services/ViewServices';
import { getCommentById } from '../../services/CommentServices';

const PostDetailPage = () => {
    let { id } = useParams();
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const [csrfToken, setCsrfToken] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }

        handleViewPost();
        handleGetPost();
        fetchUserData();
        handleGetCommentById();
    }, []);

    useEffect(() => {
        if (user !== null) {
            handleViewPost();
        }
    }, [user]);

    const handleGetPost = async () => {
        const data = await getPostById(id);
        if (data) {
            setPost(data);
        } else {
            setPost([]);
        }
    }

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

    const handleViewPost = async (e) => {
        if (e) {
            e.preventDefault();
        }
        try {
            await viewPost({ post_id: id, user_id: user.user_id }, csrfToken);
        } catch (error) {
            console.error('Failed to view post:', error);
        }
    };

    const handleGetCommentById = async () => {
        const data = await getCommentById(id);
        if (data) {
            setComments(data);
        } else {
            setComments([]);
        }
    };

    return (
        <>
            {post && post.user && post.user.user_avatar &&
                <div class="h-full w-full flex items-center justify-center">
                    <div class="border max-w-screen-md bg-white mt-6 rounded-2xl p-4">
                        <div class="flex items-center justify-between">
                            <div class="gap-3.5	flex items-center ">
                                <img src={post.user.user_avatar} class="object-cover rounded-full w-10 h-10" />
                                <div class="flex flex-col">
                                    <b class="capitalize">{post.user.user_name}</b>
                                    <time datetime="06-08-21" class="text-gray-400 text-xs">
                                        {moment(post.created_at).format('MMMM DD, YYYY')}
                                    </time>
                                </div>
                            </div>
                            <div class="bg-gray-100	rounded-full h-3.5 flex	items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="34px" fill="#92929D">
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path
                                        d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                </svg>
                            </div>
                        </div>
                        <div class="whitespace-pre-wrap mt-7" dangerouslySetInnerHTML={{ __html: post.post_content }}>

                        </div>
                        <div class="mt-5 flex gap-2	justify-center border-b pb-4 flex-wrap">
                            <img src={post.post_img} class="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto" alt="photo" />
                        </div>
                        <div class="h-12 border-b flex items-center justify-around">
                            <div class="flex items-center gap-3">
                                <FontAwesomeIcon icon={farHeart} />
                                <div class="text-sm">{post.total_likes}</div>
                            </div>
                            <div class="flex items-center gap-3">
                                <FontAwesomeIcon icon={farComment} />
                                <div class="text-sm">{post.total_comments}</div>
                            </div>
                            <div class="flex items-center gap-3">
                                <FontAwesomeIcon icon={faEye} />
                                <div class="text-sm">{post.total_views}</div>
                            </div>
                        </div>

                        <div className="mx-4">
                        <div class="flex items-center justify-between mt-4">
                            <img src={user.user_avatar} class="rounded-full w-10 h-10 object-cover border" />
                            <div class="flex items-center justify-between bg-gray-50 h-11 w-11/12 border rounded-2xl overflow-hidden px-4">
                                <input type="text" class="h-full w-full bg-gray-50 outline-none " placeholder="Write your comment..." name="comment" />
                            </div>
                        </div>

                        <div class="flex flex-col justify-between mt-4">
                            {comments && comments.map((item, index) => (
                                <div class="flex flex-col space-y-2 py-2" key={index}>
                                    <div class="flex items-center space-x-2">
                                        <div class="flex flex-shrink-0 cursor-pointer self-start">
                                            <img src={item.user.user_avatar} alt="" class="h-10 w-10 rounded-full object-fill" />
                                        </div>

                                        <div class="flex items-center justify-center space-x-2">
                                            <div class="block">
                                                <div class="w-auto rounded-xl px-2 pb-2">
                                                    <div class="font-medium">
                                                        <a href="#" class="text-sm hover:underline">
                                                            <p>{item.user.user_name}</p>
                                                        </a>
                                                    </div>
                                                    <div class="text-sm">
                                                        {item.comment_content}
                                                    </div>
                                                </div>
                                                <div class="flex w-full items-center justify-start text-xs">
                                                    <div class="flex items-center justify-center space-x-1 px-2 font-semibold text-gray-700">
                                                        <a href="#" class="hover:underline">
                                                            <span>Thích</span>
                                                        </a>
                                                        <span class="self-center">.</span>
                                                        <a href="#" class="hover:underline">
                                                            <span>Trả lời</span>
                                                        </a>
                                                        <span class="self-center">.</span>
                                                        <a href="#" class="hover:underline">
                                                            <span>{moment(item.created_at).format('MMMM DD, YYYY')}</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div class="translate flex -translate-y-2 transform items-center justify-center self-stretch opacity-0 transition-opacity duration-200 hover:opacity-100">
                                            <a href="#" class="">
                                                <div class="flex h-6 w-6 transform cursor-pointer items-center justify-center rounded-full text-xs transition-colors duration-200 hover:bg-gray-100">
                                                    <svg class="h-6 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                                                </div>
                                            </a>
                                        </div> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                        
                    </div>
                </div>}
        </>
    );
}

export default PostDetailPage;