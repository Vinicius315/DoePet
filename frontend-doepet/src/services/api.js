import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Porta do seu server.js
});

// Sem essa linha exatamente assim, o Home.jsx dá erro de "provide an export named default"
export default api;