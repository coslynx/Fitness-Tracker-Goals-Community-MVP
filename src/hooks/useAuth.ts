import { useState, useEffect, createContext, useContext } from 'react';
import authService from '../services/auth';
import { User } from '../types';

interface AuthContextProps {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
});

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const fetchedUser = await authService.getUser();
          setUser(fetchedUser);
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Error fetching user data:', error);
          localStorage.removeItem('token');
          setUser(null);
          setIsLoggedIn(false);
        }
      }
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const loginData = await authService.login(email, password);
      localStorage.setItem('token', loginData.token);
      setUser(loginData.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return { user, isLoggedIn, login, logout };
};

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default useAuth;
export { AuthContext, AuthProvider };