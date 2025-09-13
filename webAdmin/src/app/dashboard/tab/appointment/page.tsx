'use client';

import { useEffect, useState } from "react";
import Button from '@/components/button';
import Input from '@/components/input';
import Label from '@/components/label';
import Select from '@/components/select';
import {
  getAllAppointments,
  createAppointment,
  getAllSpecializations,
  getDoctorsBySpecialization,
  Appointment,
  AppointmentRequest,
  Specialization,
  DoctorOption,
  PatientOption,
  getAllPatients
} from "../../../../service/appointmentService";

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState({
    appointmentId: "",
    patientId: "",
    patientEmail: "",
    status: ""
  });
  const [status, setStatus] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [doctors, setDoctors] = useState<DoctorOption[]>([]);
  const [newAppointment, setNewAppointment] = useState({
    appointmentDate: "",
    appointmentTime: "",
    appointmentRoom: "",
    appointmentStatus: "waiting",
    appointmentNote: "",
    patientId: "",
    doctorId: "",
    specializationId: "",
  });
  const [patients, setPatients] = useState<PatientOption[]>([]);

  // Load danh sách lịch khám
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const data = await getAllAppointments();
        setAppointments(data);
        setFilteredAppointments(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Lỗi không xác định");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);
  // Load chuyên khoa
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const data = await getAllSpecializations();
        setSpecializations(data);
      } catch (err) {
        console.error("Lỗi load chuyên khoa:", err);
      }
    };
    fetchSpecializations();
  }, []);
  //load dnah sách bệnh nhân
  useEffect(() => {
  const fetchPatients = async () => {
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch (err) {
      console.error("Lỗi load bệnh nhân:", err);
    }
  };
  fetchPatients();
}, []);

  // Filter
  const handleSearch = () => {
    const filtered = appointments.filter(a =>
      (search.appointmentId === "" || String(a.appointmentId).includes(search.appointmentId)) &&
      (search.patientId === "" || String(a.patient.patientId).includes(search.patientId)) &&
      (search.patientEmail === "" || (a.patient.patientEmail && a.patient.patientEmail.includes(search.patientEmail))) &&
      (search.status === "" || a.appointmentStatus === search.status)
    );
    setFilteredAppointments(filtered);
  };

  const handleOpenAddModal = () => {
    const patientId = localStorage.getItem("patientId") || "";
    setNewAppointment({
      appointmentDate: "",
      appointmentTime: "",
      appointmentRoom: "",
      appointmentStatus: "waiting",
      appointmentNote: "",
      patientId, // luôn lấy từ localStorage
      doctorId: "",
      specializationId: "",
    });
    setDoctors([]);
    setIsOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsOpen(false);
    setDoctors([]);
    setNewAppointment({
      appointmentDate: "",
      appointmentTime: "",
      appointmentRoom: "",
      appointmentStatus: "waiting",
      appointmentNote: "",
      patientId: "",
      doctorId: "",
      specializationId: "",
    });
  };

  // Chọn chuyên khoa
  const handleSpecializationChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const specializationId = e.target.value;
    setNewAppointment({ ...newAppointment, specializationId, doctorId: "" });

    if (!specializationId) {
      setDoctors([]);
      return;
    }

    try {
      const data = await getDoctorsBySpecialization(Number(specializationId));
      console.log("Danh sách bác sĩ theo chuyên khoa:", data);
      setDoctors(data);
    } catch (err) {
      console.error("Lỗi load bác sĩ:", err);
      setDoctors([]);
    }
  };

  // Lưu lịch khám
const handleSaveAppointment = async () => {
  console.log("🟢 Saving appointment (state):", newAppointment);

  // Validate
  if (!newAppointment.patientId) {
    alert("Vui lòng chọn bệnh nhân");
    return;
  }
  if (!newAppointment.doctorId) {
    alert("Vui lòng chọn bác sĩ");
    return;
  }
  if (!newAppointment.appointmentDate || !newAppointment.appointmentTime) {
    alert("Vui lòng chọn ngày và giờ khám");
    return;
  }

  const payload: AppointmentRequest = {
    appointmentDate: newAppointment.appointmentDate,
    appointmentTime: newAppointment.appointmentTime,
    appointmentRoom: newAppointment.appointmentRoom,
    appointmentStatus: newAppointment.appointmentStatus,
    appointmentNote: newAppointment.appointmentNote,
    patientId: Number(newAppointment.patientId),
    doctorId: Number(newAppointment.doctorId),
  };

  console.log("📤 Payload gửi lên server:", payload);

  try {
    await createAppointment(payload); // đảm bảo bạn import createAppointment
    // reload danh sách
    const updated = await getAllAppointments();
    setAppointments(updated);
    setFilteredAppointments(updated);

    // reset form (dùng functional update để không bỏ lỡ trường nào)
    setNewAppointment(prev => ({
      ...prev,
      appointmentDate: "",
      appointmentTime: "",
      appointmentRoom: "",
      appointmentStatus: "waiting",
      appointmentNote: "",
      patientId: localStorage.getItem("patientId") || "",
      doctorId: "",
      specializationId: "",
    }));

    setIsOpen(false); // đóng modal nếu muốn
    alert("Tạo lịch khám thành công");
  } catch (error) {
    console.error("❌ Lỗi khi tạo lịch khám:", error);
    alert("Lỗi khi lưu lịch khám");
  }
};



  return (
    <div className="pt-2 px-12 pb-6">
      {/* Filter */}
      <fieldset className="border p-4 rounded h-[130px]">
        <legend className="px-2 text-sm mt-1">Filter</legend>
        <div className="grid grid-cols-2 gap-y-3 gap-x-10">
          <div className="flex items-center">
            <Label label="Mã lịch khám"/>
            <Input type="text" placeholder="Nhập mã lịch khám" onChange={e => setSearch({ ...search, appointmentId: e.target.value })}/>
          </div>
          <div className="flex items-center">
            <Label label="Mã bệnh nhân"/>
            <Input type="text" placeholder="Nhập mã bệnh nhân" onChange={e => setSearch({ ...search, patientId: e.target.value })}/>
          </div>
          <div className="flex items-center">
            <Label label="Email bệnh nhân" className="w-[100px]"/>
            <Input type="text" placeholder="Nhập email" onChange={e => setSearch({ ...search, patientEmail: e.target.value })}/>
          </div>
          <div className="flex items-center">
            <Label label="Trạng thái"/>
            <Select
              label="Tất cả"
              value={status}
              onChange={e => { setStatus(e.target.value); setSearch({ ...search, status: e.target.value }); }}
              option={[
                { label: 'Chờ xác nhận', value: 'waiting' },
                { label: 'Đã xác nhận', value: 'confirmed' },
                { label: 'Đã hủy', value: 'canceled' },
              ]}
            />
          </div>
        </div>
      </fieldset>

      {/* Buttons */}
      <div className="mt-4 flex gap-2">
        <Button label="Tìm kiếm" onClick={handleSearch}/>
        <Button label="Thêm" onClick={handleOpenAddModal}/>
        <Button label="Xóa"/>
        <Button label="Sửa"/>
      </div>

      {/* Table */}
      <div className="mt-5 bg-white rounded-lg shadow overflow-y-auto max-h-[500px]">
        <p className="p-2 text-lg font-bold">📊 Danh sách lịch khám</p>
        {loading && <p className="p-3">Đang tải dữ liệu...</p>}
        {error && <p className="p-3 text-red-500">{error}</p>}

        {!loading && !error && (
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-100">
              <tr className="text-center">
                <th className="p-3">Mã lịch khám</th>
                <th className="p-3">Ngày khám</th>
                <th className="p-3">Thời gian</th>
                <th className="p-3">Bác sĩ</th>
                <th className="p-3">Mã bác sĩ</th>
                <th className="p-3">Phòng</th>
                <th className="p-3">Chuyên khoa</th>
                <th className="p-3">Email bệnh nhân</th>
                <th className="p-3">Tên bệnh nhân</th>
                <th className="p-3">Mã bệnh nhân</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3">Ghi chú</th>
                <th className="p-3">Ngày tạo</th>
                <th className="p-3">Ngày thay đổi</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? filteredAppointments.map(a => (
                <tr key={a.appointmentId} className="text-center border-b">
                  <td className="p-3">{a.appointmentId}</td>
                  <td className="p-3">{a.appointmentDate}</td>
                  <td className="p-3">{a.appointmentTime}</td>
                  <td className="p-3">{a.doctor.doctorName || "-"}</td>
                  <td className="p-3">{a.doctor.doctorId || "-"}</td>
                  <td className="p-3">{a.appointmentRoom}</td>
                  <td className="p-3">{a.doctor?.doctorSpecialization?.specializationName || "Chưa có chuyên khoa"}</td>
                  <td className="p-3">{a.patient.patientEmail || "-"}</td>
                  <td className="p-3">{a.patient.patientName || "-"}</td>
                  <td className="p-3">{a.patient.patientId}</td>
                  <td className="p-3">{a.appointmentStatus}</td>
                  <td className="p-3">{a.appointmentNote}</td>
                  <td className="p-3">{a.createdAt}</td>
                  <td className="p-3">{a.updateAt}</td>
                </tr>
              )) : (
                <tr><td colSpan={14} className="text-center p-4">Không có lịch khám nào</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal thêm lịch khám */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h2 className="text-lg font-bold mb-4">Thêm lịch khám</h2>
            <div className="space-y-3">
              <Input type="date" value={newAppointment.appointmentDate} onChange={e => setNewAppointment({ ...newAppointment, appointmentDate: e.target.value })}/>
              <Input type="time" value={newAppointment.appointmentTime} onChange={e => setNewAppointment({ ...newAppointment, appointmentTime: e.target.value })}/>
              <Input type="text" placeholder="Phòng khám" value={newAppointment.appointmentRoom} onChange={e => setNewAppointment({ ...newAppointment, appointmentRoom: e.target.value })}/>
              <Input type="text" placeholder="Ghi chú" value={newAppointment.appointmentNote} onChange={e => setNewAppointment({ ...newAppointment, appointmentNote: e.target.value })}/>
              {/* Bệnh nhân */}
              <Select
                label="Bệnh nhân"
                value={newAppointment.patientId}
                onChange={e => setNewAppointment({ ...newAppointment, patientId: e.target.value })}
                option={[
                  { label: "Chọn bệnh nhân", value: "" },
                  ...patients.map(p => ({
                    label: `${p.patientName} (ID: ${p.patientId})`,
                    value: p.patientId
                  }))
                ]}
              />
              {/* Chuyên khoa */}
              <Select
                label="Chuyên khoa"
                value={newAppointment.specializationId}
                onChange={handleSpecializationChange}
                option={[
                  { label: "Chọn chuyên khoa", value: "" },
                  ...specializations.map(s => ({ label: s.specializationName, value: String(s.specializationId) }))
                ]}
              />

              {/* Bác sĩ */}
              <Select
                label="Bác sĩ"
                value={newAppointment.doctorId || ""}
                onChange={e => {
                  console.log("Chọn bác sĩ:", e.target.value); // debug
                  setNewAppointment({ ...newAppointment, doctorId: e.target.value });
                }}
                option={[
                  { label: "Chọn bác sĩ", value: "" },
                  ...doctors.map(d => ({
                    label: `${d.doctorName} (ID: ${d.doctorId})`, // hiển thị cả ID để chắc chắn
                    value: String(d.doctorId)
                  }))
                ]}
              />


              {/* Trạng thái */}
              <Select
                label="Trạng thái"
                value={newAppointment.appointmentStatus}
                onChange={e => setNewAppointment({ ...newAppointment, appointmentStatus: e.target.value })}
                option={[
                  { label: 'Chờ xác nhận', value: 'waiting' },
                  { label: 'Đã xác nhận', value: 'confirmed' },
                  { label: 'Đã hủy', value: 'canceled' },
                ]}
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button label="Hủy" onClick={handleCloseAddModal}/>
              <Button label="Lưu" onClick={handleSaveAppointment}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
