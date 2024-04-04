import React, { useEffect, useState } from 'react';
import { getKaiwaDataById } from '../../services/KaiwaServices';
import { useParams } from 'react-router-dom';

const KaiwaPage = () => {
    let { id } = useParams();
    const [kaiwas, setKaiwas] = useState([]);

    useEffect(() => {
        getKaiwaData();
    }, []);

    const getKaiwaData = async () => {
        const data = await getKaiwaDataById(id);
        if (data) {
            setKaiwas(data.kaiwas);
        } else {
            setKaiwas([]);
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
            {kaiwas.length > 0 ? (
                <>
                    <span className="text-left text-xl text-custom-color-blue font-semibold my-2">Kaiwa</span>

                    {/* section vocabulary */}
                    <section class="">
                        <div class="w-full mb-6 overflow-hidden rounded-lg">
                            <div class="w-full overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr class="text-md tracking-wide text-left text-white bg-custom-color-blue border-b border-gray-600">
                                            <th class="px-4 py-3">Câu kaiwa</th>
                                            <th class="px-4 py-3">Nghĩa</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white">
                                        {kaiwas.map((item, index) => {
                                            return (
                                                <tr class="text-custom-color-blue" key={index}>
                                                    <td class="px-4 py-3 text-lg border fontJP bg-white">
                                                        <span onClick={() => playAudio(item.vocabulary_audio)}>
                                                            {item.kaiwa_name}
                                                        </span>
                                                    </td>
                                                    <td class="px-4 py-3 text-lg border bg-white fontRokkitt">
                                                        {item.kaiwa_mean}
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

export default KaiwaPage;