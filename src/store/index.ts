// store/index.ts
import { getEvents, createEvent, deleteEvent, updateEvent } from '../services/api';
import { createStore, Store } from 'vuex';
import { EventItem, EventMode } from '../types/events';
import auth from './auth';
import cities from './cities';

const initialEventData = {
  type: null,
  format: null,
  city_id: '',
  place: '',
  price: '',
  weekday: '',
  time: null,
  date: null,
  map_url: '',
  image_url: '',
  banner: '',
  name: '',
  theme: '',
  description: '',
};

export interface RootState {
  events: EventItem[];
  eventForm: any;
  isLoading: boolean;
  mode: EventMode;
}

export const store: Store<RootState> = createStore<RootState>({
  state: {
    events: [] as EventItem[],
    eventForm: {},
    isLoading: false,
    mode: 'save' as EventMode,
  },
  modules: {
    auth,
    cities,
  },
  mutations: {
    setAllEventsData(state, events) {
      state.events = [...events];
    },
    clearEventData(state) {
      state.eventForm = { ...initialEventData };
    },
    updateEventData(state, data) {
      state.eventForm = { ...data };
    },
    setLoading(state, data) {
      state.isLoading = data;
    },
    setMode(state, data) {
      state.mode = data;
    },
  },
  actions: {
    async getAllEventsData({ commit, dispatch }, body) {
      dispatch('changeLoading', true);

      try {
        const response = await getEvents(body);
        commit('setAllEventsData', response.data?.events || []);
      } finally {
        dispatch('changeLoading', false);
      }
    },
    async createEventData({ commit, dispatch }, data) {
      dispatch('changeLoading', true);
      try {
        await createEvent(data);
      } catch (error) {
        throw error;
      } finally {
        dispatch('changeLoading', false);
      }
    },
    async updateEventData({ dispatch }, data) {
      dispatch('changeLoading', true);

      try {
        delete data.city;
        await updateEvent(data.id, data);
      } catch (error) {
        throw error;
      } finally {
        dispatch('changeLoading', false);
      }
    },
    async deleteEventData({ dispatch }, id) {
      dispatch('changeLoading', true);

      try {
        await deleteEvent(id);
      } catch (error) {
        throw error;

      } finally {
        dispatch('changeLoading', false);
      }
    },
    clearEvent({ commit }) {
      commit('clearEventData');
    },
    changeLoading({ commit }, data: boolean) {
      commit('setLoading', data);
    },
    updateMode({ commit }, mode: EventMode) {
      commit('setMode', mode);
    },
  },
  getters: {
    getAllEventsData(state) {
      return state.events;
    },
    getEventDataDefault(state) {
      return state.eventForm;
    },
    getLoading(state) {
      return state.isLoading;
    },
    getMode(state) {
      return state.mode;
    },
  },
});
