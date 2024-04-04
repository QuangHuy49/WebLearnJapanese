import axios from 'axios';

export async function getGrammarDataByIdWithPaging(id, page, perPage) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/grammar/${id}/grammar-data-paging?page=${page}&perPage=${perPage}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.error('Failed to get grammar data:', error);
        return null;
    }
}

export async function getGrammarById(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/grammar/get/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get grammar by id:', error);
    }
}

export async function addGrammar(formData, csrfToken) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/grammar/add', formData, 
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to add grammar:', error);
    }
}

export async function updateGrammar(id, formData, csrfToken) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/grammar/edit/${id}`, formData,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to update grammar:', error);
    }
}

export async function deleteGrammar(id, csrfToken) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/grammar/delete/${id}`,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response.status;
    } catch (error) {
        console.error('Failed to delete grammar:', error);
    }
}

// get grammar by id lesson if status = 1
export async function getGrammarDataById(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/grammar/${id}/grammar-data`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.error('Failed to get grammar data:', error);
        return null;
    }
}