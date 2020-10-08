import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardRoutes from './dashboard.routes';
import ProjectRoutes from './project.routes';

import ListContext from '../services/ListContext';

const Tab = createBottomTabNavigator();

const AppRoutes = () => (

  <ListContext>

    <Tab.Navigator
      initialRouteName="Project"
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

  </ListContext>
);

export default AppRoutes;
