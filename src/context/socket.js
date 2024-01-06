import socketio from "socket.io-client";
import { createContext } from "react";

export const socket = socketio.connect("https://online-classroom-be-55cfb8f0ea3c.herokuapp.com/");
export const SocketContext = createContext();
