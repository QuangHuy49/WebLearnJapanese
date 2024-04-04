import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VocabularyPage from './VocabularyPage';
import { getLessonByid } from '../../services/LessonServices';
import KaiwaPage from './KaiwaPage';
import GrammarPage from './GrammarPage';

const LessonDetailPage = () => {
    let { id } = useParams();
    const [lesson, setLesson] = useState([]);

    useEffect(() => {
        getLesson();
    }, []);

    const getLesson = async () => {
        const data = await getLessonByid(id);
        if (data) {
            setLesson(data);
        } else {
            setLesson([]);
        }
    }

    return (
        <div className="flex justify-between">
            <div className="p-6 flex flex-col">
                <div className="flex items-center justify-around mt-2">
                    {lesson &&
                        <h1 className="text-2xl text-custom-color-blue fontCoiny">{lesson.lesson_name}</h1>
                    }
                </div>
                <VocabularyPage />
                <KaiwaPage />
                <GrammarPage />
            </div>

            <div>Kiểm tra</div>
        </div>
    );
}

export default LessonDetailPage;