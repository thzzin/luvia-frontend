// lib/utils/api.ts

import axios from "axios";

const api = axios.create({
  baseURL: "https://getluvia.com.br:3005/auth", // Substitua pela URL correta do seu servidor Node.js
  timeout: 5000,
});

export default api;
