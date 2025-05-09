// store/index.ts
import {
  getEvents,
  getDailyEvents,
  createDailyEvent,
  deleteDailyEvent,
  updateDailyEvent,
  getTournamentEvents,
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
  banner: [],
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
      console.log(typeof data, 'data')
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
    async createDailyData({}, data) {
      try {
        await createDailyEvent(data);
      } catch(error) {
        throw error;
      }
    },
    async updateDailyData({}, data) {
      await updateDailyEvent(data.id, data);
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
    async createTournamentData({}, data) {
      try {
        await createTournamentEvent(data);
      } catch(error) {
        throw error;
      }
    },
    async updateTournamentData({}, data) {
      await updateTournamentEvent(data.id, data);
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
