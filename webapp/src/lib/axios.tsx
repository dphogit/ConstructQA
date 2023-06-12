import Axios from 'axios';
import { API_URL } from '../config';

/**
 * Custom axios instance with some ease of life configurations.
 *
 * - Sets the base URL to the API_URL environment variable.
 * - Sets the Content-Type header to application/json.
 * - Automatically parses the response data (no need to call .data)
 *
 */
export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers['Content-Type'] = 'application/json';
    return config;
  }
);

axios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);
