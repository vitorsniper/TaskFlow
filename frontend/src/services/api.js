import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000", // URL da sua API Rails
    withCredentials: true // se você usa cookies para autenticação
});

export default api;