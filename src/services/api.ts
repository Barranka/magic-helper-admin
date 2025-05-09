import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};

// params для get (фильтрация) и delete
const API_URL = 'https://us-central1-sampleMtgHelper.cloudfunctions.net/';

// дейлики
export const getDailyEvents = () => axios.get(`${API_URL}getDailyEvents`);
export const createDailyEvent = (data: DailyEvent) => axios.post(`${API_URL}addDailyEvent`, data, { headers });
export const updateDailyEvent= (id: number, data: DailyEvent) => axios.patch(`${API_URL}/editDailyEvent`, data);
export const deleteDailyEvent = (id: number) => axios.delete(`${API_URL}/deleteDailyEvent?id=${id}`);

// турниры
export const getTournamentEvents = () => axios.get(`${API_URL}getTournamentEvents`);
export const createTournamentEvent = (data: TournamentEvent) => axios.post(`${API_URL}addTournamentEvent`, data, { headers });
export const updateTournamentEvent= (id: number, data: TournamentEvent) => axios.patch(`${API_URL}/editTournamentEvent`, data, { headers });
export const deleteTournamentEvent = (id: number) => axios.delete(`${API_URL}/deleteTournamentEvent?id=${id}`);

// всё
export const getEvents = () => axios.get(`${API_URL}getAllEvents`);
