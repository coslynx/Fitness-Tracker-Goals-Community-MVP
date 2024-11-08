import { createContext } from 'react';
import useAuth from './useAuth';

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
});

export default AuthContext;