import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VocabularyPage from './VocabularyPage';
import { getLessonByid } from '../../services/LessonServices';
import KaiwaPage from './KaiwaPage';
import GrammarPage from './GrammarPage';
import { getDakutenAndHandakutenHiraganaJapaneseDataByIdLesson, getDakutenAndHandakutenKatakanaJapaneseDataByIdLesson, getHiraganaJapaneseDataByIdLesson, getKatakanaJapaneseDataByIdLesson, getYoonHiraganaJapaneseDataByIdLesson, getYoonKatakanaJapaneseDataByIdLesson } from '../../services/JapaneseAlphabet';

const LessonDetailPage = () => {
    let { id } = useParams();
    const [lesson, setLesson] = useState([]);
    const [hiraganaAlphabet, setHiraganaAlphabet] = useState([]);
    const [dakutenHadakutenHiraganaAlphabet, setDakutenHadakutenHiraganaAlphabet] = useState([]);
    const [yoonHiraganaAlphabet, setYoonHiraganaAlphabet] = useState([]);
    const [katakanaAlphabet, setKatakanaAlphabet] = useState([]);
    const [dakutenHadakutenKatakanaAlphabet, setDakutenHadakutenKatakanaAlphabet] = useState([]);
    const [yoonKatakanaAlphabet, setYoonKatakanaAlphabet] = useState([]);

    console.log(dakutenHadakutenHiraganaAlphabet)

    useEffect(() => {
        getLesson();
    }, []);

    useEffect(() => {
        getLesson();

        if (lesson.lesson_id === 1) {
            getHiraganaAlphabetData();
            getDakutenAndHandakutenHiraganaAlphabetData();
            getYoonHiraganaAlphabetData();
        }

        else if (lesson.lesson_id === 2) {
            getKatakanaAlphabetData();
            getDakutenAndHandakutenKatakanaAlphabetData();
            getYoonKatakanaAlphabetData();
        }

    }, [lesson.lesson_id]);

    const getLesson = async () => {
        const data = await getLessonByid(id);
        if (data) {
            setLesson(data);
        } else {
            setLesson([]);
        }
    };

    const getHiraganaAlphabetData = async () => {
        const data = await getHiraganaJapaneseDataByIdLesson(id);
        if (data) {
            setHiraganaAlphabet(data.hiraganaAlphabets);
        } else {
            setHiraganaAlphabet([]);
        }
    };

    const playAudio = (audioUrl) => {
        const audio = new Audio(audioUrl);
        audio.play()
            .catch(error => {
                console.error('Failed to play audio:', error);
            });
    };

    const getDakutenAndHandakutenHiraganaAlphabetData = async () => {
        const data = await getDakutenAndHandakutenHiraganaJapaneseDataByIdLesson(id);
        if (data) {
            setDakutenHadakutenHiraganaAlphabet(data.hiraganaAlphabets);
        } else {
            setDakutenHadakutenHiraganaAlphabet([]);
        }
    };

    const getYoonHiraganaAlphabetData = async () => {
        const data = await getYoonHiraganaJapaneseDataByIdLesson(id);
        if (data) {
            setYoonHiraganaAlphabet(data.hiraganaAlphabets);
        } else {
            setYoonHiraganaAlphabet([]);
        }
    };

    const getKatakanaAlphabetData = async () => {
        const data = await getKatakanaJapaneseDataByIdLesson(id);
        if (data) {
            setKatakanaAlphabet(data.katakanaAlphabets);
        } else {
            setKatakanaAlphabet([]);
        }
    };

    const getDakutenAndHandakutenKatakanaAlphabetData = async () => {
        const data = await getDakutenAndHandakutenKatakanaJapaneseDataByIdLesson(id);
        if (data) {
            setDakutenHadakutenKatakanaAlphabet(data.katakanaAlphabets);
        } else {
            setDakutenHadakutenKatakanaAlphabet([]);
        }
    };

    const getYoonKatakanaAlphabetData = async () => {
        const data = await getYoonKatakanaJapaneseDataByIdLesson(id);
        if (data) {
            setYoonKatakanaAlphabet(data.katakanaAlphabets);
        } else {
            setYoonKatakanaAlphabet([]);
        }
    };

    return (
        <div className="flex justify-between">
            <div className="p-6 flex flex-col">
                <div className="flex items-center justify-around mt-2">
                    {lesson &&
                        <h1 className="text-2xl text-custom-color-blue fontCoiny">{lesson.lesson_name}</h1>
                    }
                </div>
                {hiraganaAlphabet.length > 0 || katakanaAlphabet.length > 0 ? (
                    <>
                        <div className="grid grid-cols-5 gap-4 py-5">
                            {hiraganaAlphabet.map((alphabet, index) => (
                                <div key={index} className={alphabet.alphabet_character !== '' ? "relative overflow-hidden px-6 py-1 w-full border border-gray-300 rounded-xl shadow-md hover:scale-110 cursor-pointer transition-all" : "relative overflow-hidden px-6 py-1 w-full border-gray-300 rounded-xl shadow-md"}
                                    onClick={() => playAudio(alphabet.alphabet_audio)}>
                                    {alphabet.alphabet_character !== '' ? (
                                        <div className="flex flex-col items-center justify-items-center">
                                            <span className="fontJP text-xl">
                                                {alphabet.alphabet_character}
                                            </span>
                                            <span className="fontRokkitt text-base">
                                                {alphabet.alphabet_romaji}
                                            </span>
                                            <div className="h-[8px] w-full bg-gray-200 rounded-lg mx-4"></div>
                                        </div>
                                    ) : (
                                        <div className="h-full w-full absolute top-0 left-0 inset-0 z-20 bg-gray-200 border-none"></div>
                                    )}
                                </div>
                            ))}

                            {katakanaAlphabet.map((alphabet, index) => (
                                <div key={index} className={alphabet.alphabet_character !== '' ? "relative overflow-hidden px-6 py-1 w-full border border-gray-300 rounded-xl shadow-md hover:scale-110 cursor-pointer transition-all" : "relative overflow-hidden px-6 py-1 w-full border-gray-300 rounded-xl shadow-md"}
                                    onClick={() => playAudio(alphabet.alphabet_audio)}>
                                    {alphabet.alphabet_character !== '' ? (
                                        <div className="flex flex-col items-center justify-items-center">
                                            <span className="fontJP text-xl">
                                                {alphabet.alphabet_character}
                                            </span>
                                            <span className="fontRokkitt text-base">
                                                {alphabet.alphabet_romaji}
                                            </span>
                                            <div className="h-[8px] w-full bg-gray-200 rounded-lg mx-4"></div>
                                        </div>
                                    ) : (
                                        <div className="h-full w-full absolute top-0 left-0 inset-0 z-20 bg-gray-200 border-none"></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {(dakutenHadakutenHiraganaAlphabet.length > 0 || dakutenHadakutenKatakanaAlphabet.length) > 0 && (
                            <>
                                <div className="flex flex-col items-center justify-around mt-3 w-[522px]">
                                    {lesson &&
                                        <>
                                            <h3 className="text-xl text-custom-color-blue fontCoiny">Biến âm (âm đục, âm bán đục)</h3>
                                            <ul className="">
                                                <li className="text-wrap">・　Âm đục: Thêm dấu 「〃」 (gọi là tenten) vào phía trên bên phải các chữ cái hàng 「か」、「さ」、「た」、「は」。</li>
                                                <li className="text-wrap">・　Âm bán đục: Thêm dấu 「〇」(gọi là maru) vào phía trên bên phải các chữ cái hàng 「は」。</li>
                                            </ul>
                                        </>
                                    }
                                </div>
                                <div className="grid grid-cols-5 gap-4 py-5">
                                    {dakutenHadakutenHiraganaAlphabet.map((alphabet, index) => (
                                        <div key={index} className={alphabet.alphabet_character !== '' ? "relative overflow-hidden px-6 py-1 w-full border border-gray-300 rounded-xl shadow-md hover:scale-110 cursor-pointer transition-all" : "relative overflow-hidden px-6 py-1 w-full border-gray-300 rounded-xl shadow-md"}
                                            onClick={() => playAudio(alphabet.alphabet_audio)}>
                                            {alphabet.alphabet_character !== '' ? (
                                                <div className="flex flex-col items-center justify-items-center">
                                                    <span className="fontJP text-xl">
                                                        {alphabet.alphabet_character}
                                                    </span>
                                                    <span className="fontRokkitt text-base">
                                                        {alphabet.alphabet_romaji}
                                                    </span>
                                                    <div className="h-[8px] w-full bg-gray-200 rounded-lg mx-4"></div>
                                                </div>
                                            ) : (
                                                <div className="h-full w-full absolute top-0 left-0 inset-0 z-50 bg-gray-200 border-none"></div>
                                            )}
                                        </div>
                                    ))}

                                    {dakutenHadakutenKatakanaAlphabet.map((alphabet, index) => (
                                        <div key={index} className={alphabet.alphabet_character !== '' ? "relative overflow-hidden px-6 py-1 w-full border border-gray-300 rounded-xl shadow-md hover:scale-110 cursor-pointer transition-all" : "relative overflow-hidden px-6 py-1 w-full border-gray-300 rounded-xl shadow-md"}
                                            onClick={() => playAudio(alphabet.alphabet_audio)}>
                                            {alphabet.alphabet_character !== '' ? (
                                                <div className="flex flex-col items-center justify-items-center">
                                                    <span className="fontJP text-xl">
                                                        {alphabet.alphabet_character}
                                                    </span>
                                                    <span className="fontRokkitt text-base">
                                                        {alphabet.alphabet_romaji}
                                                    </span>
                                                    <div className="h-[8px] w-full bg-gray-200 rounded-lg mx-4"></div>
                                                </div>
                                            ) : (
                                                <div className="h-full w-full absolute top-0 left-0 inset-0 z-50 bg-gray-200 border-none"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {(yoonHiraganaAlphabet.length > 0 || yoonKatakanaAlphabet.length) > 0 && (
                            <>
                                <div className="flex flex-col items-center justify-around mt-3 w-[522px]">
                                    {lesson &&
                                        <>
                                            <h3 className="text-xl text-custom-color-blue fontCoiny">Âm ghép</h3>
                                        </>
                                    }
                                </div>
                                <div className="grid grid-cols-3 gap-4 pb-5 pt-2">
                                    {yoonHiraganaAlphabet.map((alphabet, index) => (
                                        <div key={index} className={alphabet.alphabet_character !== '' ? "relative overflow-hidden px-6 py-1 w-full border border-gray-300 rounded-xl shadow-md hover:scale-110 cursor-pointer transition-all" : "relative overflow-hidden px-6 py-1 w-full border-gray-300 rounded-xl shadow-md"}
                                            onClick={() => playAudio(alphabet.alphabet_audio)}>
                                            {alphabet.alphabet_character !== '' ? (
                                                <div className="flex flex-col items-center justify-items-center">
                                                    <span className="fontJP text-xl">
                                                        {alphabet.alphabet_character}
                                                    </span>
                                                    <span className="fontRokkitt text-base">
                                                        {alphabet.alphabet_romaji}
                                                    </span>
                                                    <div className="h-[8px] w-full bg-gray-200 rounded-lg mx-4"></div>
                                                </div>
                                            ) : (
                                                <div className="h-full w-full absolute top-0 left-0 inset-0 z-50 bg-gray-200 border-none"></div>
                                            )}
                                        </div>
                                    ))}

                                    {yoonKatakanaAlphabet.map((alphabet, index) => (
                                        <div key={index} className={alphabet.alphabet_character !== '' ? "relative overflow-hidden px-6 py-1 w-full border border-gray-300 rounded-xl shadow-md hover:scale-110 cursor-pointer transition-all" : "relative overflow-hidden px-6 py-1 w-full border-gray-300 rounded-xl shadow-md"}
                                            onClick={() => playAudio(alphabet.alphabet_audio)}>
                                            {alphabet.alphabet_character !== '' ? (
                                                <div className="flex flex-col items-center justify-items-center">
                                                    <span className="fontJP text-xl">
                                                        {alphabet.alphabet_character}
                                                    </span>
                                                    <span className="fontRokkitt text-base">
                                                        {alphabet.alphabet_romaji}
                                                    </span>
                                                    <div className="h-[8px] w-full bg-gray-200 rounded-lg mx-4"></div>
                                                </div>
                                            ) : (
                                                <div className="h-full w-full absolute top-0 left-0 inset-0 z-50 bg-gray-200 border-none"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <VocabularyPage />
                        <KaiwaPage />
                        <GrammarPage />
                    </>
                )}
            </div>

            <div>Kiểm tra</div>
        </div>
    );
}

export default LessonDetailPage;