import createApiClient from "./api.service";
import createApiJwt from "./api.jwt"
import store from "@/store";


class BookService {
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

        return (await this.apiJwt.get('/borrow', { params: queryString })).data;
    }

    async update(id, data) {
        this.apiJwt = createApiJwt(
            this.baseURL,
            {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            store.getters.getAccessToken
        )

        return (await this.apiJwt.put(`/borrow/${id}`, data)).data;
    }
}

export default new BookService();
