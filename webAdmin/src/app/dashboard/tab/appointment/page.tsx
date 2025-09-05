'use client';

import { useEffect, useState } from "react";
import Button from '@/components/button';
import Input from '@/components/input';
import Label from '@/components/label';
import Select from '@/components/select';
import { getAllAppointments, Appointment } from "../../../../service/appointmentService";

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('all');
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [search, setSearch] = useState({
    appointmentId: "",
    patientId: "",
    patientEmail: "",
    status: ""
  });

  // load dữ liệu khi mở trang
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const data = await getAllAppointments();
        setAppointments(data);
        setFilteredAppointments(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Lỗi không xác định');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);


  //tìm kiếm theo lọc
  const handleSearch = () => {
    const filtered = appointments.filter((a) => {
      return (
        (search.appointmentId === "" || a.appointmentId.includes(search.appointmentId)) &&
        (search.patientId === "" || a.patientId.includes(search.patientId)) &&
        (search.patientEmail === "" || (a.email && a.email.includes(search.patientEmail))) &&
        (search.status === "" || a.appointmentStatus === search.status)
      );
    });
    setFilteredAppointments(filtered);
  }

  return (
    <div className="pt-[10px] pr-[48px] pl-[48px] pb-[24px]">
      {/* filter */}
      <fieldset className="border-1 p-4 rounded-[7px] h-[130px]">
        <legend className="px-2 text-sm mt-1">Filter</legend>
          <div className="flex">
            <div className="grid grid-cols-2 gap-y-3 gap-x-10">
              <div className="flex items-center">
                <Label label="Mã lịch khám"/>
                <Input type="text" placeholder="Nhập mã lịch khám" onChange={(e)=> setSearch({...search, appointmentId: e.target.value})}/>
              </div>
              <div className="flex items-center">
                <Label label="Mã bệnh nhân"/>
                <Input type="text" placeholder="Nhập mã bệnh nhân" onChange={(e) => setSearch({...search, patientId: e.target.value})}/>
              </div>
              <div className="flex items-center">
                <Label className="w-[100px]  text-sm mb-2 mr-2" label="Email bệnh nhân"/>
                <Input type="text" placeholder="Nhập email" onChange={(e) => setSearch({...search, patientEmail: e.target.value})}/>
              </div>
              <div className="flex items-center">
                <Label label="Trạng thái"/>
                <Select
                  label="Tất cả"
                  value={status}
                  onChange={(e) => {setStatus((e.target.value)); setSearch({...search, status: e.target.value})}}
                  option={[
                    {label: 'Chờ xác nhận', value: 'waiting'},
                    {label: 'Đã xác nhận', value: 'confirmed'},
                    {label: 'Đã hủy', value: 'canceled'},
                  ]}
                />
              </div>
            </div>
          </div>
      </fieldset>


      {/* button */}
      <div className="mt-[15px]">
        <Button label="Tìm kiếm" onClick={handleSearch} />
        <Button label="Thêm" />
        <Button label="Xóa" />
        <Button label="Sửa" />
      </div>


      {/* table */}
      <div className="mt-5 mb-3">
        <div className="bg-white rounded-lg shadow-sm overflow-y-auto mt-5">
          <p className="p-2 text-lg mb-3">
            📊 Danh sách <span className="font-bold">lịch khám</span>
          </p>

          {loading && <p className="p-3">Đang tải dữ liệu...</p>}
          {error && <p className="p-3 text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="max-h-[500px] overflow-y-auto scrollbar-thin">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-gray-100 text-left">
                  <tr className="text-center">
                    <th className="p-3">Mã lịch khám</th>
                    <th className="p-3">Ngày khám</th>
                    <th className="p-3">Thời gian</th>
                    <th className="p-3">Bác sĩ phụ trách</th>
                    <th className="p-3">Mã bác sĩ</th>
                    <th className="p-3">Phòng</th>
                    <th className="p-3">Chuyên khoa</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Tên bệnh nhân</th>
                    <th className="p-3">Mã bệnh nhân</th>
                    <th className="p-3">Trạng thái</th>
                    <th className="p-3">Ghi chú</th>
                    <th className="p-3">Ngày tạo</th>
                    <th className="p-3">Ngày thay đổi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((a) => (
                      <tr key={a.appointmentId} className="text-center border-b">
                        <td className="p-3">{a.appointmentId}</td>
                        <td className="p-3">{a.appointmentDate}</td>
                        <td className="p-3">{a.appointmentTime}</td>
                        <td className="p-3">{a.doctorName || "-"}</td>
                        <td className="p-3">{a.doctorId || "-"}</td>
                        <td className="p-3">{a.appointmentRoom}</td>
                        <td className="p-3">{a.specialty}</td>
                        <td className="p-3">{a.email || "-"}</td>
                        <td className="p-3">{a.patientName || "-"}</td>
                        <td className="p-3">{a.patientId}</td>
                        <td className="p-3">{a.appointmentStatus}</td>
                        <td className="p-3">{a.appointmentNote}</td>
                        <td className="p-3">{a.createdAt}</td>
                        <td className="p-3">{a.updateAt}</td>
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
    </div>
  );
};

export default AppointmentPage;
