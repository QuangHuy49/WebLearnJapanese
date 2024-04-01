import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';

const DetailLessonLayout = () => {
    let { id } = useParams();
    return (
        <div className="">
            <div className="flex px-16 pt-6">
                <Link to={`/admin/lesson/detail-lesson/${id}`}>
                    <button className="bg-custom-color-blue text-white p-2 px-6 mx-2 rounded-lg font-semibold hover:scale-110 transition-all hover:rounded-md">
                        Từ vựng
                    </button>
                </Link>
                
                <Link to={`/admin/lesson/detail-lesson/${id}/kaiwa`}>
                    <button className="bg-custom-color-blue text-white p-2 px-6 mx-2 rounded-lg font-semibold hover:scale-110 transition-all hover:rounded-md">
                        Kaiwa
                    </button>
                </Link>
                
                <Link to={`/admin/lesson/detail-lesson/${id}/grammar`}>
                    <button className="bg-custom-color-blue text-white p-2 px-6 mx-2 rounded-lg font-semibold hover:scale-110 transition-all hover:rounded-md">
                        Ngữ pháp
                    </button>
                </Link>
                
            </div>
            <Outlet />
        </div>
    );
}

export default DetailLessonLayout;