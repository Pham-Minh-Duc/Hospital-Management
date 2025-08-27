package com.example.realtime_service.controller;

import com.example.realtime_service.Dto.PrivateMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class NotificationController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // Broadcast: mọi client sub /topic/notification sẽ thấy
    @MessageMapping("/sendMessage")
    public void sendMessage(@Payload String message){
        System.out.println("Broadcast message: " + message);
        messagingTemplate.convertAndSend("/topic/notification", message);
    }

    // Client gửi tin nhắn riêng cho admin
    @MessageMapping("/client-to-admin")
    public void sendToAdmin(@Payload PrivateMessage message) {
        System.out.println("Client " + message.getClientId() + " gửi cho admin: " + message.getContent());
        messagingTemplate.convertAndSendToUser(
                "admin",                // giả sử username của admin là "admin"
                "/queue/messages",
                "Client " + message.getClientId() + ": " + message.getContent()
        );
    }

    // Admin gửi tin nhắn riêng cho 1 client
    @MessageMapping("/admin-to-client")
    public void sendToClient(@Payload PrivateMessage message) {
        System.out.println("Admin gửi cho client " + message.getClientId() + ": " + message.getContent());
        messagingTemplate.convertAndSendToUser(
                message.getClientId(),  // username / clientId của client
                "/queue/messages",
                "Admin: " + message.getContent()
        );
    }
}
