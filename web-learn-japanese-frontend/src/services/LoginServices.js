import axios from 'axios';

const handleLogin = async (email, password, csrfToken, setError) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
            email: email,
            password: password
        }, {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });
        localStorage.setItem('token', response.data.access_token);
        return response.status;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            setError('Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.');
        } else {
            setError('An error occurred. Please try again later.');
        }
    }
};

export default handleLogin;
