'use client';

import React, { useState } from "react";

type Service = {
  name: string;
  price: number;
};

type Bill = {
  patientName: string;
  date: string;
  services: Service[];
  total: number;
  status: string;
  note: string;
};

const AddBillForm = () => {
    const [newBill, setNewBill] = useState<Bill>({
        patientName: "", date: "", services: [], total: 0, status: "Chưa thanh toán", note: ""
    });
    const handleAddBill = () => {
    // Thêm hoá đơn vào danh sách
    setBills([...bills, newBill]);
    setShowForm(false);
    };
    return (
        <>
            <div className="bg-white p-6 rounded shadow-md space-y-4">
                <input type="text" placeholder="Tên bệnh nhân" value={newBill.patientName}
                onChange={(e) => setNewBill({ ...newBill, patientName: e.target.value })} className="w-full border rounded p-2" />
                
                <input type="date" value={newBill.date}
                onChange={(e) => setNewBill({ ...newBill, date: e.target.value })} className="w-full border rounded p-2" />

                {/* Dịch vụ đơn giản */}
                <input type="text" placeholder="Dịch vụ (ví dụ: Khám tổng quát - 500000)"
                onChange={(e) => {
                    const [name, price] = e.target.value.split('-');
                    setNewBill({ ...newBill, services: [{ name: name.trim(), price: Number(price) }], total: Number(price) });
                }} className="w-full border rounded p-2" />

                <select value={newBill.status}
                onChange={(e) => setNewBill({ ...newBill, status: e.target.value })} className="w-full border rounded p-2">
                <option value="Chưa thanh toán">Chưa thanh toán</option>
                <option value="Đã thanh toán">Đã thanh toán</option>
                <option value="Đã huỷ">Đã huỷ</option>
                </select>

                <input type="text" placeholder="Ghi chú" value={newBill.note}
                onChange={(e) => setNewBill({ ...newBill, note: e.target.value })} className="w-full border rounded p-2" />

                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddBill}>Lưu hoá đơn</button>
            </div>
        </>
    );
};
export default AddBillForm;