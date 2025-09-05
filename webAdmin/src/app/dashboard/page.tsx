'use client';

import { useState, useEffect } from 'react';
import DashboardTab from './tab/dashboard/page';
import PatientPage from './tab/patient/page';
import AppointmentTab from './tab/appointment/page';
import Bills from './tab/bill/page';
import Doctors from './tab/doctor/page';
import Helps from './tab/liveHelp/page';
import Notifications from './tab/note/page';
import '../../icon/themify-icons-font/themify-icons/themify-icons.css';

const items = [
  { name: 'Dashboard', icon: 'ti-layout-grid2' },
  { name: 'Patients', icon: 'ti-user' },
  { name: 'Doctors', icon: 'ti-heart-broken' },
  { name: 'Appointments', icon: 'ti-calendar' },
  { name: 'Bills', icon: 'ti-receipt' },
  { name: 'Helps', icon: 'ti-help-alt' },
  { name: 'Notifications', icon: 'ti-bell' },
];

const DashboardPage = () => {

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSideBar, setShowSideBar] = useState(true);

  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const storedAdminName = localStorage.getItem('adminName');
    if (storedAdminName) {
      setAdminName(storedAdminName);
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardTab />;
      case 'Patients':
        return <PatientPage />;
      case 'Doctors':
        return <Doctors />;
      case 'Appointments':
        return <AppointmentTab />;
      case 'Bills':
        return <Bills />;
      case 'Helps':
        return <Helps />;
      case 'Notifications':
        return <Notifications />;
      default:
        return <div className='flex items-center justify-center h-screen font-bold text-[50px]'>
                Welcome to Admin Dashboard
               </div>;
    }
  };
  
  return (
    <div className="w-full h-full">
      <section className='flex h-screen overflow-hidden'>
          {/* sideBar */}
          <div className={`w-[264px] bg-[#232E3C] flex-shrink-0 transition-all duration-300 ease-in-out ${showSideBar ? 'translate-x-0' : '-translate-x-full'}`}>
            <div>
              <header className="text-[18.4px] text-white font-bold mb-4 ml-[26px] mt-2">Dashboard</header>
            </div>
            <div className='h-[66px]'>
                <div className='h-full flex items-center justify-center text-white font-bold'>
                  <p> Welcome, {adminName}</p>
                </div>
            </div>
            <div>
              {items.map((tab) => (
                <div
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`text-[14px] pt-[10px] pb-[10px] pr-[26px]  pl-[26px] cursor-pointer text-[#ced4da] mb-2 hover:text-[#e9ecef] ${
                  activeTab === tab.name ? 'border-l-2 border-blue-500 bg-[linear-gradient(90deg,rgba(59,125,221,0.1),rgba(59,125,221,0.088)_50%,transparent)] text-white' : ''
                }`}
                >
                  <i className={`${tab.icon} text-[16px] mr-[12px]`}></i>
                  <span>{tab.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* main content */}
          <main className={`flex-1 bg-[#F5F7FB] transition-all duration-300 ease-in-out overflow-y-auto ${showSideBar ? 'ml-0' : 'ml-[-264px]'}`}>
            <div className=' bg-white flex items-center shadow-xs pt-[14px] pb-[14px] pl-[22px] pr-[22px]'>
              <i onClick={()=> setShowSideBar(!showSideBar)} className='ti-menu cursor-pointer ml-4 text-[20px]'></i>
            </div>

            {renderContent()}

          </main>
      </section>
      <footer>

      </footer>
    </div>
  );
}
export default DashboardPage;