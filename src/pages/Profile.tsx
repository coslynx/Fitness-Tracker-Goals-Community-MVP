import React, { useEffect, useState, useContext } from 'react';
import { styled } from '@emotion/styled';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import usersService from '../services/users';
import { User } from '../types';
import ProfileUpdateForm from '../components/ProfileUpdateForm';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 100vh;
`;

const Profile: React.FC = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (isLoggedIn) {
          const fetchedUser = await usersService.getUser();
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [isLoggedIn]);

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const updatedUserData = await usersService.updateUser(updatedUser);
      setUser(updatedUserData);
      setIsUpdating(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <ProfileContainer>
      <h1>My Profile</h1>
      {user && (
        <div>
          <img src={user.profilePicture} alt="Profile Picture" />
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => setIsUpdating(true)}>Edit Profile</button>
          {isUpdating && (
            <ProfileUpdateForm onSubmit={handleUpdateUser} onClose={() => setIsUpdating(false)} />
          )}
        </div>
      )}
    </ProfileContainer>
  );
};

export default Profile;