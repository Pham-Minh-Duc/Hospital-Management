package com.example.admin_service.controller;

import com.example.admin_service.dto.request.AdminLoginRequest;
import com.example.admin_service.dto.request.AdminLoginResponse;
import com.example.admin_service.dto.request.AdminRegisterRequest;
import com.example.admin_service.entity.Admin;
import com.example.admin_service.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admins")
public class AdminController {

    @Autowired
    private AdminService adminService;


    @PostMapping
    Admin createAdmin(@RequestBody AdminLoginRequest request){
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


    @DeleteMapping("/{adminId}")
    String deleteAdmin(@PathVariable String adminId){
        adminService.deleteAdmin(adminId);
        return "Admin has been deleted";
    }


     @PostMapping(value = "/login", produces = "application/json")
     ResponseEntity<AdminLoginResponse> login(@RequestBody AdminLoginRequest request){
        try{
            AdminLoginResponse response = adminService.login(
                    request.getAdminEmail(),
                    request.getAdminPassword()
            );
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            AdminLoginResponse errorResponse = new AdminLoginResponse("Lỗi: " + e.getMessage(), null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

    }

    @PostMapping(value = "/register", produces = "application/json")
    public ResponseEntity<AdminLoginResponse> register(@RequestBody AdminRegisterRequest request){
        AdminLoginResponse response = adminService.registerAdmin(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


}
