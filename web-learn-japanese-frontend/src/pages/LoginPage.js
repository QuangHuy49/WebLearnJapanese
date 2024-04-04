import React, { useState, useEffect, useTransition } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import handleLogin from '../services/LoginServices';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation(['button', 'login']);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }
    }, []);

    const handleLoginSubmit = async (e) => { 
        e.preventDefault();
        try {
            const loginResult = await handleLogin(email, password, csrfToken, setError);
            if (loginResult === 200) {
                const profileResponse = await axios.get('http://127.0.0.1:8000/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const userRole = profileResponse.data.user_role_id;
                if (userRole === 1) {
                    navigate('/admin');
                } else if (userRole === 2) {
                    navigate('/');
                } else {
                    setError('Unknown user role');
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-[#e24943] flex justify-center items-center">
            <div className="absolute w-60 h-60 rounded-xl bg-[#fbc4c2] -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
            <div className="absolute w-48 h-48 rounded-xl bg-[#fbc4c2] -bottom-[-40px] -right-[-40px] transform rotate-12 hidden md:block"></div>
            <form className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20" onSubmit={handleLoginSubmit}>
                <div className="w-80">
                    <h1 className="text-3xl font-bold text-center mb-8 text-[#14375f]">
                        {t('button.login')}
                    </h1>
                </div>
                <div className="space-y-4">
                    <input type="hidden" name="_token" value={csrfToken} />
                    <input type="email" placeholder="Email" className="block text-sm py-3 px-4 rounded-lg w-full border outline-[#14375f]" 
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" className="block text-sm py-3 px-4 rounded-lg w-full border outline-[#14375f]" 
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="space-y-4 my-4">
                    <p className="text-right text-sm font-semibold tracking-wide cursor-pointer text-[#14375f]">{t('login.forgot_password', { ns: 'login' })}</p>
                </div>
                {error && <p className="text-center" style={{ color: 'red' }}>{error}</p>}
                <div className="text-center mt-2">
                    <button type="submit" className="w-full text-center text-xl py-2 my-3 border flex space-x-2 items-center justify-center rounded-lg text-white bg-[#14375f] hover:border-slate-400 hover:shadow transition duration-150">
                        {t('button.login')}
                    </button>
                    <div className="flex justify-evenly space-x-2 mt-4">
                        <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
                        <span className="flex-none uppercase text-xs text-gray-400 font-semibold">{t('login.or', { ns: 'login' })}</span>
                        <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
                    </div>
                    <div className="">
                        <button className="w-full text-center py-2 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" /> 
                            <span>
                                {t('button.google')}
                            </span>
                        </button>
                    </div>
                    <p className="mt-10 text-sm text-[#14375f]">
                        {t('login.no_account', { ns: 'login' })} 
                        <Link to={'/signup'} className="ml-2 underline cursor-pointer font-bold text-[#14375f]">
                            {t('button.register')}
                        </Link>
                    </p>
                </div>
            </form>
            <div className="w-40 h-40 absolute bg-[#fbc4c2] rounded-full top-10 right-12 hidden md:block"></div>
            <div className="w-20 h-40 absolute bg-[#fbc4c2] rounded-full bottom-20 left-20 transform rotate-45 hidden md:block"></div>
        </div>
    );
}

export default LoginPage;