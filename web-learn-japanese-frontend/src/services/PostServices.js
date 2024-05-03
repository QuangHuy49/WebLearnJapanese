import axios from "axios";

export async function addPostAdmin(formData, user_id, csrfToken) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/post/add-admin/${user_id}`, formData, 
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to add post:', error);
    }
}

export async function addPostUser(formData, user_id, csrfToken) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/post/add-user/${user_id}`, formData, 
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to add post:', error);
    }
}

export async function getPostById(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/post/get/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get post by id:', error);
    }
}

export async function getMyPostByIdUser(user_id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/post/${user_id}/post-data`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.error('Failed to get my post:', error);
    }
}

export async function getLatestPost() {
    try {
        const response = await axios.get(` http://127.0.0.1:8000/api/post/latest-post-data`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.error('Failed to get latest post:', error);
    }
}

export async function getAllPost(page, perPage) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/post/get-all-post?page=${page}&perPage=${perPage}`);
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

export async function updatePost(id, formData, csrfToken) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/post/edit/${id}`, formData,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to update post:', error);
    }
}

// delete post_img by post_id
export async function deletePostImage(id, csrfToken) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/post/delete-post-image/${id}`,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response.status;
    } catch (error) {
        console.error('Failed to delete post img:', error);
    }
}

export async function deletePost(id, csrfToken) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/post/delete/${id}`,
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response.status;
    } catch (error) {
        console.error('Failed to delete post:', error);
    }
}