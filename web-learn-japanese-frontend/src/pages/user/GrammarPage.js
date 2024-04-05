import React, { useEffect, useState } from 'react';
import { getGrammarDataById } from '../../services/GrammarServices';
import { useParams } from 'react-router-dom';

const GrammarPage = () => {
    let { id } = useParams();
    const [grammars, setGrammars] = useState([]);

    useEffect(() => {
        getGrammarData();
    }, []);

    const getGrammarData = async () => {
        const data = await getGrammarDataById(id);
        if (data) {
            setGrammars(data.grammars);
        } else {
            setGrammars([]);
        }
    };

    return (
        <>
            {grammars.length > 0 ? (
                <>
                    <span className="text-left text-xl text-custom-color-blue font-semibold my-2">Ngữ pháp</span>

                    {/* section vocabulary */}
                    <section class="">
                        {grammars.map((item, index) => {
                            return (
                                <div class="w-full mb-6 overflow-hidden rounded-lg">

                                    <div class="w-full overflow-x-auto" key={index}>
                                        <table class="w-full">
                                            <thead>
                                                <tr class="text-md tracking-wide text-left text-white bg-custom-color-blue border-b border-gray-600">
                                                    <th class="px-4 py-3">
                                                        <span className="mr-3">{index + 1}.</span>
                                                        <span>{item.grammar_title}</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white">
                                                <tr class="text-custom-color-blue">
                                                    <td class="px-4 py-3 text-lg border bg-white fontRokkitt">
                                                        Nghĩa là: {item.grammar_mean}
                                                    </td>
                                                </tr>
                                                <tr class="text-custom-color-blue">
                                                    <td class="px-4 py-3 text-lg border bg-white fontRokkitt">
                                                        {item.grammar_detail.split('.').map((sentence, sentenceIndex) => {
                                                            if (sentence.trim() !== '') {
                                                                return <p key={sentenceIndex}>- {sentence.trim()}</p>;
                                                            }
                                                            return null;
                                                        })}
                                                    </td>
                                                </tr>
                                                <tr class="text-custom-color-blue">
                                                    <td class="px-4 py-3 text-lg border bg-white fontRokkitt">
                                                        <span className="flex flex-col font-semibold">Ví dụ</span>
                                                        {item.grammar_example.split(/(例 \d+ \(ví dụ \d+\))/).filter(Boolean).map((example, exampleIndex) => {
                                                            const trimmedExample = example.trim();
                                                            if (trimmedExample !== '') {
                                                                return <p key={exampleIndex}>{trimmedExample}</p>;
                                                            }
                                                            return null;
                                                        })}
                                                    </td>
                                                </tr>
                                                {item.grammar_note &&
                                                    <tr class="text-custom-color-blue">
                                                        <td class="px-4 py-3 text-lg border bg-white fontRokkitt">
                                                            {item.grammar_note}
                                                        </td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                </>
            ) : (
                null
            )}
        </>
    );
}

export default GrammarPage;