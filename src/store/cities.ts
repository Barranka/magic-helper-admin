import { getCities } from '../services/api';
import { ActionContext } from 'vuex';

export default {
  namespaced: true,
  state: {
    cities: [],
  },
  mutations: {
    SET_CITIES(state: CitiesState, cities: any) {
      state.cities = cities;
    },
  },
  actions: {
    async getCities({ commit }: ActionContext<CitiesState, RootState>) {
      const response = await getCities();

      commit('SET_CITIES', response.data.cities);

      return response;
    },
  },
  getters: {
    cities: (state: CitiesState) => state.cities,
  },
};
