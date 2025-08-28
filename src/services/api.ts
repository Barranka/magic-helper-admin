import axios from "axios";
import { store } from "../store";
import { EventItem, RequestBodyListEvent } from "../types/events"

const API_URL_PUBLIC = 'https://magic.ginc.tech/api/v1';

const api = axios.create({
  baseURL: API_URL_PUBLIC,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Перехватчик: добавляем токен из Vuex к каждому запросу
api.interceptors.request.use((config) => {
  const token = (store.state as any).auth?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// AUTH
export const auth = (body: AuthForm) => api.post("/public/sign_in", body);

// EVENTS
export const createEvent = (body: EventItem) => api.post('/admin/events', body);
export const updateEvent = (id: number, body: EventItem) => api.put(`/admin/events/${id}`, body);
export const deleteEvent = (id: number) => api.delete(`/admin/events/${id}`);
export const getEvents = (body: RequestBodyListEvent) => api.post('/public/list_events', body);

// CITIES
export const getCities = () => api.get('/public/cities');
