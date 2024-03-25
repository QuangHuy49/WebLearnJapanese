import React, { useState, useEffect } from 'react';
import handleRegister from '../services/RegisterServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const navigate = useNavigate();
    const [csrfToken, setCsrfToken] = useState('');
    const [formData, setFormData] = useState({
        user_name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.getAttribute('content'));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await handleRegister(formData, csrfToken);
            console.log(response.status); 
            if (response.status === 201) {
                toast.success('Đăng ký thành công!');
                navigate('/login');
            } else {
                toast.error('Đăng ký thất bại.');
            }
        } catch (error) {
            console.error('Failed to register:', error);
            toast.error('Đã xảy ra lỗi trong quá trình đăng ký.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#e24943]">
            <div className="absolute -left-16 -top-5 z-0 hidden h-60 w-60 rotate-45 transform rounded-xl bg-[#fbc4c2] md:block"></div>
            <div className="absolute -bottom-[-40px] -right-[-40px] hidden h-48 w-48 rotate-12 transform rounded-xl bg-[#fbc4c2] md:block"></div>
            <form className="z-20 rounded-2xl bg-white px-12 py-12 shadow-xl" onSubmit={handleSubmit}>
                <div className="w-80">
                    <h1 className="mb-8 cursor-pointer text-center text-3xl font-bold text-[#14375f]">ĐĂNG KÝ</h1>
                </div>
                <div className="space-y-4">
                    <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} placeholder="Username" className="block w-full rounded-lg border px-4 py-3 text-sm outline-[#14375f]" required />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="block w-full rounded-lg border px-4 py-3 text-sm outline-[#14375f]" required />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="block w-full rounded-lg border px-4 py-3 text-sm outline-[#14375f]" required />
                    <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} placeholder="Confirm password" className="block w-full rounded-lg border px-4 py-3 text-sm outline-[#14375f]" required />
                </div>
                <div className="mt-6 text-center">
                    <button type="submit" className="my-3 flex w-full items-center justify-center space-x-2 rounded-lg border bg-[#14375f] py-2 text-center text-xl text-white transition duration-150 hover:border-slate-400 hover:shadow">
                        Đăng ký
                    </button>
                    <div className="mt-4 flex justify-evenly space-x-2">
                        <span className="t-2 relative top-2 h-px flex-grow bg-gray-300"></span>
                        <span className="flex-none text-xs font-semibold uppercase text-gray-400">Hoặc</span>
                        <span className="t-2 relative top-2 h-px flex-grow bg-gray-300"></span>
                    </div>
                    <div className="">
                        <button className="my-3 flex w-full items-center justify-center space-x-2 rounded-lg border border-slate-200 py-2 text-center text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow"><img src="https://www.svgrepo.com/show/355037/google.svg" className="h-6 w-6" alt="" />
                            <span>
                                Đăng ký với Google
                            </span>
                        </button>
                    </div>
                </div>
            </form>
            <div className="absolute right-12 top-10 hidden h-40 w-40 rounded-full bg-[#fbc4c2] md:block"></div>
            <div className="absolute bottom-20 left-20 hidden h-40 w-20 rotate-45 transform rounded-full bg-[#fbc4c2] md:block"></div>
        </div>
    );
}

export default SignupPage;