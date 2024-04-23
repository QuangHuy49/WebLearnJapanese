import axios from "axios";

export async function viewPost(formData, csrfToken) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/view/add-view`, formData, 
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to add view post:', error);
    }
}