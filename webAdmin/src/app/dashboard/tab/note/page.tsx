'use client';

import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";

const NotificationPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [clientId, setClientId] = useState("clientA");
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const client = new Client({
  webSocketFactory: () => new SockJS("http://localhost:8085/ws-sockjs"), // ✅ đúng endpoint
  connectHeaders: {
    userId: "admin",
  },
  reconnectDelay: 5000,
  onConnect: () => {
    console.log("✅ Admin connected");
    client.subscribe("/user/queue/messages", (message: IMessage) => {
      setMessages((prev) => [...prev, "Client: " + message.body]);
    });
  },
  onStompError: (frame) => {
    console.error("❌ Lỗi STOMP:", frame);
  },
});

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessageToClient = () => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: "/app/send-to-client",
        body: JSON.stringify({
          clientId,
          content: input,
        }),
      });

      setMessages((prev) => [
        ...prev,
        `Tôi (Admin) → ${clientId}: ${input}`,
      ]);
      setInput("");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Admin Chat</h2>
      <div style={{ marginBottom: "0.5rem" }}>
        <label>Gửi tới clientId: </label>
        <input
          type="text"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        />
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nhập tin nhắn..."
      />
      <button onClick={sendMessageToClient} className="cursor-pointer">Gửi</button>

      <ul style={{ marginTop: "1rem" }}>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPage;
