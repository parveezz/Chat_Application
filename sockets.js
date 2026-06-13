import { io } from "socket.io-client";

export const sockets = io("http://localhost:5000", {
      autoConnect: false,
      auth: {
            token: localStorage.getItem("Token"),
      },
});

