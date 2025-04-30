import axios from 'axios';

const API_URL = '/api/events'; // пример URL API

export const createEvent = (data) => axios.post(API_URL, data);
export const updateEvent = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteEvent = (id) => axios.delete(`${API_URL}/${id}`);
