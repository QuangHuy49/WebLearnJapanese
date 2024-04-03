import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link, useParams, useLocation } from 'react-router-dom';

const DetailLessonLayout = () => {
    let { id } = useParams();
    const [active, setActive] = useState(1);
    const location = useLocation().pathname;

    useEffect(() => {
        if (location.includes(`/${id}/kaiwa`)) {
            setActive(2)
        }

        if (location.includes(`/${id}/grammar`)) {
            setActive(3)
        }
    }, []);

    return (
        <div className="">
            <ul className="flex px-16 pt-6">
                <li className={active === 1 ? "bg-custom-color-blue text-white rounded-lg mx-2 font-semibold hover:scale-110 transition-all hover:rounded-md" : "bg-white text-custom-color-blue mx-2 rounded-lg font-semibold hover:scale-110 transition-all hover:rounded-md"}>
                    <Link to={`/admin/lesson/detail-lesson/${id}`} onClick={() => setActive(1)}>
                        <button className={active === 1 ? "bg-custom-color-blue text-white p-2 px-6 mx-2 rounded-lg font-semibold hover:scale-110 transition-all hover:rounded-md" : "bg-white text-custom-color-blue p-2 px-6 mx-2 rounded-lg font-semibold hover:scale-110 transition-all hover:rounded-md"}>
                            Từ vựng
                        </button>
                    </Link>
                </li>

                <li className={active === 2 ? "bg-custom-color-blue text-white rounded-lg mx-2 font-semibold hover:scale-110 transition-all hover:rounded-md" : "bg-white text-custom-color-blue mx-2 rounded-lg font-semibold hover:scale-110 transition-all hover:rounded-md"}>
                    <Link to={`/admin/lesson/detail-lesson/${id}/kaiwa`} onClick={() => setActive(2)}>
                        <button className={active === 2 ? "bg-custom-color-blue text-white p-2 px-6 mx-2 rounded-lg font-semibold hover:scale-110 transition-all hover:rounded-md" : "bg-white text-custom-color-blue p-2 px-6 mx-2 rounded-lg font-semibold hover:scale-110 transition-all hover:rounded-md"}>
                            Kaiwa
                        </button>
                    </Link>
                </li>
                
                <li className={active === 3 ? "bg-custom-color-blue text-white rounded-lg mx-2 font-semibold hover:scale-110 transition-all hover:rounded-md" : "bg-white text-custom-color-blue mx-2 rounded-lg font-semibold hover:scale-110 transition-all hover:rounded-md"}>
                    <Link to={`/admin/lesson/detail-lesson/${id}/grammar`} onClick={() => setActive(3)}>
                        <button className={active === 3 ? "bg-custom-color-blue p-2 px-6 mx-2 text-white rounded-lg font-semibold hover:scale-110 transition-all hover:rounded-md" : "bg-white text-custom-color-blue p-2 px-6 mx-2 rounded-lg font-semibold hover:scale-110 transition-all hover:rounded-md"}>
                            Ngữ pháp
                        </button>
                    </Link>
                </li>
            </ul>
            <Outlet />
        </div>
    );
}

export default DetailLessonLayout;