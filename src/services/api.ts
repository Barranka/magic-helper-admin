import axios from 'axios';

const headers = {
  'Content-Type': 'multipart/form-data',
};

// params для get (фильтрация) и delete
const API_URL = 'https://us-central1-sampleMtgHelper.cloudfunctions.net/';

// дейлики
export const getDailyEvents = () => axios.get(`${API_URL}getDailyEvents`);
export const createDailyEvent = (data: DailyEvent) => axios.post(`${API_URL}addDailyEvent`, data);
export const updateDailyEvent= (id: number, data: DailyEvent) => axios.patch(`${API_URL}/editDailyEvent`, data);
export const deleteDailyEvent = (id: number) => axios.delete(`${API_URL}/deleteDailyEvent?id=${id}`);

// турниры
export const getTournamentEvents = () => axios.get(`${API_URL}getTournamentEvents`);
export const createTournamentEvent = (data: DailyEvent) => axios.post(`${API_URL}addTournamentEvent`, data);
export const updateTournamentEvent= (id: number, data: DailyEvent) => axios.patch(`${API_URL}/editTournamentEvent`, data);
export const deleteTournamentEvent = (id: number) => axios.delete(`${API_URL}/deleteTournamentEvent?id=${id}`);

// всё
export const getEvents = () => axios.get(`${API_URL}getAllEvents`);
