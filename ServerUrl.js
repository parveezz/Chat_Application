const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

export const ServerUrl = isLocalhost 
  ? "http://localhost:5000" 
  : "https://chat-backend-r793.onrender.com";