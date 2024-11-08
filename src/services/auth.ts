import api from './api';
import { User } from '../types';

const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      const userData = await api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });
      return { user: userData.data, token: response.data.token };
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
  logout: async () => {
    try {
      localStorage.removeItem('token');
      return true;
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },
  getUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }
      const response = await api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },
};

export default authService;