import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/login';

const Auth = createStackNavigator();

const AuthRoutes = () => (
  <Auth.Navigator>
    <Auth.Screen name="Login" component={Login} />
  </Auth.Navigator>
);

export default AuthRoutes;
