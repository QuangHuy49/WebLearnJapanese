import axios from 'axios';

export async function getVocabularyDataByid(id, page, perPage) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/vocabulary/${id}/vocabulary-data?page=${page}&perPage=${perPage}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.error('Failed to get lesson data:', error);
        return null;
    }
}