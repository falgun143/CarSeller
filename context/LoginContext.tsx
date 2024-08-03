"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

interface LoginContextProps {
  login: boolean;
  setLogin: (value: boolean) => void;
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginProvider = ({ children,initialLogin }: { children: ReactNode, initialLogin: boolean }) => {
  const [login, setLogin] = useState(initialLogin);

  
  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};
