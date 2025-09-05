'use client';

import { useState } from "react";
import { createDoctor } from "@/service/doctorService";
import Input from "@/components/input";
import Label from "@/components/label";
import Button from "@/components/button";

interface AddDoctorModalProps {
  onClose: () => void;
  onSuccess: () => void; // callback khi thêm thành công để reload list
}

const AddDoctorModal = ({ onClose, onSuccess }: AddDoctorModalProps) => {
  const [formData, setFormData] = useState({
    doctorName: "",
    doctorGender: "male",
    doctorDob: "",
    doctorPhone: "",
    doctorEmail: "",
    doctorDepartment: "",
    doctorPosition: "",
    doctorQualification: "",
    doctorSpecialization: "",
    doctorExperienceYears: 0,
    doctorStatus: "working"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      await createDoctor(formData);
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
        <h2 className="text-lg font-bold mb-4">➕ Thêm bác sĩ</h2>

        <div className="space-y-3">
          <div className="flex items-center">
            <Label label="Tên bệnh nhân" />
            <Input
              type="text"
              placeholder="Nhập tên bác sĩ"
              value={formData.doctorName}
              onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
            />
          </div>

          <div className="flex items-center">
            <Label label="Số điện thoại" />
            <Input
              type="text"
              placeholder="Nhập số điện thoại"
              value={formData.doctorPhone}
              onChange={(e) => setFormData({ ...formData, doctorPhone: e.target.value })}
            />
          </div>

          <div className="flex items-center">
            <Label label="Email" />
            <Input
              type="email"
              placeholder="Nhập email"
              value={formData.doctorEmail}
              onChange={(e) => setFormData({ ...formData, doctorEmail: e.target.value })}
            />
          </div>

          <div className="flex items-center">
            <Label label="Giới tính" />
            <select
              className="border rounded px-2 py-1"
              value={formData.doctorGender}
              onChange={(e) => setFormData({ ...formData, doctorGender: e.target.value })}
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>

          <div className="flex items-center">
            <Label label="Ngày sinh" />
            <Input
              type="date"
              value={formData.doctorDob}
              onChange={(e) => setFormData({ ...formData, doctorDob: e.target.value })}
            />
          </div>
          <div className="flex items-center">
            <Label label="Khoa" />
            <Input
              type="text"
              placeholder="Nhập khoa"
              value={formData.doctorDepartment}
              onChange={(e) =>
                setFormData({ ...formData, doctorDepartment: e.target.value })
              }
            />
          </div>
          <div className="flex items-center">
            <Label label="Vị trí" />
            <Input
              type="text"
              placeholder="Nhập vị trí"
              value={formData.doctorPosition}
              onChange={(e) =>
                setFormData({ ...formData, doctorPosition: e.target.value })
              }
            />
          </div>
          <div className="flex items-center">
            <Label label="Bằng cấp" />
            <Input
              type="text"
              placeholder="Nhập bằng cấp"
              value={formData.doctorQualification}
              onChange={(e) =>
                setFormData({ ...formData, doctorQualification: e.target.value })
              }
            />
          </div>
          <div className="flex items-center">
            <Label label="Chuyên khoa" />
            <Input
              type="text"
              placeholder="Nhập chuyên khoa"
              value={formData.doctorSpecialization}
              onChange={(e) =>
                setFormData({ ...formData, doctorSpecialization: e.target.value })
              }
            />
          </div>
          <div className="flex items-center">
            <Label label="Số năm kinh nghiệm" />
            <Input
              type="number"
              placeholder="Số năm kinh nghiệm"
              value= {formData.doctorExperienceYears.toString()}
              onChange={(e) =>
                setFormData({ ...formData, doctorExperienceYears: Number(e.target.value) })
              }
            />
          </div>
          <div className="flex items-center">
            <Label label="Trạng thái" />
            <Input
              type="text"
              placeholder="Trạng thái"
              value={formData.doctorStatus}
              onChange={(e) =>
                setFormData({ ...formData, doctorStatus: e.target.value })
              }
              readonly
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

export default AddDoctorModal;
