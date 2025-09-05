import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import Button from '@/components/button'
import Input from '@/components/input';
import Label from '@/components/label';

const billData = [
  {
    billCode: "HD001",
    patientName: "Nguyễn Văn A",
    crt_at: "2025-07-30T08:15:00",
    listService: ["Khám mắt"],
    total: 200000,
    status: "Chờ thanh toán",
    paymentMethod: "Tiền mặt",
  },
  {
    billCode: "HD002",
    patientName: "Trần Thị B",
    crt_at: "2025-07-30T08:45:00",
    listService: ["Tư vấn nội khoa"],
    total: 300000,
    status: "Đã thanh toán",
    paymentMethod: "Chuyển khoản",
  },
  {
    billCode: "HD003",
    patientName: "Phạm Văn C",
    crt_at: "2025-07-30T09:10:00",
    listService: ["Xét nghiệm máu"],
    total: 500000,
    status: "Chờ thanh toán",
    paymentMethod: "Ví điện tử",
  },
  {
    billCode: "HD004",
    patientName: "Hoàng Minh E",
    crt_at: "2025-07-30T10:10:00",
    listService: ["Khám nội tiết"],
    total: 250000,
    status: "Đã thanh toán",
    paymentMethod: "Tiền mặt",
  },
  {
    billCode: "HD005",
    patientName: "Võ Thị F",
    crt_at: "2025-07-30T10:45:00",
    listService: ["Tai-Mũi-Họng"],
    total: 220000,
    status: "Chờ thanh toán",
    paymentMethod: "Chuyển khoản",
  },
  {
    billCode: "HD006",
    patientName: "Đặng Văn G",
    crt_at: "2025-07-30T11:15:00",
    listService: ["Tư vấn tâm lý"],
    total: 400000,
    status: "Đã thanh toán",
    paymentMethod: "Ví điện tử",
  },
  {
    billCode: "HD007",
    patientName: "Bùi Anh I",
    crt_at: "2025-07-30T13:45:00",
    listService: ["Khám da liễu"],
    total: 270000,
    status: "Chờ thanh toán",
    paymentMethod: "Tiền mặt",
  },
  {
    billCode: "HD008",
    patientName: "Đỗ Thị J",
    crt_at: "2025-07-30T14:10:00",
    listService: ["Khám mắt định kỳ"],
    total: 180000,
    status: "Đã thanh toán",
    paymentMethod: "Chuyển khoản",
  },
  {
    billCode: "HD009",
    patientName: "Phan Văn K",
    crt_at: "2025-07-30T14:45:00",
    listService: ["Khám tổng quát"],
    total: 350000,
    status: "Chờ thanh toán",
    paymentMethod: "Ví điện tử",
  },
  {
    billCode: "HD010",
    patientName: "Đinh Thị L",
    crt_at: "2025-07-30T15:15:00",
    listService: ["Phụ khoa"],
    total: 320000,
    status: "Đã thanh toán",
    paymentMethod: "Tiền mặt",
  },
];

const BillPage = () => {
  const [date, setDate] = useState<Date | null>(null);
  // tìm kiếm theo trạng thái
  
  // hết tìm kiếm theo trạng thái

  // thêm lịch hẹn
  
  // hết thêm lịch hẹn

  return (
    <div className="pt-[10px] pr-[48px] pl-[48px] pb-[24px]">
      {/* filter */}
      <fieldset className="border-1 p-4 rounded-[7px] h-[130px]">
        <legend className="px-2 text-sm mt-1">Filter</legend>
        
        {/* tên, email, sdt, mã số đơn thuốc, ngày khám */}
        <div className="flex">
          <div className="grid grid-cols-2 gap-y-3 gap-x-10">
            <div className="flex items-center">
              <Label label='Tên bệnh nhân'/>
              <Input 
                type="text" 
                placeholder="Nhập tên bệnh nhân"
              />
            </div>
            <div className="flex items-center">
              <Label label='mã đơn thuốc'/>     
              <Input 
                type="text" 
                placeholder="Nhập mã đơn thuốc"
              />
            </div>
            <div className="flex items-center">
              <Label label='Trạng thái thanh toán'/>
              <select
                className="w-[200px] h-[30px] text-[12px] cursor-pointer text-black bg-white focus:outline-none rounded p-2 mr-2"
              >
                <option value="">Tất cả</option>
                <option value="Đang chờ">Đang chờ</option>
                <option value="Đã khám">Đã khám</option>
                <option value="Hủy">Hủy</option>
              </select>
            </div>
            
          </div>
          <div className="ml-10">
            <div className="">
              <Label label='Khoảng ngày tạo' />    
              <DatePicker 
                selected={date}
                onChange={(date: Date | null) => {if (date) setDate(date)}}
                minDate={new Date('2023-01-01')}
                maxDate={new Date()}
                className='w-[200px] h-[30px] text-[12px] cursor-pointer text-black bg-white focus:outline-none rounded p-2 mr-2'
                placeholderText='Chọn ngày'
              />
            </div>
            <div></div>
          </div>
        </div>
      </fieldset>
      {/* button */}
      <div className="mt-[15px]">
        <Button label='Tìm kiếm'/>
        <Button label='Thêm' />
        <Button label='Xóa' />
        <Button label='Sửa' />
      </div>
      {/* table */}
      <div className="mt-5 mb-5">
        <div className="bg-white rounded-lg shadow-sm overflow-y-auto mt-5">
          <p className="p-2 text-lg mb-3">📊 Danh sách <span className="font-bold">Hóa đơn khám bệnh</span></p>
          <div className="max-h-[500px] overflow-y-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-100 text-left">
                <tr className="text-center">
                  <th className="p-3">Mã hóa đơn</th>
                  <th className="p-3">Tên bệnh nhân</th>
                  <th className="p-3">Ngày tạo hóa đơn</th>
                  <th className="p-3">Danh sách dịch vụ khám</th>
                  <th className="p-3">Tổng tiền thanh toán</th>
                  <th className="p-3">Trạng thái</th>
                  <th className="p-3">Hình thức thanh toán</th>
                </tr>
              </thead>
              <tbody>
                {billData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100 text-center">
                    <td className="p-3">{item.billCode}</td>
                    <td className="p-3">{item.patientName}</td>
                    <td className="p-3">{item.crt_at}</td>
                    <td className="p-3">{item.listService}</td>
                    <td className="p-3">{item.total}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-white flex justify-center items-center text-xs font-semibold ${
                          item.status === 'Chờ thanh toán'
                            ? 'bg-yellow-400'
                            : 'bg-green-400'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3">{item.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* hết table */}
      {/* modal */}
      
      {/* hết modal */}
    </div>
  );
}
export default BillPage;