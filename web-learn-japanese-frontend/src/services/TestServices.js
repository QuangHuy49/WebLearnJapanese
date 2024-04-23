import axios from "axios";

export async function getTest() {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/test/all`);
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

export async function getTestPaging(page, perPage) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/test/list?page=${page}&perPage=${perPage}`);
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

export async function addTest(formData, csrfToken) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/test/add', formData, 
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to add test:', error);
    }
}

export async function getTestByid(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/test/get/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get test by id:', error);
    }
}

export async function updateTest(id, formData, csrfToken) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/test/edit/${id}`, formData,
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

export async function deleteTest(id, csrfToken) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/test/delete/${id}`,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response.status;
    } catch (error) {
        console.error('Failed to delete test:', error);
    }
}

// get test by id lesson if status = 1
export async function getTestDataByIdLesson(id, user_id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/test/${id}/test-data?user_id=${user_id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.error('Failed to get test data:', error);
        return null;
    }
}

// user
// add test into user
export async function addTestUser(formData, userId, lessonId, csrfToken) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/test-user/add-test-user/${lessonId}/${userId}`, formData, {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to add lesson:', error);
        throw error;
    }
}