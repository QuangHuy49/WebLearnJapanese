import axios from "axios";

export async function getTotal() {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/admin/get-total`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.error('Failed to get total data:', error);
        return null;
    }
}