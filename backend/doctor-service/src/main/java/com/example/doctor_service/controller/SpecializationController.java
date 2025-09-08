package com.example.doctor_service.controller;

import com.example.doctor_service.entity.Specialization;
import com.example.doctor_service.service.SpecializationService;
import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/specializations")
public class SpecializationController {

    private final SpecializationService specializationService;

    public SpecializationController(SpecializationService specializationService) {
        this.specializationService = specializationService;
    }

    @GetMapping
    public List<Specialization> getAllSpecializations() {
        return specializationService.getAllSpecializations();
    }

    //test api đã load
    @PostConstruct
    public void init() {
        System.out.println("✅ SpecializationController loaded!");
    }

}
