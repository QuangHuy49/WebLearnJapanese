import axios from 'axios';

export async function getKaiwaDataByIdWithPaging(id, page, perPage) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/kaiwa/${id}/kaiwa-data-paging?page=${page}&perPage=${perPage}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.error('Failed to get kaiwa data:', error);
        return null;
    }
}

export async function getKaiwaByid(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/kaiwa/get/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get kaiwa by id:', error);
    }
}

export async function addKaiwa(formData, csrfToken) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/kaiwa/add', formData, 
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to add kaiwa:', error);
    }
}

export async function updateKaiwa(id, formData, csrfToken) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/kaiwa/edit/${id}`, formData,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to update kaiwa:', error);
    }
}

export async function deleteKaiwa(id, csrfToken) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/kaiwa/delete/${id}`,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response.status;
    } catch (error) {
        console.error('Failed to delete kaiwa:', error);
    }
}

// get kaiwa by id lesson if status = 1
export async function getKaiwaDataById(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/kaiwa/${id}/kaiwa-data`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.error('Failed to get kaiwa data:', error);
        return null;
    }
}