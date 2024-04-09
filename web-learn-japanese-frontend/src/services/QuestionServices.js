import axios from 'axios';

export async function getQuestionDataByIdWithPaging(id, page, perPage) {
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