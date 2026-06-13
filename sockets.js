import { io } from "socket.io-client";

export const sockets = io("https://chat-backend-r793.onrender.com", {
      autoConnect: false,
      auth: {
            token: localStorage.getItem("Token"),
      },
});

// export const sockets = io("http://localhost:5000", {
//       autoConnect: false,
//       auth: {
//             token: localStorage.getItem("Token"),
//       },
// });