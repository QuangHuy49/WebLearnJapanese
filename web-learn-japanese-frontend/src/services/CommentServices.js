import axios from "axios";

export async function getCommentById(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/comment/get-comment-by-id-post/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get comment by id post:', error);
    }
}