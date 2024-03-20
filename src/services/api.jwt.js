import axios from "axios";
import { jwtDecode } from "jwt-decode";
import store from "@/store";

import authService from './auth.service';

export default (baseURL, header, token) => {
    const axiosJWT = axios.create({
        baseURL,
        headers: {
            ...header,
            'Authorization': `Bearer ${token}`
        }
    });

    axiosJWT.interceptors.request.use(async (config) => {
        let date = new Date();
        const decodedToken = jwtDecode(store.getters.getAccessToken);

        if (decodedToken.exp < (date.getTime() / 1000)) {
            const data = await authService.refreshToken();

            const refreshUser = {
                ...store.state.auth.user,
                accessToken: data.accessToken
            };

            store.commit('LOGIN_SUCCESS', refreshUser);
            config.headers['Authorization'] = "Bearer " + data.accessToken;
        }

        return config;
    })

    return axiosJWT;
};

