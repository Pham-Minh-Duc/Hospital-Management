
type ScheduleItem = {
  time: string;
  patient: string;
  type: string;
  status: string;
  description: string;
};

type Props = {
  item: ScheduleItem;
  onClose: () => void;
};


const ScheduleDetailModal = ({ item, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ❌
        </button>
        <h3 className="text-lg font-bold mb-3">📋 Chi tiết lịch hẹn</h3>
        <p><b>Thời gian:</b> {item.time}</p>
        <p><b>Bệnh nhân:</b> {item.patient}</p>
        <p><b>Loại khám:</b> {item.type}</p>
        <p>
          <b>Trạng thái:</b>{' '}
          {item.status === 'done' ? '✅ Đã khám' : item.status === 'pending' ? '⏳ Đang chờ' : '❌ Hủy'}
        </p>
        <p className="mt-2 text-gray-600 text-sm">{item.description}</p>
      </div>
    </div>
  );
};

export default ScheduleDetailModal;