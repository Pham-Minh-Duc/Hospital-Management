package com.example.realtime_service.config;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.security.Principal;

@Component
public class UserInterceptor implements ChannelInterceptor {
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String userId = accessor.getFirstNativeHeader("userId");
            if (userId == null) {
                userId = "guest-" + System.currentTimeMillis();
            }
            String finalUserId = userId;

            accessor.setUser(new Principal() {
                @Override
                public String getName() {
                    return finalUserId;
                }
            });

            System.out.println("✅ WebSocket CONNECTED với user: " + finalUserId);
        }

        return message;
    }
}
