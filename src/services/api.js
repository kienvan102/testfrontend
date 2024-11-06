// services/api.js
import axios from 'axios';

const API_URL = "http://localhost:8080";

export const fetchTickets = async () => {
  const response = await axios.get(`${API_URL}/tickets`);
  return response.data;
};

export const createTicket = async (ticket) => {
  const response = await axios.post(`${API_URL}/tickets`, ticket);
  return response.data;
};
