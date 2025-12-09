# 🏥 Hospital Management System (Hệ thống Quản lý Bệnh viện)

Dự án này là một nền tảng quản lý y tế toàn diện, được xây dựng trên kiến trúc **Microservice** hiện đại. Hệ thống được thiết kế để số hóa và tối ưu hóa các quy trình cốt lõi của bệnh viện/phòng khám, bao gồm quản lý hồ sơ bệnh nhân, lịch hẹn, hồ sơ bác sĩ, và giao tiếp theo thời gian thực.

## 🚀 Tính năng nổi bật

### Backend (Dịch vụ Lõi)

* **Kiến trúc Microservice:** Thiết kế phân tán, cho phép mở rộng và bảo trì độc lập từng dịch vụ (ví dụ: Service Bệnh nhân, Service Lịch hẹn, Service ).
* **Quản lý Lịch hẹn:** Hệ thống đặt lịch hẹn y tế đầy đủ tính năng.
* **Quản lý Hồ sơ:** Quản lý chi tiết hồ sơ bệnh nhân và hồ sơ bác sĩ với đầy đủ chức năng CRUD.
* **Thông báo & Chat Real-time:** Triển khai **WebSocket** để hỗ trợ tính năng thông báo và trò chuyện trực tiếp giữa Quản trị viên và Bệnh nhân(Đang triển khai).
* **Tích hợp & Giao tiếp:** Sử dụng **Eureka** cho khám phá dịch vụ và **API Gateway** cho định tuyến yêu cầu tập trung.

### Frontend (Giao diện Người dùng)

* **Admin Dashboard:** Giao diện quản trị viên chuyên nghiệp, được xây dựng bằng **React/Next.js**, cung cấp cái nhìn tổng quan và khả năng kiểm soát toàn bộ hệ thống.
* **Ứng dụng Di động (Mobile App):** Ứng dụng dành cho bệnh nhân được phát triển bằng **React Native**, đảm bảo trải nghiệm người dùng mượt mà và trực quan trên các thiết bị di động.
* **Khả năng Mở rộng:** Hệ thống được xây dựng để sẵn sàng triển khai thực tế trong môi trường phòng khám hoặc cơ sở chăm sóc sức khỏe.

## 🛠️ Công nghệ sử dụng

| Lĩnh vực | Công nghệ | Chi tiết |
| :--- | :--- | :--- |
| **Backend & Kiến trúc** | Java Spring Boot, Microservice | Ngôn ngữ và Framework chính. |
| | API Gateway, Eureka | Quản lý định tuyến và Khám phá dịch vụ. |
| | WebClient, WebSocket | Giao tiếp giữa các dịch vụ và kết nối Real-time. |
| **Cơ sở dữ liệu** | MySQL | Quản lý dữ liệu quan trọng (hồ sơ, lịch hẹn, v.v.). |
| **Frontend Web (Admin)** | React, Next.js, TypeScript | Thư viện và Framework tạo giao diện hiệu suất cao. |
| | Tailwind CSS | Utility-first CSS Framework cho UI đáp ứng. |
| **Frontend Mobile (Bệnh nhân)** | React Native | Phát triển ứng dụng đa nền tảng. |

## ⚙️ Hướng dẫn Cài đặt và Chạy dự án

Để chạy dự án này trên môi trường cục bộ, bạn cần thiết lập các thành phần sau:

### 1. Yêu cầu Tiên quyết

* Java Development Kit (JDK) 17+
* Node.js và npm/yarn
* MySQL Server
* Công cụ quản lý Cơ sở dữ liệu (ví dụ: DBeaver, MySQL Workbench)

### 2. Thiết lập Backend (Microservices)

1.  **Tạo CSDL:** Tạo cơ sở dữ liệu `hospital_db` trên MySQL và cập nhật thông tin kết nối trong file `application.yml` của mỗi Service (Repository).
2.  **Clone Repository:**
    ```bash
    git clone [LINK_REPOSITORY_CỦA_BẠN]
    cd hospital-management-system/backend
    ```
3.  **Khởi động các Service:** Khởi động lần lượt các dịch vụ theo thứ tự:
    * `Eureka Server`
    * `API Gateway`
    * Các Service nghiệp vụ (Ví dụ: `patient-service`, `appointment-service`, v.v.)
    * Sử dụng IDE (IntelliJ IDEA) hoặc câu lệnh Maven/Gradle để chạy từng Service.

### 3. Thiết lập Frontend (Web Admin)

1.  **Chuyển đến thư mục web:**
    ```bash
    cd ../frontend/web-admin # (hoặc đường dẫn tương ứng)
    ```
2.  **Cài đặt dependencies:**
    ```bash
    npm install  # hoặc yarn install
    ```
3.  **Chạy ứng dụng:**
    ```bash
    npm run dev  # hoặc yarn dev
    ```
    Ứng dụng sẽ chạy tại `http://localhost:3000` (mặc định của Next.js).

### 4. Thiết lập Frontend (Mobile App - Tùy chọn)

1.  **Chuyển đến thư mục mobile:**
    ```bash
    cd ../mobile-app # (hoặc đường dẫn tương ứng)
    ```
2.  **Cài đặt dependencies:**
    ```bash
    npm install  # hoặc yarn install
    ```
3.  **Chạy ứng dụng:** Tham khảo tài liệu React Native để chạy trên trình giả lập hoặc thiết bị vật lý (ví dụ: `npx react-native run-android` hoặc `npx react-native run-ios`).

## 🤝 Liên hệ
Phạm Minh Đức
minhduc5116@gmail.com
