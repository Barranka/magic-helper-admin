import { auth } from '../services/api';
import { ActionContext } from 'vuex';

export default {
  namespaced: true,
  state: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: null,
  },
  mutations: {
    SET_TOKEN(state: AuthState, { accessToken, refreshToken }: { accessToken: string; refreshToken: string }) {
      localStorage.setItem('accessToken', accessToken);
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    LOGOUT(state: AuthState) {
      state.accessToken = null;
      localStorage.removeItem('accessToken');
    },
  },
  actions: {
    async login({ commit }: ActionContext<AuthState, RootState>, data: AuthForm) {
      const response = await auth({email: data.email, password: data.password, device_id: "string"});
      const { access_token, refresh_token } = response.data as AuthResponse;

      commit('SET_TOKEN', {
        accessToken: access_token,
        refreshToken: refresh_token
      });

      return response;
    },
    logout({ commit }: ActionContext<AuthState, RootState>) {
      commit('LOGOUT');
    },
  },
  getters: {
    isAuthenticated: (state: AuthState) => !!state.accessToken,
  },
};
