import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Laravel backend URL
});

export const register = (data) => api.post('/register', data);
export const login = (data) => api.post('/login', data);
export const logout = () => api.post('/logout', {}, { headers: authHeader() });
export const getUser = () => api.get('/user', { headers: authHeader() });

function Api() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}


export default Api