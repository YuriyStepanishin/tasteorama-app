import axios from 'axios';

export const nextServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});

export const directServer = axios.create({
  baseURL: 'https://tasteorama-server.onrender.com',
});
