import axios from "axios";

const api = axios.create({
  baseURL: "https://colonyconnect.onrender.com/api", // 👈 NO trailing slash
});

export default api;
