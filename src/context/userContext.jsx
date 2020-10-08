/* eslint-disable no-nested-ternary */

import React, {
  createContext, useState, useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

export const UserContext = createContext({});

const ListProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  const loadUser = async () => {
    const resp = await AsyncStorage.getItem('@TODO:user');
    setUser(resp);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{
      user,
    }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
