import axios from "axios";
import { Configs } from "../common/Config";
import { getToken } from "./Auth";

const api = axios.create({
    baseURL: Configs.BaseUrl
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;