import authService from "@/services/auth.service";

const AuthStore = {
    state: () => ({
        user: null,
        error: {},
    }),
    mutations: {
        LOGIN_FALIURE(state, error) {
            state.error = error;
            state.user = null;
        },
        LOGIN_SUCCESS(state, user) {
            state.user = user;
            state.error = {};
        },
        LOGOUT(state) {
            state.user = null;
            state.error = {};
        },
        CLEAR_ERROR(state) {
            state.error = {};
        }
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const data = await authService.login(credentials);
                if (data) {
                    commit('LOGIN_SUCCESS', data);
                    return true;
                }
                return false
            } catch (error) {
                commit('LOGIN_FALIURE', error?.response?.data)
            }
        },
        async logout({ commit }) {
            try {
                const data = await authService.logout();
                if (data) {
                    commit('LOGOUT');
                    return true;
                }
                return false;
            } catch (error) {
                console.log(error)
            }
        }
    },
    getters: {
        isLoggedIn: state => !!state.user,
        getAccessToken: state => state.user?.accessToken
    },
}

export default AuthStore;