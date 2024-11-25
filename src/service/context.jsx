import React, { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [User, setUser] = React.useState(false);
  const value = { User, setUser };

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