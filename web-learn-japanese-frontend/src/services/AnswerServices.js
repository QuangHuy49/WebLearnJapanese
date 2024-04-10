import axios from "axios";

export async function getAnswerDataByIdQuestion(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/answer/${id}/answer-data`);
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

export async function updateAnswer(formData, csrfToken) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/answer/edit`, formData,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to update answer:', error);
    }
}

export async function deleteAnswer(id, csrfToken) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/answer/delete/${id}`,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response.status;
    } catch (error) {
        console.error('Failed to delete answer:', error);
    }
}

// delete answer_img by answer_id
export async function deleteAnswerImage(id, csrfToken) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/answer/delete-answer-image/${id}`,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response.status;
    } catch (error) {
        console.error('Failed to delete answer image:', error);
    }
}

// delete answer_audio by answer_id
export async function deleteAnswerAudio(id, csrfToken) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/answer/delete-answer-audio/${id}`,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response.status;
    } catch (error) {
        console.error('Failed to delete answer audio:', error);
    }
}