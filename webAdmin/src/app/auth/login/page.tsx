'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/service/adminService';

type LoginPageProps = {
  onClose: () => void;
}

const LoginPage = ({ onClose }: LoginPageProps) => {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [adminName, setAdminName] = useState('');


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const data = await loginAdmin(email, password);
            setMessage(data.message);
            setAdminName(data.adminName);
            localStorage.setItem('adminName', data.adminName);
            router.push('/dashboard');
        }
        catch( error:unknown) {
            if (typeof error === 'string') {
                setMessage(error);
            } else if (error instanceof Error) {
                setMessage(error.message);
            } else {
                setMessage('Lỗi không xác định');
            }
        }

    };

    return(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-6 shadow-md w-[400px] max-w-[90vw]">
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input 
                            type="email" 
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Mật khẩu</label>
                        <input 
                            type="password" 
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        onClick={handleLogin}
                    >
                        Đăng nhập
                    </button>
                    <button 
                        type="button" 
                        className="w-full mt-4 bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400 transition"
                        onClick={onClose} 
                    >
                        Đóng
                    </button>
                    {message && <p className='text-center text-red-500'>{message}</p>}
                    {adminName && <p>Xin chào, {adminName}!</p>}
                </form>
            </div>
        </div>
    )
}

export default LoginPage;