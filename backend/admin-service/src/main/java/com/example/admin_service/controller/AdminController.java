package com.example.admin_service.controller;

import com.example.admin_service.dto.request.AdminCreationRequest;
import com.example.admin_service.dto.request.AdminUpdateRequest;
import com.example.admin_service.entity.Admin;
import com.example.admin_service.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping
    Admin createAdmin(@RequestBody AdminCreationRequest request){
        return adminService.createAdmin(request);
    }

    @GetMapping
    List<Admin> getAdmin(){
        return adminService.getAdmin();
    }

    @GetMapping("/{adminId}")
    Admin getAdmin(@PathVariable String adminId){
        return adminService.getAdmin(adminId);
    }

    @PutMapping("/{adminId}")
    Admin putAdmin(@PathVariable String adminId, @RequestBody AdminUpdateRequest request) {
        return adminService.updateAdmin(adminId, request);
    }

    @DeleteMapping("/{adminId}")
    String deleteAdmin(@PathVariable String adminId){
        adminService.deleteAdmin(adminId);
        return "Admin has been deleted";
    }
}
