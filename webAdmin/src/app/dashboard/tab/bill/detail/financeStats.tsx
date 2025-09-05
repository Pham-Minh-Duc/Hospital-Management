const FinanceStats = ({ bills }) => {
  const total = bills.reduce((sum, b) => sum + b.total, 0);
  const paid = bills.filter(b => b.status === "Đã thanh toán").length;
  const pending = bills.filter(b => b.status === "Chưa thanh toán").length;
  const canceled = bills.filter(b => b.status === "Đã huỷ").length;

  return (
    <div className="grid grid-cols-3 gap-6 bg-white p-5 rounded shadow-sm mt-4">
      <div><span className="font-bold">Tổng hoá đơn:</span> {bills.length}</div>
      <div><span className="font-bold">Đã thanh toán:</span> {paid}</div>
      <div><span className="font-bold">Chưa thanh toán:</span> {pending}</div>
      <div><span className="font-bold">Đã huỷ:</span> {canceled}</div>
      <div className="col-span-3"><span className="font-bold">Tổng doanh thu:</span> {total.toLocaleString()}đ</div>
    </div>
  );
};
export default FinanceStats;