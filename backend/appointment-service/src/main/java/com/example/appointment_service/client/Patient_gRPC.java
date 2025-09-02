//package com.example.appointment_service.client;
//
//import io.grpc.ManagedChannel;
//import io.grpc.ManagedChannelBuilder;
//import org.springframework.stereotype.Component;
//
//@Component
//public class Patient_gRPC {
//    private final PatientServiceGrpc.PatientServiceBlockingStub stub;
//
//    public Patient_gRPC() {
//        ManagedChannel channel = ManagedChannelBuilder
//                .forAddress("localhost", 9091)
//                .usePlaintext()
//                .build();
//        stub = PatientServiceGrpc.newBlockingStub(channel);
//    }
//
//    public PatientResponse getPatientById(String patientId) {
//        return stub.getPatientById(
//                PatientRequest.newBuilder().setPatientId(patientId).build()
//        );
//    }
//
//}
