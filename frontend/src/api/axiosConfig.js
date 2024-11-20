import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Cambia esta URL si tu backend está en otro host
    withCredentials: true, // Habilitar cookies, si es necesario
});

export default api;