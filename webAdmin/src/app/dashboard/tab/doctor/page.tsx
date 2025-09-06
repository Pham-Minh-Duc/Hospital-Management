'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/button'
import Input from '@/components/input'
import Label from '@/components/label';
import Select from '@/components/select';
import AddDoctorModal from './modal/addDoctorModal';
import EditDoctorModal from './modal/editDoctorModal';
import { getAllDoctors, deleteDoctor, Doctor } from '../../../../service/doctorService';

const DoctorPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState({
    doctorName: "",
    doctorSpecial: "",
    doctorEmail: "",
    status: ""
  });

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const data = await getAllDoctors();
      setDoctors(data);
      setFilteredDoctors(data);
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
    loadDoctors();
  }, []);


  const statusLabels: Record<string, string> = {
    working: "Đang làm việc",
    layoff: "Nghỉ việc",
  };

  //tìm kiếm theo lọc
  const handleSearch = () => {
    const filtered = doctors.filter((d) => {
      return (
        (search.doctorName === "" || d.doctorName.includes(search.doctorName)) &&
        (search.doctorSpecial === "" || d.doctorSpecialization.includes(search.doctorSpecial)) &&
        (search.doctorEmail === "" || (d.doctorEmail && d.doctorEmail.includes(search.doctorEmail))) &&
        (search.status === "" || d.doctorStatus === search.status)
      );
    });
    setFilteredDoctors(filtered);
  }

  //xóa bác sĩ
  const handleDelete = async (doctorId: string) => {
    if(!confirm("Bạn có chắc chắn muốn xóa bác sĩ này?")) return;
    try{
      await deleteDoctor(doctorId);
      alert("Xóa bác sĩ thành công");
      await loadDoctors();
    }
    catch(e){
      alert("Xóa bác sĩ thất bại" + e);
    }
  }


  return (
    <div className="pt-[10px] pr-[48px] pl-[48px] pb-[24px]">
      {/* filter */}
      <fieldset className="border-1 p-4 rounded-[7px] h-[130px]">
        <legend className="px-2 text-sm mt-1">Filter</legend>
        
        {/* tên, email, sdt, mã số đơn thuốc, ngày khám */}
        <div className="flex">
          <div className="grid grid-cols-2 gap-y-3 gap-x-10">
            <div className="flex items-center">
              <Label className="w-[100px] text-sm mb-2 mr-2" label='Tên bác sĩ'/>
              <Input type="text" placeholder="Nhập tên bác sĩ" onChange={(e) => setSearch({...search, doctorName: e.target.value}) }/>
            </div>
            <div className="flex items-center">
              <Label className="w-[100px] text-sm mb-2 mr-2" label='Chuyên khoa'/> 
              <Input type="text" placeholder="Nhập chuyên khoa" onChange={(e) => setSearch({...search, doctorSpecial: e.target.value})}/>
            </div>
            <div className="flex items-center">
              <Label className="w-[100px]  text-sm mb-2 mr-2" label='Email'/>
              <Input type="text" placeholder="Nhập email" onChange={(e) => setSearch({...search, doctorEmail: e.target.value})}/>
            </div>
            <div className="flex items-center">
              <Label className="w-[100px] text-sm mb-2 mr-2" label='Trạng thái'/> 
              <Select
                label="Tất cả"
                value={status}
                onChange={(e) => {setStatus(e.target.value); setSearch({...search, status: e.target.value})}}
                option={[
                  {label: 'Đang làm việc', value: 'working'},
                  {label: 'Đã nghỉ việc', value: 'layoff'},
                ]}
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
        <Button label={deleteMode ? "Thoát xóa" : "Xóa"} onClick={() => setDeleteMode(!deleteMode)}/>
        <Button label={editMode ? "Thoát sửa" : "Sửa"} onClick={() => setEditMode(!editMode)}/>
      </div>
      {/* table */}
      <div className="mt-5">
        <div className="bg-white rounded-lg shadow-sm overflow-y-auto mt-5">
          <p className="p-2 text-lg mb-3">
            📊 Danh sách <span className="font-bold">bác sĩ</span>
          </p>

          {loading && <p className="p-3">Đang tải dữ liệu...</p>}
          {error && <p className="p-3 text-red-500">{error}</p>}

          {!loading && !error && (
          <div className="max-h-[500px] overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-100 text-left">
                <tr className="text-center">
                  {deleteMode && <th className="p-3"></th>}
                  <th className="p-3">Mã bác sĩ</th>
                  <th className="p-3">Họ tên</th>
                  <th className="p-3">Giới tính</th>
                  <th className="p-3">Ngày sinh</th>
                  <th className="p-3">SĐT</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Khoa chuyên môn</th>
                  <th className="p-3">Chức vụ</th>
                  <th className="p-3">Học vị</th>
                  <th className="p-3">Chuyên ngành</th>
                  <th className="p-3">Kinh nghiệm (năm)</th>
                  <th className="p-3">Trạng thái</th>
                  {editMode && <th className="p-3"></th>}
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((item) => (
                    <tr key={item.doctorId} className="border-b hover:bg-gray-100 text-center">
                      {deleteMode && (
                          <td
                            className="p-3 text-red-500 cursor-pointer hover:font-bold"
                            onClick={() => handleDelete(item.doctorId)}
                          >
                            ❌
                          </td>
                        )}
                      <td className="p-3">{item.doctorId}</td>
                      <td className="p-3">{item.doctorName}</td>
                      <td className="p-3">{item.doctorGender}</td>
                      <td className="p-3">{item.doctorDob}</td>
                      <td className="p-3">{item.doctorPhone}</td>
                      <td className="p-3">{item.doctorEmail}</td>
                      <td className="p-3">{item.doctorDepartment}</td>
                      <td className="p-3">{item.doctorPosition}</td>
                      <td className="p-3">{item.doctorQualification}</td>
                      <td className="p-3">{item.doctorSpecialization}</td>
                      <td className="p-3">{item.doctorExperienceYears}</td>
                      <td className="p-3">{statusLabels[item.doctorStatus] || item.doctorStatus}</td>
                      {editMode && (
                      <td className="p-3"
                        onClick={() => {
                          setSelectedDoctor(item); // lưu bệnh nhân được chọn
                          setShowEditModal(true);   // mở modal
                        }}>✏️
                      </td>
                    )}
                    </tr>
                  ))
                ) : (
                    <tr>
                      <td colSpan={14} className="text-center p-4">
                        Không có lịch khám nào
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
          )}
        </div>
      </div>
      {showModal && (
          <AddDoctorModal
            onClose={() => setShowModal(false)}
            onSuccess={loadDoctors}
          />
        )}
      {showEditModal && selectedDoctor && (
        <EditDoctorModal
          doctor={selectedDoctor}
          onClose={() => setShowEditModal(false)}
          onSuccess={loadDoctors}
        />
      )}
    </div>
  );
}
export default DoctorPage;