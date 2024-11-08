import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
});

const getUser = async () => {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

const getGoals = async () => {
  try {
    const response = await api.get('/goals');
    return response.data;
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }
};

const createGoal = async (goalData: { name: string; targetDate: Date; type: string }) => {
  try {
    const response = await api.post('/goals', goalData);
    return response.data;
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
};

const getWorkouts = async () => {
  try {
    const response = await api.get('/workouts');
    return response.data;
  } catch (error) {
    console.error('Error fetching workouts:', error);
    throw error;
  }
};

const createWorkout = async (workoutData: { type: string; duration: number; intensity: number }) => {
  try {
    const response = await api.post('/workouts', workoutData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access: Please login again.');
    } else if (error.response && error.response.status >= 500) {
      console.error('Server error: Please try again later.');
    } else {
      console.error('Error creating workout:', error);
    }
    throw error;
  }
};

export default api;