import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionDataByIdTest } from '../../services/QuestionServices';

const QuestionPage = () => {
    let { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        handleGetQuestionByIdTest();
    }, []);

    const handleGetQuestionByIdTest = async () => {
        const data = await getQuestionDataByIdTest(id);
        if (data) {
            setQuestions(data.questions);
        } else {
            setQuestions([]);
        }
    };

    const handleAnswerSelection = (answerId) => {
        setSelectedAnswer(answerId);
    };

    const handleNextQuestion = () => {
        // Kiểm tra xem người dùng đã chọn câu trả lời chưa
        if (selectedAnswer !== null) {
            // Tăng chỉ số câu hỏi hiện tại lên 1
            setCurrentIndex(currentIndex + 1);
            // Kiểm tra xem câu trả lời đã đúng chưa, nếu đúng tăng điểm lên 1
            if (questions[currentIndex].answer.find(answer => answer.answer_id === selectedAnswer).answer_correct === 1) {
                setScore(score + 1);
            }
            // Reset selectedAnswer về null
            setSelectedAnswer(null);
            // Kiểm tra xem đã là câu hỏi cuối cùng chưa, nếu là thì đánh dấu hoàn thành
            if (currentIndex === questions.length - 1) {
                setIsComplete(true);
            }
        }
    };

    return (
        <div>
            <h1>Đây là Trang câu hỏi</h1>
            {isComplete ? (
                <div>
                    <h2>Bài kiểm tra đã hoàn thành!</h2>
                    <p>Điểm số của bạn: {score}</p>
                    {/* Nút để gửi điểm số lên server */}
                    
                    <div></div>
                </div>
            ) : (
                <div>
                    {questions[currentIndex] ? (
                        <>
                            <h2>Câu hỏi {currentIndex + 1}</h2>
                            <p>{questions[currentIndex].question_name}</p>
                            {/* Hiển thị danh sách câu trả lời */}
                            {questions[currentIndex].answer.map(answer => (
                                <div key={answer.answer_id}>
                                    <input type="radio" id={answer.answer_id} name="answer" value={answer.answer_id} onChange={() => handleAnswerSelection(answer.answer_id)} checked={selectedAnswer === answer.answer_id} />
                                    <label htmlFor={answer.answer_id}>{answer.answer_name}</label>
                                </div>
                            ))}
                            {/* Nút để chuyển sang câu hỏi tiếp theo */}
                            <button onClick={handleNextQuestion}>Tiếp tục</button>
                        </>
                    ) : (
                        <p>Không có câu hỏi nào để hiển thị</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default QuestionPage;