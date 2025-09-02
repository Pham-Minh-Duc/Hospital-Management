//package com.example.appointment_service.client;
//
//import io.grpc.ManagedChannel;
//import io.grpc.ManagedChannelBuilder;
//import org.springframework.stereotype.Component;
//
//@Component
//public class Doctor_gRPC {
//    private final DoctorServiceGrpc.DoctorServiceBlockingStub stub;
//
//    public Doctor_gRPC() {
//        ManagedChannel channel = ManagedChannelBuilder
//                .forAddress("localhost", 9092)
//                .usePlaintext()
//                .build();
//        stub = DoctorServiceGrpc.newBlockingStub(channel);
//    }
//
//    public DoctorResponse getDoctorById(String doctorId) {
//        return stub.getDoctorById(
//                DoctorRequest.newBuilder().setDoctorId(doctorId).build()
//        );
//    }
//
//}
