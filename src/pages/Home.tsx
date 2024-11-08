import React, { useContext } from 'react';
import { styled } from '@emotion/styled';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthContext';

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Home: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <HeroContainer>
      <h1>Welcome to Fitness Tracker</h1>
      <p>Track your fitness journey, set goals, and stay motivated.</p>

      {!isLoggedIn ? (
        <>
          <Link to="/login">
            <Button text="Login" variant="primary" />
          </Link>
          <Link to="/signup">
            <Button text="Signup" variant="secondary" />
          </Link>
        </>
      ) : (
        <Link to="/dashboard">
          <Button text="Go to Dashboard" variant="primary" />
        </Link>
      )}
    </HeroContainer>
  );
};

export default Home;