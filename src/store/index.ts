// store/index.ts
import {
  getEvents,
  createDailyEvent,
  deleteDailyEvent,
  updateDailyEvent,
  createTournamentEvent,
  deleteTournamentEvent,
  updateTournamentEvent,
} from '../services/api';
import { createStore } from 'vuex';

const initialDailyData = {
  type: 'daily',
  city: '',
  place: '',
  day: null,
  time: null,
  mapUrl: '',
  format: null,
  price: '',
  description: '',
};

const initialTournamentData = {
  type: 'tournament',
  name: null,
  banner: null,
  city: '',
  place: '',
  day: null,
  time: null,
  mapUrl: '',
  format: null,
  price: '',
  description: '',
  theme: null,
};

const createFormData = (data: TournamentEvent): FormData => {
  const formData = new FormData();

  formData.append('type', 'tournament');
  formData.append('name', data.name || '');
  formData.append('city', data.city || '');
  formData.append('place', data.place || '');
  formData.append('day', data.day || '');
  formData.append('time', data.time || '');
  formData.append('mapUrl', data.mapUrl || '');
  formData.append('format', data.format || '');
  formData.append('price', data.price || '');
  formData.append('description', data.description || '');
  formData.append('theme', data.theme || '');

  if (data.banner) {
    formData.append('image', data.banner);
  }

  return formData;
}

export const store = createStore({
  state: {
    events: [] as EventItem[],
    dailyData: { ...initialDailyData },
    tournamentData: { ...initialTournamentData },
    isLoading: false,
    mode: 'save' as EventMode,
  },
  mutations: {
    setAllEventsData(state, events) {
      state.events = [...events];
    },
    clearDailyEventData(state) {
      state.dailyData = { ...initialDailyData };
    },
    clearTournamentEventData(state) {
      state.tournamentData = { ...initialTournamentData };
    },
    updateDailyEventData(state, data) {
      state.dailyData = { ...data };
    },
    updateTournamentEventData(state, data) {
      state.tournamentData = { ...data };
    },
    setLoading(state, data) {
      state.isLoading = data;
    },
    setMode(state, data) {
      state.mode = data;
    },
  },
  actions: {
    async getAllEventsData({ commit, dispatch }) {
      dispatch('changeLoading', true);

      try {
        const response = await getEvents();

        commit('setAllEventsData', response.data);
      } finally {
        dispatch('changeLoading', false);
      }
    },
    async createDailyData({dispatch}, data) {
      dispatch('changeLoading', true);

      try {
        await createDailyEvent(data);
      } catch(error) {
        throw error;
      } finally {
        dispatch('changeLoading', false);
      }
    },
    async updateDailyData({dispatch}, data) {
      dispatch('changeLoading', true);

      try {
        await updateDailyEvent(data.id, data);
      } catch(error) {
        throw error;
      } finally {
        dispatch('changeLoading', false);
      }
    },
    async deleteDailyEvent({ dispatch }, id) {
      dispatch('changeLoading', true);

      try {
        await deleteDailyEvent(id);
      } catch(error) {
        throw error;
      } finally {
        dispatch('changeLoading', false);
      }
    },
    async clearDailyEventData({ commit }) {
      commit('clearDailyEventData');
    },
    async createTournamentData({dispatch}, data) {
      dispatch('changeLoading', true);

      const formData = createFormData(data);

      try {
        await createTournamentEvent(formData);
      } catch(error) {
        throw error;
      } finally {
        dispatch('changeLoading', false);
      }
    },
    async updateTournamentData({dispatch}, data) {
      dispatch('changeLoading', true);

      const formData = createFormData(data);

      try {
        await updateTournamentEvent(data.id, formData);
      } catch(error) {
        throw error;
      } finally {
        dispatch('changeLoading', false);
      }
    },
    async deleteTournamentEvent({ dispatch }, id) {
      dispatch('changeLoading', true);

      try {
        await deleteTournamentEvent(id);
      } catch(error) {
        throw error;
      } finally {
        dispatch('changeLoading', false);
      }
    },
    async clearTournamentEventData({ commit }) {
      commit('clearTournamentEventData');
    },
    changeLoading({ commit }, data: boolean) {
      commit('setLoading', data);
    }
  },
  getters: {
    getAllEventsData(state) {
      return state.events;
    },
    getDailyEventData(state) {
      return state.dailyData;
    },
    getTournamentEventData(state) {
      return state.tournamentData;
    },
    getLoading(state) {
      return state.isLoading;
    },
    getMode(state) {
      return state.mode;
    },
  },
});
