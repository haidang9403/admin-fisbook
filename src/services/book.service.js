import createApiClient from "./api.service";
import createApiJwt from "./api.jwt"
import store from "@/store";


class BookService {
    constructor(baseURL = "/api/bookstore") {
        this.baseURL = baseURL;
        this.api = createApiClient(baseURL);
        this.apiJwt = createApiJwt(baseURL);
    }

    async getAll() {
        return (await this.api.get("/book")).data;
    }

    async getOne(id) {
        return (await this.api.get("/book/" + id)).data;
    }

    async getAuthor() {
        return (await this.api.get("/author")).data;
    }

    async getCategory() {
        return (await this.api.get("/category")).data;
    }

    async getPublisher() {
        return (await this.api.get("/publisher")).data;
    }

    async add(data) {
        this.apiJwt = createApiJwt(this.baseURL,
            {
                'Content-Type': 'multipart/form-data',
                Accept: 'multipart/form-data',
            }, store.getters.getAccessToken
        )

        return (await this.apiJwt.post("/book", data)).data;
    }

    async edit(data, id) {
        this.apiJwt = createApiJwt(
            this.baseURL,
            {
                'Content-Type': 'multipart/form-data',
                Accept: 'multipart/form-data',
            },
            store.getters.getAccessToken
        )


        return (await this.apiJwt.put(`/book/${id}`, data)).data;
    }

    async delete(id) {
        this.apiJwt = createApiJwt(
            this.baseURL,
            {
                'Content-Type': 'multipart/form-data',
                Accept: 'multipart/form-data',
            },
            store.getters.getAccessToken
        )

        return (await this.apiJwt.delete(`/book/${id}`)).data;
    }

    async addAuthor(data) {
        this.apiJwt = createApiJwt(this.baseURL,
            {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }, store.getters.getAccessToken
        )

        return (await this.apiJwt.post("/author", data)).data;
    }

    async addCategory(data) {
        this.apiJwt = createApiJwt(this.baseURL,
            {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }, store.getters.getAccessToken
        )

        return (await this.apiJwt.post("/category", data)).data;
    }

    async addPublisher(data) {
        this.apiJwt = createApiJwt(this.baseURL,
            {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }, store.getters.getAccessToken
        )

        return (await this.apiJwt.post("/publisher", data)).data;
    }
}

export default new BookService();
