/**
 * Authentication API client
 */
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const authApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/auth' || 'http://localhost:3333/api/auth'
});

export const register = async (credentials) => {
  const response = await authApi.post('/register', credentials);
  return response.data;
};

export const authenticate = async (credentials) => {
  const response = await authApi.post('/login', credentials);

  if (response.data.token) {
    // Save JWT in cookies
    cookies.set('token', response.data.token, { path: '/' });

    // Also attach token to axios instance for future requests
    authApi.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${response.data.token}`;
  }

  return response.data;
};

/**
 * Utility: get token from cookies (useful in other API files)
 */
export const getToken = () => cookies.get('token');
