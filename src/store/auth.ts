import { auth, refreshToken } from '../services/api';
import { ActionContext } from 'vuex';

export default {
  namespaced: true,
  state: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  },
  mutations: {
    SET_TOKEN(state: AuthState, { accessToken, refreshToken }: { accessToken: string; refreshToken: string }) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', accessToken);
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    LOGOUT(state: AuthState) {
      state.accessToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  actions: {
    async login({ commit }: ActionContext<AuthState, RootState>, data: AuthForm) {
      try {
        const response = await auth({email: data.email, password: data.password, device_id: "string"});
        const { access_token, refresh_token } = response.data as AuthResponse;

        commit('SET_TOKEN', {
          accessToken: access_token,
          refreshToken: refresh_token
        });

        return response;
      } catch (e) {
        commit("LOGOUT");
        throw e;
      }
    },
    async refreshToken({ state, commit }: ActionContext<AuthState, RootState>) {
      try {
        if (!state.refreshToken) return;

        const response = await refreshToken({
          refresh_token: state.refreshToken,
        });

        const { access_token, refresh_token } = response.data as AuthResponse;
        commit("SET_TOKEN", {
          accessToken: access_token,
          refreshToken: refresh_token,
        });

        return access_token;
      } catch (e) {
        commit("LOGOUT");
        throw e;
      }
    },
    logout({ commit }: ActionContext<AuthState, RootState>) {
      commit('LOGOUT');
    },
  },
  getters: {
    isAuthenticated: (state: AuthState) => !!state.accessToken,
  },
};
