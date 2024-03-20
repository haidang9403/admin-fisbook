
import createApiClient from "./api.service";

class AuthService {
    constructor(baseURL = "/api/bookstore") {
        this.api = createApiClient(baseURL);
    }

    async login(data) {
        return (await this.api.post("/admin/login", data)).data;
    }

    async logout() {
        return (await this.api.post("/admin/logout")).data;
    }

    async refreshToken() {
        return (await this.api.post("/admin/refresh-token")).data;
    }

    async getRefeshToken() {
        return (await this.api.get("/admin/get-token")).data;
    }
}

export default new AuthService();