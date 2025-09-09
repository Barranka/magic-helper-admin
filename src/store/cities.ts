import { getCities } from '../services/api';
import { ActionContext } from 'vuex';
import { RequestBodyListEvent } from "../types/events"

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
    async getCities({ commit }: ActionContext<CitiesState, RootState>, query: string) {
      const response = await getCities(query);

      commit('SET_CITIES', response.data.cities);

      return response;
    },
  },
  getters: {
    cities: (state: CitiesState) => state.cities,
  },
};
