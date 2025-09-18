'use client';

import { useEffect, useState } from "react";
import Button from '@/components/button';
import Input from '@/components/input';
import Label from '@/components/label';
import Select from '@/components/select';
import {
  getAllAppointments,
  createAppointment,
  deleteAppointment,
  Appointment,
  AppointmentRequest,
  Specialization,
  DoctorOption,
  PatientOption,
  getAllPatients,
  getAllSpecializations,
  getDoctorsBySpecialization
} from "../../../../service/appointmentService";
import EditAppointmentModal from '@/app/dashboard/tab/appointment/modal/editAppointmentModal';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState({ appointmentId: "", patientId: "", patientEmail: "", status: "" });

  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [doctors, setDoctors] = useState<DoctorOption[]>([]);
  const [patients, setPatients] = useState<PatientOption[]>([]);

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

  const [isOpen, setIsOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Load danh sách lịch khám
  const loadAppointments = async () => {
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

  useEffect(() => { loadAppointments(); }, []);

  // Load chuyên khoa
  useEffect(() => {
    getAllSpecializations()
      .then(setSpecializations)
      .catch(err => console.error("Lỗi load chuyên khoa:", err));
  }, []);

  // Load bệnh nhân
  useEffect(() => {
    getAllPatients()
      .then(setPatients)
      .catch(err => console.error("Lỗi load bệnh nhân:", err));
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

  // Xóa lịch khám
  const handleDelete = async (appointmentId: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa lịch khám này?")) return;
    try {
      await deleteAppointment(appointmentId);
      alert("Xóa lịch khám thành công");
      await loadAppointments();
    } catch (e) {
      alert("Xóa lịch khám thất bại: " + e);
    }
  };

  // Thêm lịch khám
  const handleSaveAppointment = async () => {
    if (!newAppointment.patientId || !newAppointment.doctorId) {
      alert("Vui lòng chọn bệnh nhân và bác sĩ");
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
    try {
      await createAppointment(payload);
      await loadAppointments();
      setIsOpen(false);
      alert("Tạo lịch khám thành công");
    } catch {
      alert("Lỗi khi tạo lịch khám");
    }
  };

  // Chọn chuyên khoa
  const handleSpecializationChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const specializationId = e.target.value;
    setNewAppointment({ ...newAppointment, specializationId, doctorId: "" });
    if (!specializationId) { setDoctors([]); return; }
    try {
      const data = await getDoctorsBySpecialization(Number(specializationId));
      setDoctors(data);
    } catch {
      setDoctors([]);
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
            <Input type="text" onChange={e => setSearch({ ...search, appointmentId: e.target.value })}/>
          </div>
          <div className="flex items-center">
            <Label label="Mã bệnh nhân"/>
            <Input type="text" onChange={e => setSearch({ ...search, patientId: e.target.value })}/>
          </div>
          <div className="flex items-center">
            <Label label="Email bệnh nhân"/>
            <Input type="text" onChange={e => setSearch({ ...search, patientEmail: e.target.value })}/>
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
        <Button label="Thêm" onClick={() => setIsOpen(true)}/>
        <Button label={deleteMode ? "Thoát xóa" : "Xóa"} onClick={() => setDeleteMode(!deleteMode)}/>
        <Button label={editMode ? "Thoát sửa" : "Sửa"} onClick={() => setEditMode(!editMode)}/>
        <Button label="Tải lại" onClick={loadAppointments}/>
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
                {deleteMode && <th className="p-3"></th>}
                <th className="p-3">Mã lịch khám</th>
                <th className="p-3">Ngày</th>
                <th className="p-3">Giờ</th>
                <th className="p-3">Bác sĩ</th>
                <th className="p-3">Bệnh nhân</th>
                <th className="p-3">Phòng</th>
                <th className="p-3">Trạng thái</th>
                {editMode && <th className="p-3"></th>}
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map(a => (
                <tr key={a.appointmentId} className="text-center border-b hover:bg-gray-100">
                  {deleteMode && (
                    <td
                      className="p-3 text-red-500 cursor-pointer"
                      onClick={() => handleDelete(a.appointmentId)}
                    >❌</td>
                  )}
                  <td className="p-3">{a.appointmentId}</td>
                  <td className="p-3">{a.appointmentDate}</td>
                  <td className="p-3">{a.appointmentTime}</td>
                  <td className="p-3">{a.doctor?.doctorName}</td>
                  <td className="p-3">{a.patient?.patientName}</td>
                  <td className="p-3">{a.appointmentRoom}</td>
                  <td className="p-3">{a.appointmentStatus}</td>
                  {editMode && (
                    <td
                      className="p-3 cursor-pointer"
                      onClick={() => {
                        setSelectedAppointment(a);
                        setShowEditModal(true);
                      }}
                    >✏️</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal sửa */}
      {showEditModal && selectedAppointment && (
        <EditAppointmentModal
          appointment={selectedAppointment}
          onClose={() => setShowEditModal(false)}
          onSuccess={loadAppointments}
        />
      )}

      {/* Modal thêm */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[600px]">
            <h2 className="text-xl font-bold mb-4">➕ Thêm lịch khám</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label label="Ngày"/>
                <Input type="date" value={newAppointment.appointmentDate}
                       onChange={e => setNewAppointment({ ...newAppointment, appointmentDate: e.target.value })}/>
              </div>
              <div>
                <Label label="Giờ"/>
                <Input type="time" value={newAppointment.appointmentTime}
                       onChange={e => setNewAppointment({ ...newAppointment, appointmentTime: e.target.value })}/>
              </div>
              <div>
                <Label label="Phòng"/>
                <Input type="text" value={newAppointment.appointmentRoom}
                       onChange={e => setNewAppointment({ ...newAppointment, appointmentRoom: e.target.value })}/>
              </div>
              <div>
                <Label label="Trạng thái"/>
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
              <div className="col-span-2">
                <Label label="Ghi chú"/>
                <Input type="text" value={newAppointment.appointmentNote}
                       onChange={e => setNewAppointment({ ...newAppointment, appointmentNote: e.target.value })}/>
              </div>
              <div>
                <Label label="Bệnh nhân"/>
                <Select
                  label="Chọn bệnh nhân"
                  value={newAppointment.patientId}
                  onChange={e => setNewAppointment({ ...newAppointment, patientId: e.target.value })}
                  option={patients.map(p => ({ label: p.patientName, value: String(p.patientId) }))}
                />
              </div>
              <div>
                <Label label="Chuyên khoa"/>
                <Select
                  label="Chọn chuyên khoa"
                  value={newAppointment.specializationId}
                  onChange={handleSpecializationChange}
                  option={specializations.map(s => ({ label: s.specializationName, value: String(s.specializationId) }))}
                />
              </div>
              <div>
                <Label label="Bác sĩ"/>
                <Select
                  label="Chọn bác sĩ"
                  value={newAppointment.doctorId}
                  onChange={e => setNewAppointment({ ...newAppointment, doctorId: e.target.value })}
                  option={doctors.map(d => ({ label: d.doctorName, value: String(d.doctorId) }))}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button label="Hủy" onClick={() => setIsOpen(false)}/>
              <Button label="Lưu" onClick={handleSaveAppointment}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
