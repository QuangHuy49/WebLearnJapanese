import axios from "axios";

export async function getLesson() {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/lesson/all`);
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

export async function getLessonPaging(page, perPage) {
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

// UI user
// get  latest lesson if status = 1
export async function getLatestLesson(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/lesson/latest-lessons/${id}`);
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

// get lessons if user learned (My course)
export async function getLessonsByIdUser(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/lesson/lessons-user/${id}`);
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

// add lesson into my course of user
export async function addLessonUser(formData, userId, csrfToken) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/lesson-user/add-lesson-user/${userId}`, formData, 
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

// delete lesson_img by lesson_id
export async function deleteLessonImage(id, csrfToken) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/lesson/delete-lesson-image/${id}`,
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

// get lesson basic N5
export async function getLessonBasicN5(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/lesson/get-lesson-basic-n5/${id}`);
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

// get lesson basic N4
export async function getLessonBasicN4(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/lesson/get-lesson-basic-n4/${id}`);
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