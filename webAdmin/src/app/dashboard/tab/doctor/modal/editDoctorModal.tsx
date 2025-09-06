'use client';
import { useState } from "react";
import Input from "@/components/input";
import Label from "@/components/label";
import Button from "@/components/button";
import { updateDoctor, Doctor } from "@/service/doctorService";

interface EditDoctorModalProps {
  doctor: Doctor;
  onClose: () => void;
  onSuccess: () => void;
}

const EditDoctorModal = ({ doctor, onClose, onSuccess }: EditDoctorModalProps) => {
  const [formData, setFormData] = useState(doctor);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      await updateDoctor(formData.doctorId, formData);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[500px]">
        <h2 className="text-lg font-bold mb-4">🩺 Sửa thông tin bác sĩ</h2>

        <div className="space-y-3">
          <div className="flex items-center">
            <Label label="Tên bác sĩ" />
            <Input name="doctorName" value={formData.doctorName} onChange={handleChange} />
          </div>
          <div className="flex items-center">
            <Label label="Giới tính" />
            <select
              name="doctorGender"
              value={formData.doctorGender}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>
          <div className="flex items-center">
            <Label label="Ngày sinh" />
            <Input name="doctorDob" type="date" value={formData.doctorDob} onChange={handleChange} />
          </div>
          <div className="flex items-center">
            <Label label="Số điện thoại" />
            <Input name="doctorPhone" value={formData.doctorPhone} onChange={handleChange} />
          </div>
          <div className="flex items-center">
            <Label label="Email" />
            <Input name="doctorEmail" value={formData.doctorEmail} onChange={handleChange} />
          </div>
          <div className="flex items-center">
            <Label label="Khoa" />
            <Input name="doctorDepartment" value={formData.doctorDepartment} onChange={handleChange} />
          </div>
          <div className="flex items-center">
            <Label label="Chức vụ" />
            <Input name="doctorPosition" value={formData.doctorPosition} onChange={handleChange} />
          </div>
          <div className="flex items-center">
            <Label label="Trình độ chuyên môn" />
            <Input name="doctorQualification" value={formData.doctorQualification} onChange={handleChange} />
          </div>
          <div className="flex items-center">
            <Label label="Chuyên khoa" />
            <Input name="doctorSpecialization" value={formData.doctorSpecialization} onChange={handleChange} />
          </div>
          <div className="flex items-center">
            <Label label="Trạng thái" />
            <Input name="doctorStatus" value={formData.doctorStatus} onChange={handleChange} />
          </div>
          <div className="flex items-center">
            <Label label="Số năm kinh nghiệm" />
            <Input name="doctorExperienceYears" type="number" value={formData.doctorExperienceYears.toString()} onChange={handleChange} />
          </div>
        </div>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <Button label="Hủy" onClick={onClose} />
          <Button label={loading ? "Đang lưu..." : "Lưu"} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default EditDoctorModal;