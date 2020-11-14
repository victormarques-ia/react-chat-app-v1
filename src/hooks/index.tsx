import React from 'react';

import { AuthProvider } from './auth';
import { SocketProvider } from './socketProvider';

const AppProvider: React.FC = ({ children }) => (
  <SocketProvider>
    <AuthProvider>
      {children}
    </AuthProvider>
  </SocketProvider>
);

export default AppProvider;