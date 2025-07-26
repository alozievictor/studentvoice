import React, { createContext, useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  // Initialize state from localStorage if available, otherwise default to null
  const [User, setUser] = React.useState(() => {
    const savedUser = localStorage.getItem('studentVoiceUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Initialize feedbacks in localStorage if not already present
  useEffect(() => {
    if (!localStorage.getItem('studentVoiceFeedbacks')) {
      localStorage.setItem('studentVoiceFeedbacks', JSON.stringify([]));
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (User) {
      localStorage.setItem('studentVoiceUser', JSON.stringify(User));
    } else {
      localStorage.removeItem('studentVoiceUser');
    }
  }, [User]);

  const value = { 
    User, 
    setUser,
    logout: () => {
      setUser(null);
      localStorage.removeItem('studentVoiceUser');
    }
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const UseAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("Use context within a context provider");
  }
  return context;
};

export { UseAppContext, AppContextProvider };