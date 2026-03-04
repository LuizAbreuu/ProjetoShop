import axios from "axios";

// json-server --watch db.json 
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});