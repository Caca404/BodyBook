import axios  from "axios";
import {API_PATH} from "@env"

const api = axios.create({
    baseURL: API_PATH+"/public",
    withCredentials: true
});


export default api;