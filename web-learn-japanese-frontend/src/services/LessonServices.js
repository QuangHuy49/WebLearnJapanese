import axios from "axios";

export async function getLessson(page, perPage) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/lesson/list?page=${page}&perPage=${perPage}`);
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

export async function addLesson(formData, csrfToken) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/lesson/add', formData, 
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to add leson:', error);
    }
}

export async function getLessonByid(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/lesson/get/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get lesson by id:', error);
    }
}

export async function updateLesson(id, formData, csrfToken) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/lesson/edit/${id}`, formData,
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

export async function deleteLesson(id, csrfToken) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/lesson/delete/${id}`,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response.status;
    } catch (error) {
        console.error('Failed to delete lesson:', error);
    }
}