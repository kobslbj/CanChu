"use client";

import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}


// eslint-disable-next-line react/prop-types
export function UserProvider({ children }) {
  const [userData, setUserData] = useState({});
  const [isLoadingUser, setIsLoadingUser] = useState(true); 
  return (
    // eslint-disable-next-line react/react-in-jsx-scope, react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ userData, setUserData , isLoadingUser , setIsLoadingUser}}>
      {children}
    </UserContext.Provider>
  );
}
