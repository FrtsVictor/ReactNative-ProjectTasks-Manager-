import React from 'react';

import { AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';

import { TitleIcon } from './styles';

const Stack = createStackNavigator();

const DashboardRoutes = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        title: 'Dashboard',
        headerLeft: () => <TitleIcon><AntDesign name="barschart" size={45} color="white" /></TitleIcon>,
        headerStyle: {
          backgroundColor: '#457ae6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 26,
          marginBottom: 20,
          marginLeft: 10,
        },
      }}
    />
  </Stack.Navigator>
);

export default DashboardRoutes;
