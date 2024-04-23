import React from 'react';
import ButtonAdd from '../../../components/button/ButtonAdd';
import { Link } from 'react-router-dom';

const PostPage = () => {
    return (
        <div className="p-4">
            <div className="px-12 flex justify-between text-custom-color-blue items-end pb-2">
                <div className="font-medium text-lg">
                    Danh sách bài viết
                </div>

                <Link to={'/admin/post/add-post'}>
                    <ButtonAdd />
                </Link>
            </div>
        </div>
    );
}

export default PostPage;