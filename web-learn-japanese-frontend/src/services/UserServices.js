import axios from "axios";

export async function getUser(page, perPage) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/getUser?page=${page}&perPage=${perPage}`);
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

export async function addUser(formData, csrfToken) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/user/add', formData, 
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to add user:', error);
    }
}

export async function getUserByid(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/get/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get user by id:', error);
    }
}

export async function updateUser(id, formData, csrfToken) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/user/edit/${id}`, formData,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to update User:', error);
    }
}

export async function deleteUser(id, csrfToken) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response.status;
    } catch (error) {
        console.error('Failed to delete user:', error);
    }
}

// delete user_avatar by user_id
export async function deleteAvatarImage(id, csrfToken) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/user/delete-avatar-image/${id}`,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response.status;
    } catch (error) {
        console.error('Failed to delete avatar image:', error);
    }
}