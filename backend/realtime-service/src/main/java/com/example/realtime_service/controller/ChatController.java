package com.example.realtime_service.controller;

import com.example.realtime_service.Dto.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // Admin gửi cho client cụ thể
    @MessageMapping("/send-to-client")
    public void sendToClient(@Payload ChatMessage message) {
        messagingTemplate.convertAndSendToUser(
                message.getClientId(),
                "/queue/messages",
                "📩 Admin: " + message.getContent()
        );
    }

    // Client gửi cho admin
    @MessageMapping("/send-to-admin")
    public void sendToAdmin(@Payload ChatMessage message) {
        messagingTemplate.convertAndSendToUser(
                "admin",
                "/queue/messages",
                "👤 " + message.getClientId() + ": " + message.getContent()
        );
    }
}
