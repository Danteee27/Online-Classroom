import { io } from "socket.io-client";

const connectWebSocket = () => {
  const socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log("WebSocket connected");
  });

  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");

    // Retry connection after a delay
    setTimeout(() => {
      connectWebSocket();
    }, 2000); // Adjust the delay as needed
  });

  return socket;
};

export default connectWebSocket;
