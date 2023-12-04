import axios from 'axios';
import Cookies from 'js-cookie';
import { env } from '@/shared/config';

// Create an Axios instance
export const $api = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
$api.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get('access_token');

    if (accessToken?.length) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
$api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refresh_token');
        if (!refreshToken) {
          // window.location.href = '/active-modal';
          // No refresh token available, reject the promise

          return Promise.reject(error);
        }

        // Send a request to refresh tokens
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/accounts/auth/token/refresh/`,
          {
            refresh: refreshToken,
          },
        );

        if (response.status === 200) {
          // Update access_token and refresh_token in local storage

          Cookies.set('access_token', response.data.access);
          Cookies.set('refresh_token', response.data.refresh);

          // Update the Authorization header with the new access token
          originalRequest.headers['Authorization'] =
            'Bearer ' + response.data.access_token;

          // Retry the original request with the updated access token
          return $api(originalRequest);
        } else {
          // Unable to refresh tokens, reject the promise
          return Promise.reject(error);
        }
      } catch (err) {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        // An error occurred while refreshing tokens, reject the promise
        return Promise.reject(error);
      }
    }

    // For other errors, reject the promise with the error
    return Promise.reject(error);
  },
);
