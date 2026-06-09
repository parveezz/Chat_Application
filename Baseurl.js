export const BaseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? `http://localhost:5000/api/`
  : `https://chat-backend-r793.onrender.com/api/`;