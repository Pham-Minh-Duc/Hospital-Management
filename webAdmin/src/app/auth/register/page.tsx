'use client';

import { useState } from 'react';
import { registerAdmin } from '@/service/adminService';



type RegisterPageProps = {
  onClose: () => void;
}

const RegisterPage = ({ onClose }: RegisterPageProps) => {

    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        password: string;
        gender: string;
        phone: string;
        birthday: string;
    }>({
        name: '',
        email: '',
        password: '',
        gender: 'male',
        phone: '',
        birthday: '',
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        const birthdayDate = formData.birthday ? new Date(formData.birthday) : null;
        if (!birthdayDate || isNaN(birthdayDate.getTime())) {
            alert('Vui lòng chọn ngày sinh hợp lệ!');
            return;
        }

        try {
            const response = await registerAdmin(
                formData.name,
                formData.email,
                formData.password,
                formData.gender,
                formData.phone,
                formData.birthday
            );

            localStorage.setItem('accessToken', response.accessToken);
            alert('Đăng ký thành công!');
            onClose();
        }
        catch (error) {
        console.error('Lỗi đăng ký:', error);
            alert('Đăng ký thất bại. Vui lòng thử lại.');
        }
    };

    return(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-6 shadow-md w-[400px] max-w-[90vw]">
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng kí</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Tên</label>
                        <input name = "name" onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input name = "email" type="email" onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Mật khẩu</label>
                        <input name = "password" type="password" onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <label className="block text-sm font-medium mb-2">Giới tính</label>
                    <select name="gender" onChange={handleChange} value={formData.gender}>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                        <input name="phone" onChange={handleChange} placeholder="Số điện thoại" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Ngày sinh</label>
                        <input name="birthday" type="date" onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Đăng ký</button>
                    <button type="button" onClick={onClose} className="w-full mt-4 bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400 transition">Đóng</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;