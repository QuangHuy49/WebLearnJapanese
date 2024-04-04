import React, { useEffect, useState } from 'react';
import { getVocabularyDataById } from '../../services/VocabularyServices';
import { useParams } from 'react-router-dom';

const VocabularyPage = () => {
    let { id } = useParams();
    const [vocabularies, setVocabularies] = useState([]);

    useEffect(() => {
        getVocabularyData();
    }, []);

    const getVocabularyData = async () => {
        const data = await getVocabularyDataById(id);
        if (data) {
            setVocabularies(data.vocabularies);
        } else {
            setVocabularies([]);
        }
    };

    const playAudio = (audioUrl) => {
        const audio = new Audio(audioUrl);
        audio.play()
            .catch(error => {
                console.error('Failed to play audio:', error);
            });
    };
    
    return (
        <>
            {vocabularies.length > 0 ? (
                <>
                    <span className="text-left text-xl text-custom-color-blue font-semibold my-2">Từ vựng</span>

                    {/* section vocabulary */}
                    <section class="">
                        <div class="w-full mb-6 overflow-hidden rounded-lg">
                            <div class="w-full overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr class="text-md tracking-wide text-left text-white bg-custom-color-blue border-b border-gray-600">
                                            <th class="px-4 py-3">Từ vựng</th>
                                            <th class="px-4 py-3">Hán tự</th>
                                            <th class="px-4 py-3">Âm Hán</th>
                                            <th class="px-4 py-3">Nghĩa</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white">
                                        {vocabularies.map((item, index) => {
                                            return (
                                                <tr class="text-custom-color-blue" key={index}>
                                                    <td class="px-4 py-3 text-lg border fontJP bg-white">
                                                        <span onClick={() => playAudio(item.vocabulary_audio)}>
                                                            {item.vocabulary_name}
                                                        </span>
                                                    </td>
                                                    <td class="px-4 py-3 text-lg border fontJP bg-white">
                                                        {item.vocabulary_character}
                                                    </td>
                                                    <td class="px-4 py-3 text-ms border bg-white fontRokkitt">
                                                        {item.vocabulary_yin_han}
                                                    </td>
                                                    <td class="px-4 py-3 text-ms border bg-white fontRokkitt">
                                                        {item.vocabulary_mean}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                null
            )}
        </>
    );
}

export default VocabularyPage;