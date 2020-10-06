import React from 'react';
// manager routes using Stack, can only acess 1 routes per time
import { createStackNavigator } from '@react-navigation/stack';

import AuthRoutes from './auth.routes';
import TabRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

// Creating component with reactNavigation
const Stack = createStackNavigator();

// Name that we used at  navigator
const RootNavigator = () => {
  // calling the AuthHook, true ou false
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name="Root" component={user ? TabRoutes : AuthRoutes} />
    </Stack.Navigator>
  );
};
export default RootNavigator;
