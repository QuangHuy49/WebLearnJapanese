import axios from 'axios';

export async function getVocabularyDataByIdWithPaging(id, page, perPage) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/vocabulary/${id}/vocabulary-data-paging?page=${page}&perPage=${perPage}`);
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

export async function getVocabularyByid(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/vocabulary/get/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get vocabulary by id:', error);
    }
}

export async function addVocabulary(formData, csrfToken) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/vocabulary/add', formData, 
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to add vocabulary:', error);
    }
}

export async function updateVocabulary(id, formData, csrfToken) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/vocabulary/edit/${id}`, formData,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to update vocabulary:', error);
    }
}

export async function deleteVocabulary(id, csrfToken) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/vocabulary/delete/${id}`,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response.status;
    } catch (error) {
        console.error('Failed to delete vocabulary:', error);
    }
}

// get vocabulary by id lesson if status = 1
export async function getVocabularyDataById(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/vocabulary/${id}/vocabulary-data`);
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