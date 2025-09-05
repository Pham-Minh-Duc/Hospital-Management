'use client'
import { useState, useEffect } from "react";

import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import AddPatientModal from "./modal/addPatientModal";
import { getAllPatients, Patient } from "../../../../service/patientService";


const PatientPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: ""
  });

  const loadPatients = async () => {
    try {
      setLoading(true);
      const data = await getAllPatients();
      setPatients(data);
      setFilteredPatients(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Lỗi không xác định");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);
  
    //tìm kiếm theo lọc
    const handleSearch = () => {
      const filtered = patients.filter((p) => {
        return (
          (search.patientName === "" || (p.patientName && p.patientName.includes(search.patientName))) &&
          (search.patientPhone === "" || (p.patientPhone && p.patientPhone.includes(search.patientPhone))) &&
          (search.patientEmail === "" || (p.patientEmail && p.patientEmail.includes(search.patientEmail)))
        );
      });
      setFilteredPatients(filtered);
    }

    return (
      <div className="pt-[10px] pr-[48px] pl-[48px] pb-[24px]">
        {/* filter */}
        <fieldset className="border-1 p-4 rounded-[7px] h-[90px]">
          <legend className="px-2 text-sm mt-1">Filter</legend>
          {/* tên, patientEmail, sdt, mã số đơn thuốc, ngày khám */}
          <div className="flex">
            <div className="grid grid-cols-3 gap-y-3 gap-x-10">
              <div className="flex items-center">
                <Label label="Tên bệnh nhân" />
                <Input 
                  type="text" 
                  placeholder="Nhập tên bệnh nhân"
                  onChange={(e) => setSearch({...search, patientName: e.target.value})}  
                />
              </div>
              <div className="flex items-center">
                <Label label="Số điện thoại" />
                <Input 
                  type="text" 
                  placeholder="Nhập số điện thoại"
                  onChange={(e) => setSearch({...search, patientPhone: e.target.value})}  
                />              
              </div>
              <div className="flex items-center">
                <Label label="Email" />
                <Input 
                  type="text" 
                  placeholder="Nhập Email"
                  onChange={(e) => setSearch({...search, patientEmail: e.target.value})}  
                />              
              </div>
            </div>
            <div className="ml-10">
              <div></div>
            </div>
          </div>
        </fieldset>


        {/* button */}
        <div className="mt-[15px]">
          <Button label="Tìm kiếm" onClick={handleSearch}/>
          <Button label="Thêm" onClick={() => setShowModal(true)}/>
          <Button label="Xóa"/>
          <Button label="Sửa"/>
        </div>


        {/* table */}
        <div className="mt-5 mb-3">
          <div className="bg-white rounded-lg shadow-sm overflow-y-auto mt-5">
            <p className="p-2 text-lg mb-3">📊 Danh sách <span className="font-bold">bệnh nhân</span></p>

            {loading && <p className="p-3">Đang tải dữ liệu...</p>}
            {error && <p className="p-3 text-red-500">{error}</p>}

            {!loading && !error && (
            <div className="max-h-[500px] overflow-y-auto scrollbar-thin">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-gray-100 text-left">
                  <tr className="text-center">
                    <th className="p-3">ID bệnh nhân</th>
                    <th className="p-3">Tên bệnh nhân</th>
                    <th className="p-3">Số điện thoại</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Giới tính</th>
                    <th className="p-3">Năm sinh</th>
                    <th className="p-3">Địa chỉ</th>
                    <th className="p-3">BYHT</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.length > 0 ? (
                  filteredPatients.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100 text-center">
                      <td className="p-3">{item.patientId}</td>
                      <td className="p-3">{item.patientName}</td>
                      <td className="p-3">{item.patientPhone}</td>
                      <td className="p-3">{item.patientEmail}</td>
                      <td className="p-3">{item.patientGender}</td>
                      <td className="p-3">{item.patientBirthday}</td>
                      <td className="p-3">{item.patientAddress}</td>
                      <td className="p-3">{item.patientInsuranceNumber}</td>
                    </tr>
                  ))
                  ) : (
                    <tr>
                      <td colSpan={14} className="text-center p-4">
                        Không có bệnh nhân nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            )}
          </div>
        </div>
        {/* hết table */}
        {showModal && (
          <AddPatientModal
            onClose={() => setShowModal(false)}
            onSuccess={loadPatients}
          />
        )}
      </div>
    );
}
export default PatientPage;