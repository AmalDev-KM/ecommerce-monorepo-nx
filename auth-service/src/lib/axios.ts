import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.COMM_SERVICE_URL,
  timeout: 5000,
  validateStatus: () => true, // accept all statuses (important for microservices)
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
