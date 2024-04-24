
import createApiClient from "./api.service";
import createApiJwt from "./api.jwt"
import store from "@/store";

class AuthService {
    constructor(baseURL = "/api/bookstore") {
        this.baseURL = baseURL
        this.api = createApiClient(baseURL);
        // this.apiJwt = createApiJwt(baseURL);
    }

    async login(data) {
        return (await this.api.post("/admin/login", data)).data;
    }

    async logout() {
        return (await this.api.post("/admin/logout")).data;
    }

    async register(data) {
        this.apiJwt = createApiJwt(this.baseURL,
            {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }, store.getters.getAccessToken
        )

        return (await this.apiJwt.post("/admin/register", data)).data;
    }


    async refreshToken() {
        return (await this.api.post("/admin/refresh-token")).data;
    }

    async getRefeshToken() {
        return (await this.api.get("/admin/get-token")).data;
    }
}

export default new AuthService();