import axios from "axios";

export async function getType() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/type/list');
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
export async function addType(formData, csrfToken) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/type/add', formData, 
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
export async function deleteType(id, csrfToken) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/type/delete/${id}`,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response.status;
    } catch (error) {
        console.error('Failed to delete type:', error);
    }
}
export async function getTypeByid(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/type/get/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get type by id:', error);
    }
}
export async function updateType(id,formData, csrfToken) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/type/edit/${id}`, formData,
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
 