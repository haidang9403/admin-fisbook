import createApiClient from "./api.service";
import createApiJwt from "./api.jwt"
import store from "@/store";


class UserService {
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

        return (await this.apiJwt.get('/user', { params: queryString })).data;
    }

    async getOne(id) {
        this.apiJwt = createApiJwt(
            this.baseURL,
            {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            store.getters.getAccessToken
        )

        return (await this.apiJwt.get(`/user/${id}`)).data;
    }
}

export default new UserService();
