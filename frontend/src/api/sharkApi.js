/**
 * Shark API client
 */
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const sharkApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/sharks` || 'http://localhost:3333/api/sharks',
});

// Attach Authorization header for every request
sharkApi.interceptors.request.use((config) => {
  const token = cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

// Optional: global error handler (e.g., logout or redirect on 401)
sharkApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // e.g., cookies.remove('token', { path: '/' }); // and navigate to /login
    }
    return Promise.reject(err);
  }
);

// CRUD
export const getSharks = async () => {
  const res = await sharkApi.get('/');
  return res.data;
};

export const createShark = async (shark) => {
  const res = await sharkApi.post('/', shark);
  return res.data;
};

export const updateShark = async (shark) => {
  // Server expects /sharks/:id — adjust if your key is _id
  const res = await sharkApi.put(`/${shark.id}`, { name: shark.name });
  return res.data;
};

export const deleteShark = async (id) => {
  const res = await sharkApi.delete(`/${id}`);
  return res.data;
};
