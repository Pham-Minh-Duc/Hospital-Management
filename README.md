DỰ ÁN QUẢN TRỊ BỆNH VIỆN

- backend/ -> webadmin & API
- frontend/ -> web admin & client
- mobile-app/ -> app di động (React Native)
- docs/ -> tài liệu kĩ thuật, hướng dẫn

- RUN: npm run dev

------------------------------------------------------------------------------------------------------------------
- Eureka + Spring Cloud Gateway + Auth service(JWT) + microservices

Công nghệ	                         Mục đích sử dụng

Spring Boot	                         Xây dựng các microservice một cách nhanh chóng, dễ cấu hình.
Spring Cloud Eureka	                 Đăng ký & phát hiện các service trong hệ thống (Service Discovery).
Spring Cloud Gateway	             Làm API Gateway: định tuyến các request, filter JWT để bảo vệ các route.
Spring Security	                     Bảo mật endpoint bằng JWT.
JWT (JSON Web Token)	             Xác thực người dùng, phân quyền qua token.
Spring Web	                         Tạo các RESTful API.
Spring Data JPA	                     Truy vấn dữ liệu, thao tác với database dễ dàng.
mySql	                             Cơ sở dữ liệu cho các service.
Lombok	                             Rút gọn code Java (getter, setter, constructor, builder...).
Maven	                             Quản lý dependencies và build project.


JWT (JSON Web Token)
Được dùng ở auth-service.
Khi người dùng đăng nhập, hệ thống tạo 1 JWT token chứa thông tin người dùng.
JWT sẽ được client (frontend, postman...) lưu trữ và đính kèm trong mỗi request (Authorization: Bearer <token>).
Gateway sẽ kiểm tra token trước khi chuyển request đến microservice khác.



 Spring Cloud Gateway
Đóng vai trò API Gateway.
Mọi request từ client đều đi qua đây.
Chức năng chính:
Kiểm tra JWT (auth filter).
Định tuyến đến các service nội bộ như /api/users/** → user-service, /api/products/** → product-service.
Có thể thêm Rate Limiting, CORS, v.v...


Eureka Server
Là một Service Registry.
Mỗi service (user-service, product-service...) khi khởi động sẽ đăng ký với Eureka.
Gateway hoặc các service khác sẽ gọi tên service thay vì hardcode IP/port.
Ví dụ: http://user-service/users thay vì http://localhost:8081/users.

 auth-service
Cung cấp các API như /auth/register, /auth/login.
Kiểm tra tài khoản/mật khẩu, nếu hợp lệ → trả về JWT token.
Có thể lưu user vào database và mã hóa password với BCrypt.


 user-service / product-service / order-service
Mỗi service xử lý domain riêng:
user-service: CRUD user
product-service: CRUD sản phẩm
order-service: CRUD đơn hàng
Các service này thường yêu cầu JWT hợp lệ mới cho phép truy cập.
Sử dụng Spring Data JPA để thao tác database.


Tóm tắt luồng hoạt động
Người dùng đăng nhập qua auth-service → nhận JWT.
Gửi request đến Gateway → Gateway kiểm tra JWT.
Gateway định tuyến đến microservice tương ứng (user/product/order).
Microservice xử lý request, truy cập DB nếu cần.
Trả kết quả về client.

