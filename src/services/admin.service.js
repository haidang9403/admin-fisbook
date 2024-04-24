import createApiClient from "./api.service";
import createApiJwt from "./api.jwt"
import store from "@/store";


class AdminService {
    constructor(baseURL = "/api/bookstore") {
        this.baseURL = baseURL;
        this.api = createApiClient(baseURL);
        this.apiJwt = createApiJwt(baseURL);
    }

    async getAll(queryString) {
        this.apiJwt = createApiJwt(
            this.baseURL,
            {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            store.getters.getAccessToken
        )

        return (await this.apiJwt.get('/admin', { params: queryString })).data;
    }

    async getDetails(id) {
        this.apiJwt = createApiJwt(
            this.baseURL,
            {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            store.getters.getAccessToken
        )

        return (await this.apiJwt.get('/admin/' + id)).data;
    }
}

export default new AdminService();
