import { createContext } from 'react';
import { AuthImpl } from './store/auth';

export const auth = new AuthImpl();
export const AuthContext = createContext(auth);
export const AuthProvider = AuthContext.Provider;
