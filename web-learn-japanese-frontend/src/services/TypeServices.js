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