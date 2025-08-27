package com.example.admin_service.service;

import com.example.admin_service.dto.request.AdminLoginRequest;
import com.example.admin_service.dto.request.AdminLoginResponse;
import com.example.admin_service.dto.request.AdminRegisterRequest;
import com.example.admin_service.entity.Admin;
import com.example.admin_service.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

import static ch.qos.logback.classic.spi.ThrowableProxyVO.build;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;


    public AdminLoginResponse login(String email, String password){
        Admin admin = adminRepository.findByAdminEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Email không tồn tại"));
        if (!admin.getAdminPassword().equals(password)){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Sai mật khẩu");
        }
        return new AdminLoginResponse("Đăng nhập thành công", admin.getAdminName());
    }


    public AdminLoginResponse registerAdmin(AdminRegisterRequest request) {
        // check email
        boolean exists = adminRepository.findByAdminEmail(request.getAdminEmail()).isPresent();
        if (exists) {
            throw new RuntimeException("Email đã được sử dụng");
        }
        // create new admin
        Admin admin = Admin.builder()
                .adminName(request.getAdminName())
                .adminEmail(request.getAdminEmail())
                .adminPassword(request.getAdminPassword())
                .adminGender(request.getAdminGender())
                .adminPhone(request.getAdminPhone())
                .adminBirthday(request.getAdminBirthday())
                .build();
        try {
            adminRepository.save(admin);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("lỗi khi lưu admin: " + e.getMessage());
        }

        return new AdminLoginResponse("Đăng ký thành công", admin.getAdminName());
    }


    public Admin createAdmin(AdminLoginRequest request){
        Admin admin = Admin.builder()
                .adminEmail(request.getAdminEmail())
                .adminPassword(request.getAdminPassword())
                .build();
        return adminRepository.save(admin);
    }


    public void deleteAdmin(String adminId) {
        adminRepository.deleteById(adminId);
    }


    public List<Admin> getAdmin() {
        return adminRepository.findAll();
    }


    public Admin getAdmin(String id){
        return adminRepository.findById(id).orElseThrow(() -> new RuntimeException("Admin not found"));
    }
}

