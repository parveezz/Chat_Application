const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

export const BaseUrl = isLocalhost 
  ? "http://localhost:5000/api/" 
  : "https://chat-backend-r793.onrender.com/api/";