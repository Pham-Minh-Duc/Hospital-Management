'use client';

import { useState } from "react";
import { createPatient } from "@/service/patientService";
import Input from "@/components/input";
import Label from "@/components/label";
import Button from "@/components/button";

interface AddPatientModalProps {
  onClose: () => void;
  onSuccess: () => void; // callback khi thêm thành công để reload list
}

const AddPatientModal = ({ onClose, onSuccess }: AddPatientModalProps) => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    patientGender: "male",
    patientBirthday: "",
    patientAddress: "",
    patientInsuranceNumber: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      await createPatient(formData);
      onSuccess();
      onClose();
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[500px]">
        <h2 className="text-lg font-bold mb-4">➕ Thêm bệnh nhân</h2>

        <div className="space-y-3">
          <div className="flex items-center">
            <Label label="Tên bệnh nhân" />
            <Input
              type="text"
              placeholder="Nhập tên bệnh nhân"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
            />
          </div>

          <div className="flex items-center">
            <Label label="Số điện thoại" />
            <Input
              type="text"
              placeholder="Nhập số điện thoại"
              value={formData.patientPhone}
              onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
            />
          </div>

          <div className="flex items-center">
            <Label label="Email" />
            <Input
              type="email"
              placeholder="Nhập email"
              value={formData.patientEmail}
              onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
            />
          </div>

          <div className="flex items-center">
            <Label label="Giới tính" />
            <select
              className="border rounded px-2 py-1"
              value={formData.patientGender}
              onChange={(e) => setFormData({ ...formData, patientGender: e.target.value })}
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>

          <div className="flex items-center">
            <Label label="Ngày sinh" />
            <Input
              type="date"
              value={formData.patientBirthday}
              onChange={(e) => setFormData({ ...formData, patientBirthday: e.target.value })}
            />
          </div>

          <div className="flex items-center">
            <Label label="Địa chỉ" />
            <Input
              type="text"
              placeholder="Nhập địa chỉ"
              value={formData.patientAddress}
              onChange={(e) => setFormData({ ...formData, patientAddress: e.target.value })}
            />
          </div>

          <div className="flex items-center">
            <Label label="Số BHYT" />
            <Input
              type="text"
              placeholder="Nhập số BHYT"
              value={formData.patientInsuranceNumber}
              onChange={(e) =>
                setFormData({ ...formData, patientInsuranceNumber: e.target.value })
              }
            />
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

export default AddPatientModal;
