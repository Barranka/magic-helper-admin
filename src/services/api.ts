import axios from "axios";
import { store } from "../store";
import { EventItem, RequestBodyListEvent } from "../types/events"

const API_URL_PUBLIC = 'https://magic.ginc.online/api/v1';

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const tokenOld = (store.state as any).auth?.accessToken;

    if (error.response?.status === 401 && Boolean(originalRequest?._retry) === false) {
      originalRequest._retry = true;

      try {
        await store.dispatch('auth/refreshToken');
        const token = (store.state as any).auth?.accessToken;

        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest); // повторяем запрос с новым токеном
        }
      } catch (e) {
        store.dispatch("auth/logout"); // refresh тоже не сработал → разлогиниваем
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// AUTH
export const auth = (body: AuthForm) => api.post("/public/sign_in", body);
export const refreshToken = (body: RefreshForm) => api.post("/public/refresh", body);

// EVENTS
export const createEvent = (body: EventItem) => api.post('/admin/events', body);
export const updateEvent = (id: number, body: EventItem) => api.put(`/admin/events/${id}`, body);
export const deleteEvent = (id: number) => api.delete(`/admin/events/${id}`);
export const getEvents = (body: RequestBodyListEvent) => api.post('/public/list_events', body);

// CITIES
export const getCities = () => api.get('/public/cities');
