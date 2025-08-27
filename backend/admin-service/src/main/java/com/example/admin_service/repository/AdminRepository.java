package com.example.admin_service.repository;

import com.example.admin_service.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
// khi kế thừa JpaRepository, tự động có sẵn các phương thức: findAll(), findById(), save(), deleteById(), count(), existsById(),...
//JpaRepository<a, b>: a: entity thao tác, b: kiểu dữ liệu khóa chính.
public interface AdminRepository extends JpaRepository<Admin, String> {
//    là 1 custom query method, Spring tự động tạo câu query tương ứng:
//    SELECT * FROM admin WHERE admin_email = ?;
    Optional<Admin> findByAdminEmail(String email);
}
