'use client';

import { useEffect, useState } from "react";
import { createDoctor, getAllSpecializations, Specialization } from "@/service/doctorService";
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
    doctorPosition: "",
    doctorQualification: "",
    specializationId: 0, // ✅ dùng specializationId thay vì doctorSpecialization
    doctorExperienceYears: 0,
    doctorStatus: "working",
  });

  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load danh sách chuyên khoa
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const data = await getAllSpecializations();
        setSpecializations(data);
      } catch (err) {
        console.error("Lỗi khi load chuyên khoa:", err);
      }
    };
    fetchSpecializations();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      await createDoctor(formData); // ✅ gửi luôn specializationId
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
            <Label label="Tên bác sĩ" />
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
            <Label label="Vị trí" />
            <Input
              type="text"
              placeholder="Nhập vị trí"
              value={formData.doctorPosition}
              onChange={(e) => setFormData({ ...formData, doctorPosition: e.target.value })}
            />
          </div>

          <div className="flex items-center">
            <Label label="Bằng cấp" />
            <Input
              type="text"
              placeholder="Nhập bằng cấp"
              value={formData.doctorQualification}
              onChange={(e) => setFormData({ ...formData, doctorQualification: e.target.value })}
            />
          </div>

          {/* Dropdown chọn chuyên khoa */}
          <div className="flex items-center">
            <Label label="Chuyên khoa" />
            <select
              className="border rounded px-2 py-1 flex-1"
              value={formData.specializationId}
              onChange={(e) =>
                setFormData({ ...formData, specializationId: Number(e.target.value) })
              }
            >
              <option value={0}>-- Chọn chuyên khoa --</option>
              {specializations.map((sp) => (
                <option key={sp.specializationId} value={sp.specializationId}>
                  {sp.specializationName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <Label label="Số năm kinh nghiệm" />
            <Input
              type="number"
              placeholder="Số năm kinh nghiệm"
              value={formData.doctorExperienceYears.toString()}
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
              readOnly
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
