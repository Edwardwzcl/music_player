// UserProvider.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext(); // Export the context

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ username: null, email: null });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
