'use client';

import { useEffect, useState } from "react";
import Button from '@/components/button';
import Input from '@/components/input';
import Label from '@/components/label';
import Select from '@/components/select';
import {
  Appointment,
  AppointmentRequest,
  DoctorOption,
  PatientOption,
  Specialization,
  getAllPatients,
  getAllSpecializations,
  getDoctorsBySpecialization,
  updateAppointment
} from "../../../../../service/appointmentService";

interface EditAppointmentModalProps {
  appointment: Appointment;
  onClose: () => void;
  onSuccess: () => void;
}

const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({ appointment, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    appointmentDate: appointment.appointmentDate,
    appointmentTime: appointment.appointmentTime,
    appointmentRoom: appointment.appointmentRoom,
    appointmentStatus: appointment.appointmentStatus,
    appointmentNote: appointment.appointmentNote || "",
    patientId: String(appointment.patient?.patientId || ""),
    doctorId: String(appointment.doctor?.doctorId || ""),
    specializationId: "",
  });

  const [patients, setPatients] = useState<PatientOption[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [doctors, setDoctors] = useState<DoctorOption[]>([]);

  // Load bệnh nhân
  useEffect(() => {
    getAllPatients().then(setPatients).catch(err => console.error("Lỗi load bệnh nhân:", err));
  }, []);

  // Load chuyên khoa
  useEffect(() => {
    getAllSpecializations().then(setSpecializations).catch(err => console.error("Lỗi load chuyên khoa:", err));
  }, []);

  // Khi chọn chuyên khoa thì load bác sĩ
  const handleSpecializationChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const specializationId = e.target.value;
    setForm({ ...form, specializationId, doctorId: "" });
    if (!specializationId) {
      setDoctors([]);
      return;
    }
    try {
      const data = await getDoctorsBySpecialization(Number(specializationId));
      setDoctors(data);
    } catch {
      setDoctors([]);
    }
  };

  // Khi mở modal, nếu có doctor thì tự set specializationId để load đúng bác sĩ
  useEffect(() => {
    if (appointment.doctor?.doctorSpecialization?.specializationId) {
      const specId = String(appointment.doctor.doctorSpecialization.specializationId);
      setForm(f => ({ ...f, specializationId: specId }));
      getDoctorsBySpecialization(appointment.doctor.doctorSpecialization.specializationId)
        .then(setDoctors)
        .catch(() => setDoctors([]));
    }
  }, [appointment]);

  // Cập nhật
  const handleUpdate = async () => {
    if (!form.patientId || !form.doctorId) {
      alert("Vui lòng chọn bệnh nhân và bác sĩ");
      return;
    }

    const payload: AppointmentRequest = {
      appointmentDate: form.appointmentDate,
      appointmentTime: form.appointmentTime,
      appointmentRoom: form.appointmentRoom,
      appointmentStatus: form.appointmentStatus,
      appointmentNote: form.appointmentNote,
      patientId: Number(form.patientId),
      doctorId: Number(form.doctorId),
    };

    try {
      await updateAppointment(appointment.appointmentId, payload);
      alert("Cập nhật thành công");
      onSuccess();
      onClose();
    } catch {
      alert("Cập nhật thất bại");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px]">
        <h2 className="text-xl font-bold mb-4">✏️ Sửa lịch khám</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label label="Ngày"/>
            <Input type="date" value={form.appointmentDate}
                   onChange={e => setForm({ ...form, appointmentDate: e.target.value })}/>
          </div>
          <div>
            <Label label="Giờ"/>
            <Input type="time" value={form.appointmentTime}
                   onChange={e => setForm({ ...form, appointmentTime: e.target.value })}/>
          </div>
          <div>
            <Label label="Phòng"/>
            <Input type="text" value={form.appointmentRoom}
                   onChange={e => setForm({ ...form, appointmentRoom: e.target.value })}/>
          </div>
          <div>
            <Select
              label="Trạng thái"
              value={form.appointmentStatus}
              onChange={e => setForm({ ...form, appointmentStatus: e.target.value })}
              option={[
                { label: 'Chờ xác nhận', value: 'waiting' },
                { label: 'Đã xác nhận', value: 'confirmed' },
                { label: 'Đã hủy', value: 'canceled' },
              ]}
            />
          </div>
          <div className="col-span-2">
            <Label label="Ghi chú"/>
            <Input type="text" value={form.appointmentNote}
                   onChange={e => setForm({ ...form, appointmentNote: e.target.value })}/>
          </div>
          <div>
            <Label label="Bệnh nhân"/>
            <Select
              label="Chọn bệnh nhân"
              value={form.patientId}
              onChange={e => setForm({ ...form, patientId: e.target.value })}
              option={patients.map(p => ({ label: p.patientName, value: String(p.patientId) }))}
            />
          </div>
          <div>
            <Label label="Chuyên khoa"/>
            <Select
              label="Chọn chuyên khoa"
              value={form.specializationId}
              onChange={handleSpecializationChange}
              option={specializations.map(s => ({ label: s.specializationName, value: String(s.specializationId) }))}
            />
          </div>
          <div>
            <Label label="Bác sĩ"/>
            <Select
              label="Chọn bác sĩ"
              value={form.doctorId}
              onChange={e => setForm({ ...form, doctorId: e.target.value })}
              option={doctors.map(d => ({ label: d.doctorName, value: String(d.doctorId) }))}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button label="Hủy" onClick={onClose}/>
          <Button label="Lưu" onClick={handleUpdate}/>
        </div>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
