
import { Line } from "react-chartjs-2";
import { useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);


import ScheduleDetailModal from './modal/scheduleDetailModal';


type ScheduleItem = {
  time: string;
  patient: string;
  type: string;
  status: string;
  description: string;
};


const items = [
  { name: 'Patients', icon: 'ti-user', number: '2.382',upDown: '-3.65%' , note: 'Since last week' },
  { name: 'Doctors', icon: 'ti-id-badge', number: '342',upDown: '-1.02%' , note: 'Since last week' },
  { name: 'Appointments', icon: 'ti-calendar', number: '14.212',upDown: '5.25%' , note: 'Today' },
  { name: 'Pending Bills', icon: 'ti-wallet', number: '17',upDown: '-2.25%' , note: 'Not settled' },
]

const revenueData = {
  labels: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  datasets: [
    {
      label: 'Revenue (VND)',
      data: [1200, 2100, 1800, 2400, 3000, 3200, 3400, 3700, 3900, 4100, 4300, 4500],
      fill: false,
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f6',
      tension: 0.3,
      pointRadius: 4,
    }
  ]
};

const scheduleToday = [
  {
    time: '08:00',
    patient: 'Nguyễn Văn A',
    type: 'Khám tim mạch',
    status: 'done',
    description: 'Bệnh nhân có tiền sử cao huyết áp, cần theo dõi thêm.'
  },
  {
    time: '09:30',
    patient: 'Trần Thị B',
    type: 'Tư vấn nội khoa',
    status: 'pending',
    description: 'Lần khám đầu tiên, chưa có tiền sử bệnh rõ ràng.'
  }
];

const doctorStats = [
  { department: 'Tim mạch', doctor: 'Dr. Hải', patients: 28, performance: '+12%', todayAppointments: 6 },
  { department: 'Nội khoa', doctor: 'Dr. Tú', patients: 35, performance: '+9%', todayAppointments: 5 },
  { department: 'Tai-Mũi-Họng', doctor: 'Dr. Lan', patients: 22, performance: '-3%', todayAppointments: 3 },
  { department: 'Ngoại khoa', doctor: 'Dr. Phúc', patients: 31, performance: '+7%', todayAppointments: 4 },
  { department: 'Nhi khoa', doctor: 'Dr. An', patients: 40, performance: '+15%', todayAppointments: 7 },
  { department: 'Da liễu', doctor: 'Dr. My', patients: 19, performance: '+5%', todayAppointments: 2 },
  { department: 'Mắt', doctor: 'Dr. Toàn', patients: 25, performance: '+10%', todayAppointments: 4 },
  { department: 'Xương khớp', doctor: 'Dr. Hùng', patients: 30, performance: '-2%', todayAppointments: 5 },
  { department: 'Thần kinh', doctor: 'Dr. Minh', patients: 24, performance: '+8%', todayAppointments: 3 },
  { department: 'Tiêu hóa', doctor: 'Dr. Hằng', patients: 27, performance: '+6%', todayAppointments: 4 },
  { department: 'Hô hấp', doctor: 'Dr. Quân', patients: 33, performance: '+11%', todayAppointments: 6 },
  { department: 'Nội tiết', doctor: 'Dr. Nhã', patients: 20, performance: '0%', todayAppointments: 2 },
  { department: 'Phục hồi chức năng', doctor: 'Dr. Khoa', patients: 18, performance: '-1%', todayAppointments: 2 }
];

const DashboardTab = () => {
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null);

  return (
    <div className="pt-[48px] pr-[48px] pl-[48px] pb-[24px]">
      {/* header */}
      <div>
        {/* title */}
        <div className="flex justify-between mb-6">
          <h2 className="text-[21px]"><b>SYSTEM</b> OVERVIEW</h2>
           <select className="border rounded px-3 py-2 text-sm">
            <option>Tuần này</option>
            <option>Tháng này</option>
            <option>3 tháng gần nhất</option>
          </select>
        </div>
        {/* top group */}
        <div className="flex flex-row gap-6 h-[358px]">
          <div className="lg:basis-[40%] grid grid-cols-2 gap-[12px] w-full">
            {items.map((item) => (
              <div key={item.name} className="bg-white p-[20px] rounded-lg shadow-sm flex flex-col justify-between">
                <div className="flex justify-between">
                  <p className="text-[#CACED1] text-lg">{item.name}</p>
                  <div className="w-[40px] h-[40px] bg-[#D3E2F7] rounded-full flex justify-center items-center">
                    <i className={`${item.icon} text-[15px] text-blue-400 flex justify-center items-center`}></i>
                  </div>
                </div>
                  <p className="text-[28px] font-medium">{item.number}</p>
                  <p className="text-[#D0D2D4] text-[14px]"><span className={`${item.upDown.startsWith('-') ? 'text-red-600 bg-[#F5DEE0]' : 'text-green-600 bg-[#DCEEE9]'} text-[11.2px] rounded-[5px] pt-[2px] pb-[2px] pl-[7px] pr-[7px]`}>{item.upDown}</span> {item.note}</p>
              </div>
            ))}
          </div>
          {/* content */}
          <div className="bg-white basis-[60%] p-5 flex md:flex-row flex-col">
            biểu đồ đường doanh thu theo thời gian
            <Line data={revenueData}/>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm mt-5">
          <h3 className="text-lg font-bold mb-4">⏰ Lịch hẹn hôm nay</h3>
          <ul className="flex flex-col gap-4 text-sm">
            {scheduleToday.map((item, index) => (
              <li key={index} className="border-l-4 pl-3 relative">
                <p className="font-semibold text-blue-700">{item.time} – {item.patient}</p>
                <p className="text-gray-600">{item.type}</p>

                {/* Trạng thái */}
                <span
                  className={`text-xs font-medium rounded px-2 py-1 absolute top-0 right-0 ${
                    item.status === 'done' ? 'bg-green-100 text-green-700' :
                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}
                >
                  {item.status === 'done' && '✅ Đã khám'}
                  {item.status === 'pending' && '⏳ Đang chờ'}
                  {item.status === 'cancelled' && '❌ Hủy'}
                </span>

                {/* Nút Chi tiết */}
                <button 
                  className="mt-2 text-blue-600 text-xs underline hover:text-blue-800"
                  onClick={() => setSelectedItem(item)}
                >
                  Xem chi tiết
                </button>
              </li>
            ))}
          </ul>
          {selectedItem && (
            <ScheduleDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
          )}
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto mt-5">
          <h3 className="text-lg font-bold p-2 mb-3">📊 Phân tích bác sĩ theo phòng ban</h3>
          <div className="max-h-[480px] overflow-y-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Phòng ban</th>
                  <th className="p-3">Bác sĩ</th>
                  <th className="p-3">Số bệnh nhân</th>
                  <th className="p-3">Hiệu suất</th>
                  <th className="p-3">Lịch hôm nay</th>
                </tr>
              </thead>
              <tbody>
                {doctorStats.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{item.department}</td>
                    <td className="p-3">{item.doctor}</td>
                    <td className="p-3">{item.patients}</td>
                    <td className={`p-3 font-medium ${
                      item.performance.startsWith('-') ? 'text-red-600' : 'text-green-600'
                    }`}>{item.performance}</td>
                    <td className="p-3">{item.todayAppointments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashboardTab;