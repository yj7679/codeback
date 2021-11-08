import axios from 'axios';
import { config } from './config';

export const mainAxios = axios.create({
  baseURL: config.api,
  withCredentials: true,
  timeout: 3000
});
