"use client";

import { createContext, useContext, useState } from 'react';

const FriendContext = createContext();

export function useFriendContext() {
  return useContext(FriendContext);
}


// eslint-disable-next-line react/prop-types
export function FriendProvider({ children }) {
  const [friendData, setfriendData] = useState({});
  const [isLoadingUser, setIsLoadingUser] = useState(true); 
  return (
    // eslint-disable-next-line react/react-in-jsx-scope, react/jsx-no-constructed-context-values
    <FriendContext.Provider value={{ friendData, setfriendData,isLoadingUser , setIsLoadingUser }}>
      {children}
    </FriendContext.Provider>
  );
}

