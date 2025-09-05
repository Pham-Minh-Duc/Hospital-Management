'use client';

import axios from 'axios';
import { AxiosError } from 'axios';


const API_URL = 'http://localhost:8080/admins';

interface LoginAdmin {
  adminEmail: string;
  adminPassword: string;
}

interface Admin {
    adminName: string;
    adminEmail: string;
    adminPassword: string;
    adminGender: string;
    adminPhone: string;
    adminBirthday: string;
}

export const loginAdmin = async (email: string, password: string) => {
    const adminData: LoginAdmin = {
        adminEmail: email,
        adminPassword: password,
    };
    try{
        console.log('Dữ liệu gửi đi:', adminData);
        const response = await axios.post(`${API_URL}/login`, adminData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    }
    catch (error: unknown) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || 'Lỗi không xác định';
    }

}

export const registerAdmin = async (adminName: string, adminEmail: string, adminPassword: string, adminGender: string, adminPhone: string, adminBirthday: string) => {
    console.log('Hàm loginAdmin đã được gọi');
    const adminData: Admin = {
        adminName: adminName,
        adminEmail: adminEmail,
        adminPassword: adminPassword,
        adminGender: adminGender,
        adminPhone: adminPhone,        
        adminBirthday: adminBirthday,
    }
    try{
        const response = await axios.post(`${API_URL}/register`, adminData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    }
    catch (error: unknown) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || 'Lỗi không xác định';
    }

}
