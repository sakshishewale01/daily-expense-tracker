import React, { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('expense-tracker-token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const savedToken = localStorage.getItem('expense-tracker-token');
      const savedUser = localStorage.getItem('expense-tracker-user');

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };
    bootstrap();
  }, []);

  const login = async (email, password) => {
    const { user: loggedInUser, token: newToken } = await authService.login(email, password);
    persistSession(loggedInUser, newToken);
    return loggedInUser;
  };

  const register = async (name, email, password) => {
    const { user: newUser, token: newToken } = await authService.register(name, email, password);
    persistSession(newUser, newToken);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('expense-tracker-token');
    localStorage.removeItem('expense-tracker-user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('expense-tracker-user', JSON.stringify(updatedUser));
  };

  const persistSession = (userData, newToken) => {
    localStorage.setItem('expense-tracker-token', newToken);
    localStorage.setItem('expense-tracker-user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, updateUser, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within an AuthProvider');
  return ctx;
}
