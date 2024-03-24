import axios from 'axios';

const handleLogout = async (csrfToken) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/logout', {}, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.status;
    } catch (error) {
        console.error('Failed to logout:', error);
    }
};

export default handleLogout;
