'use client';
import { useState } from "react";
import { updatePatient, Patient } from "@/service/patientService";
import Input from "@/components/input";
import Label from "@/components/label";
import Button from "@/components/button";

interface EditPatientModalProps {
  patient: Patient;
  onClose: () => void;
  onSuccess: () => void;
}

const EditPatientModal = ({ patient, onClose, onSuccess }: EditPatientModalProps) => {
  const [formData, setFormData] = useState(patient);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      await updatePatient(formData.patientId, formData);
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
        <h2 className="text-lg font-bold mb-4">✏️ Sửa thông tin bệnh nhân</h2>

        <div className="space-y-3">
          <div className="flex items-center">
            <Label label="Tên bệnh nhân" />
            <Input name="patientName" value={formData.patientName} onChange={handleChange} />
          </div>
          <div className="flex items-center">
            <Label label="Số điện thoại" />
            <Input name="patientPhone" value={formData.patientPhone} onChange={handleChange} />
          </div>
          <div className="flex items-center">
            <Label label="Email" />
            <Input name="patientEmail" value={formData.patientEmail} onChange={handleChange} />
          </div>
          <div className="flex items-center">
            <Label label="Giới tính" />
            <select
              name="patientGender"
              value={formData.patientGender}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>
          <div className="flex items-center">
            <Label label="Ngày sinh" />
            <Input name="patientBirthday" type="date" value={formData.patientBirthday} onChange={handleChange} />
          </div>
          <div className="flex items-center">
            <Label label="Địa chỉ" />
            <Input name="patientAddress" value={formData.patientAddress} onChange={handleChange} />
          </div>
          <div className="flex items-center">
            <Label label="Số BHYT" />
            <Input name="patientInsuranceNumber" value={formData.patientInsuranceNumber} onChange={handleChange} />
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

export default EditPatientModal;
