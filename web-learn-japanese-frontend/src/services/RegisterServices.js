import axios from 'axios';

const handleRegister = async (formData, csrfToken) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/register', formData, 
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to register:', error);
    }
};

export default handleRegister;
