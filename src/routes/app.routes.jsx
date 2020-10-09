import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardRoutes from './dashboard.routes';
import ProjectRoutes from './project.routes';

import UserProvider from '../context/userContext';

const Tab = createBottomTabNavigator();

const AppRoutes = () => (

  <UserProvider>

    <Tab.Navigator
      initialRouteName="Project"
      tabBarOptions={{
        style: {
          backgroundColor: '#e6f0ff',
        },
      }}
    >

      <Tab.Screen
        name="Project"
        component={ProjectRoutes}
        options={{
          color: 'black',
          tabBarIcon: () => (
            <AntDesign name="folderopen" size={30} color="blue" />
          ),
        }}
      />

      <Tab.Screen
        name="Dashboard"
        component={DashboardRoutes}
        options={{
          color: 'black',
          tabBarIcon: () => (
            <AntDesign name="barschart" size={35} color="blue" />
          ),
        }}
      />
    </Tab.Navigator>

  </UserProvider>
);

export default AppRoutes;
