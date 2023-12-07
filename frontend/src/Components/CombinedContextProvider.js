// CombinedContextProvider.js
import React from 'react';
import { UserProvider } from './UserProvider';
import { MusicProvider } from './MusicProvider';

export const CombinedContextProvider = ({ children }) => {
  return (
    <UserProvider>
        <MusicProvider>
          {children}
        </MusicProvider>
    </UserProvider>
  );
};
