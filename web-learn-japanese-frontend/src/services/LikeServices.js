import axios from "axios";

export async function likePost(formData, csrfToken) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/like/add-like`, formData, 
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to add like post:', error);
    }
}