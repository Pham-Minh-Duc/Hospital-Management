package com.example.realtime_service.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrivateMessage {
    private String clientId;   // id/username của người nhận hoặc người gửi
    private String content;
}
