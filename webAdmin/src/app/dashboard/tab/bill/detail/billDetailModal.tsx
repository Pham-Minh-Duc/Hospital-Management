const BillDetailModal = ({ bill:, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 shadow-lg w-[500px]">
      <h2 className="text-xl font-bold mb-4">Chi tiết hoá đơn</h2>

      <p><strong>Bệnh nhân:</strong> {bill.patientName}</p>
      <p><strong>Mã hoá đơn:</strong> {bill.billId}</p>
      <p><strong>Ngày tạo:</strong> {bill.date}</p>
      <p><strong>Dịch vụ:</strong></p>
      <ul className="ml-4 list-disc">
        {bill.services.map((s, i) => (
          <li key={i}>{s.name} - {s.price}đ</li>
        ))}
      </ul>
      <p><strong>Tổng tiền:</strong> {bill.total.toLocaleString()}đ</p>
      <p><strong>Trạng thái:</strong> {bill.status}</p>
      <p><strong>Ghi chú:</strong> {bill.note}</p>

      <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Đóng</button>
    </div>
  </div>
);
export default BillDetailModal;