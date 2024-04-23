import axios from 'axios';

export async function getQuestion() {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/question/all`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.log('Error', error.message);
        return null;
    }
}

export async function getQuestionDataByIdTestWithPaging(id, page, perPage) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/question/${id}/question-data-paging?page=${page}&perPage=${perPage}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.error('Failed to get question data:', error);
        return null;
    }
}

export async function addQuestionAndAnswer(formData, csrfToken) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/question/add-question-answer`, formData,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to update lesson:', error);
    }
}

export async function getQuestionByid(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/question/get/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get question and answer by id:', error);
    }
}

export async function updateQuestion(id, formData, csrfToken) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/question/edit/${id}`, formData,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to update question and answer:', error);
    }
}

export async function deleteQuestion(id, csrfToken) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/question/delete/${id}`,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response.status;
    } catch (error) {
        console.error('Failed to delete question:', error);
    }
}

// delete question_img by question_id
export async function deleteQuestionImage(id, csrfToken) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/question/delete-question-image/${id}`,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response.status;
    } catch (error) {
        console.error('Failed to delete question image:', error);
    }
}

// delete question_audio by question_id
export async function deleteQuestionAudio(id, csrfToken) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/question/delete-question-audio/${id}`,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response.status;
    } catch (error) {
        console.error('Failed to delete question audio:', error);
    }
}

// user
// get question by test_id if question_status = 1
export async function getQuestionDataByIdTest(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/question/get-question-by-id-test/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.error('Failed to get vocabulary data:', error);
        return null;
    }
}