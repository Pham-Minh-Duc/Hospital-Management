package com.example.admin_service.service;

import com.example.admin_service.dto.request.AdminCreationRequest;
import com.example.admin_service.dto.request.AdminUpdateRequest;
import com.example.admin_service.entity.Admin;
import com.example.admin_service.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.time.LocalDate;
import java.util.List;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public Admin createAdmin(AdminCreationRequest request){
        Admin admin = new Admin();

        admin.setAdminName(request.getAdminName());
        admin.setAdminEmail(request.getAdminEmail());
        admin.setAdminPhone(request.getAdminPhone());
        admin.setAdminPassword(request.getAdminPassword());
        admin.setAdminGender(request.getAdminGender());
        admin.setAdminBirthday(request.getAdminBirthday());

        return adminRepository.save(admin);
    }

    public Admin updateAdmin(String adminId, AdminUpdateRequest request){
        Admin admin = getAdmin(adminId);

        admin.setAdminEmail(request.getAdminEmail());
        admin.setAdminPhone(request.getAdminPhone());
        admin.setAdminPassword(request.getAdminPassword());
        admin.setAdminGender(request.getAdminGender());
        admin.setAdminBirthday(request.getAdminBirthday());

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

