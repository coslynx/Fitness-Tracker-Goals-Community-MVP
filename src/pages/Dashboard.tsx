import React, { useEffect, useState, useContext } from 'react';
import { styled } from '@emotion/styled';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import GoalCard from '../components/GoalCard';
import WorkoutSummary from '../components/WorkoutSummary';
import { Goal, User, Workout } from '../types';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 100vh;
`;

const Dashboard: React.FC = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [userData, setUserData] = useState<User | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [recentWorkouts, setRecentWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/users/me');
        setUserData(response.data);

        const goalsResponse = await api.get('/goals');
        setGoals(goalsResponse.data);

        const workoutsResponse = await api.get('/workouts/recent');
        setRecentWorkouts(workoutsResponse.data);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  if (!isLoggedIn) {
    return <Link to="/login">Please log in to access the dashboard.</Link>;
  }

  return (
    <DashboardContainer>
      <h2>Welcome, {userData?.name}!</h2>

      <h2>Goals</h2>
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}

      <h2>Recent Workouts</h2>
      {recentWorkouts.map((workout) => (
        <WorkoutSummary key={workout.id} workout={workout} />
      ))}

      <h2>Progress</h2>
      {/* Implement progress charts here using Chart component */}
    </DashboardContainer>
  );
};

export default Dashboard;