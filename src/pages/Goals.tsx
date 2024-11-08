import React, { useEffect, useState } from 'react';
import { styled } from '@emotion/styled';
import { Link } from 'react-router-dom';
import goalsService from '../services/goals';
import GoalCard from '../components/GoalCard';
import { Goal } from '../types';
import GoalCreationForm from '../components/GoalCreationForm';

const GoalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Goals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const fetchedGoals = await goalsService.getGoals();
        setGoals(fetchedGoals);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };
    fetchGoals();
  }, []);

  const handleCreateGoal = async (newGoal: Goal) => {
    try {
      const createdGoal = await goalsService.createGoal(newGoal);
      setGoals([...goals, createdGoal]);
      setIsCreatingGoal(false);
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  return (
    <GoalsContainer>
      <h1>My Goals</h1>
      <button onClick={() => setIsCreatingGoal(true)}>Create New Goal</button>
      {isCreatingGoal && (
        <GoalCreationForm onSubmit={handleCreateGoal} onClose={() => setIsCreatingGoal(false)} />
      )}
      <div>
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </GoalsContainer>
  );
};

export default Goals;