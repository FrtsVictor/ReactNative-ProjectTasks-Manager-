/* eslint-disable react/prop-types */
/* eslint-disable import/named */
import React from 'react';

import { AuthProvider } from './auth';

const AppProvider = ({ children }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
);

export default AppProvider;
