import { createStore } from 'vuex';
import AuthStore from './auth';
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    modules: {
        auth: AuthStore
    },
    plugins: [
        createPersistedState({
            paths: ['auth.user']
        })
    ]
});

export default store;