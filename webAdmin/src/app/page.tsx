'use client';

import Image from 'next/image';
import Button from '@/components/button';

import { useState } from 'react';
import LoginPage from './auth/login/page';
import RegisterPage from './auth/register/page';

const Home = () => {

  const [modalType, setModalType] = useState<'login' | 'register' | null>(null);

  return (
    <>
      <div className='flex items-center justify-center h-auto w-full bg-gray-100'>
        <div className='w-full max-w-[1500px] p-4'>
          <div className="flex items-center justify-between h-15 w-full bg-gray-100">
            <Image
              src="/img/logo.png"
              alt="Hình nền"
              width={500}
              height={300}
              className="w-[100px] h-[100px]"
              />
            <div>
            <Button
              label="Đăng nhập"
              className='mr-4 text-white hover:bg-blue-700'
              onClick={() => setModalType('login')}
            />
            <Button
              label="Đăng ký"
              className='border-blue-700 border-1 text-blue-500 hover:text-white hover:bg-blue-700'
              onClick={() => setModalType('register')}
            />
            {modalType === 'login' && (
              <LoginPage onClose={() => setModalType(null)} />
            )}
            {modalType === 'register' && (
              <RegisterPage onClose={() => setModalType(null)} />
      )}

            </div>
          </div>
          <div
            className="w-full h-screen relative"
            style={{
              backgroundImage: "url('/img/healthCareHomePage.jpg')",
              backgroundSize: '100% auto',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top',
            }}
            >
            <div className="absolute inset-0">
              <div className="relative z-10 p-6 text-black">Health Care Admin Page</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
