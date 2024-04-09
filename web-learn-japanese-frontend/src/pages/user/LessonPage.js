import React from 'react';
import RoadmapBasic from '../../assets/image/roadmap/lo_trinh_co_ban.jpg';
import RoadmapBasicN4 from '../../assets/image/roadmap/lo_trinh_N4.jpg';
import RoadmapMiddleN3 from '../../assets/image/roadmap/lo_trinh_N3.jpg';
import { Link } from 'react-router-dom';

const LessonPage = () => {
    return (
        <div className="flex flex-col mx-52 mt-8">
            <h1 className="fontRokkitt text-2xl text-custom-color-blue font-bold">Lộ trình học</h1>
            <div className="grid grid-cols-2 gap-4 py-4">
                <div className="flex border border-gray-300 rounded-2xl p-6">
                    <div className="flex flex-col">
                        <h1 className="fontRokkitt text-xl text-custom-color-blue font-bold mb-2">
                            Lộ trình học cơ bản (JLPT N5)
                        </h1>
                        <span className="text-wrap text-sm mr-6 mb-4">
                            Khóa học dành cho những người mới bắt đầu học tiếng Nhật hoặc những người muốn củng cố kiến thức cơ bản của mình.
                        </span>
                        <Link to={'/lesson-basic-n5'}>
                            <button className="w-1/3 text-sm text-white bg-custom-color-red-gray py-2 rounded-lg font-semibold hover:scale-110 cursor-pointer transition-all">
                                Xem chi tiết
                            </button>
                        </Link>
                    </div>
                    <div>
                        <img src={RoadmapBasic} className="rounded-full border-4 border-[#FFCA40] max-w-[120px] h-[120px]"
                            alt="Roadmap Basic N5" />
                    </div>
                </div>

                <div className="flex border border-gray-300 rounded-2xl p-6">
                    <div className="flex flex-col">
                        <h1 className="fontRokkitt text-xl text-custom-color-blue font-bold mb-2">
                            Lộ trình học cơ bản (JLPT N4)
                        </h1>
                        <span className="text-wrap text-sm mr-6 mb-4">
                            Khóa học tiếng Nhật dành cho những người đã có kiến thức cơ bản và muốn nâng cao trình độ của mình.
                        </span>
                        <Link to={'/lesson-basic-n4'}>
                            <button className="w-1/3 text-sm text-white bg-custom-color-red-gray py-2 rounded-lg font-semibold hover:scale-110 cursor-pointer transition-all">
                                Xem chi tiết
                            </button>
                        </Link>
                    </div>
                    <div>
                        <img src={RoadmapBasicN4} className="rounded-full border-4 border-[#FF7D67] max-w-[120px] h-[120px]"
                            alt="Roadmap Basic N4" />
                    </div>
                </div>

                <div className="flex border border-gray-300 rounded-2xl p-6">
                    <div className="flex flex-col">
                        <h1 className="fontRokkitt text-xl text-custom-color-blue font-bold mb-2">
                            Lộ trình học trung cấp (JLPT N3)
                        </h1>
                        <span className="text-wrap text-sm mr-6 mb-4">
                            Khóa học dành cho những người muốn nâng cao trình độ tiếng Nhật của mình từ mức độ cơ bản lên mức độ trung cấp.
                        </span>
                        <button className="w-1/3 text-sm text-white bg-custom-color-red-gray py-2 rounded-lg font-semibold hover:scale-110 cursor-pointer transition-all">
                            Xem chi tiết
                        </button>
                    </div>
                    <div>
                        <img src={RoadmapMiddleN3} className="rounded-full border-4 border-[#CEE1FF] max-w-[120px] h-[120px]"
                            alt="Roadmap Basic" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LessonPage;