import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://tasteorama-server.onrender.com',
  // withCredentials: true,
  withCredentials: false,
});
