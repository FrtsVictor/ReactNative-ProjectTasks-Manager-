import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import Project from '../pages/Projects';
import Dashboard from '../pages/Dashboard';

import StackTasks from '../pages/ProjectTasks';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProjectRoutes = () => (
  <Stack.Navigator>
    <Stack.Screen
      component={Project}
      name="Project"
      options={{
        title: 'Project',
        headerLeft: () => <AntDesign name="profile" size={50} color="white" />,
        headerStyle: {
          backgroundColor: '#457ae6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          textAlignVertical: 'center',
          fontWeight: 'bold',
        },
      }}
    />
    <Stack.Screen component={StackTasks} name="StackTasks" />
  </Stack.Navigator>
);

const AppRoutes = () => (

  <Tab.Navigator
    initialRouteName="Project"

  >

    <Tab.Screen
      name="Project"
      component={ProjectRoutes}
      options={{
        tabBarIcon: () => (
          <Ionicons name="ios-podium" size={32} color="black" />
        ),
      }}
    />

    <Tab.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        tabBarIcon: () => (
          <Ionicons name="ios-list-box" size={32} color="black" />
        ),
      }}
    />
  </Tab.Navigator>

);

export default AppRoutes;
