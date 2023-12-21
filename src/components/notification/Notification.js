import { useEffect, useState } from "react";

import connectWebSocket from "../../service/WebSocketService";
import { Button } from "@mui/material";

export default function Notification() {
  const [notification, setNotification] = useState("");
  const socket = connectWebSocket();

  useEffect(() => {
    console.log("useEffect");
    socket.on("onMessage", (message) => {
      console.log("Received message from server:", message);
    });

    return () => {
      socket.off("onMessage");
    };
  }, []);

  const sendMessage = () => {
    console.log("sendMessage");
    const notification = {
      title: "Student Request",
      description: "Student has requested a review.",
      senderId: "123",
      receiverId: "456",
      classMembershipAssignmentId: "789",
    };
    socket.emit("studentRequestReview", notification);
  };

  return (
    <div>
      <h1>WebSocket Notifications</h1>
      <Button onClick={sendMessage}>Send Message</Button>
      {notification && <p>{notification}</p>}
    </div>
  );
}
