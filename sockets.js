import { io } from "socket.io-client";

const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const BACKEND_URL = isLocalhost 
  ? "http://localhost:5000" 
  : "https://chat-backend-r793.onrender.com";

export const sockets = io(BACKEND_URL, {
      autoConnect: false,
      auth: {
            token: localStorage.getItem("Token"),
      },
});