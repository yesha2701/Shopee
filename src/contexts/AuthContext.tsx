import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Keychain from 'react-native-keychain';

type AuthContextType = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  username: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        setIsLoggedIn(!!credentials);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    await Keychain.setGenericPassword(email, password);
    setUsername(email);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
