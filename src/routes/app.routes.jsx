import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Project from '../pages/Projects';
import Task from '../pages/ProjectTasks';

const Tab = createBottomTabNavigator();

const AppRoutes = () => (

  <Tab.Navigator
    initialRouteName="Project"
  >
    <Tab.Screen
      name="Project"
      component={Project}
      options={{
        tabBarIcon: () => (
          <Ionicons name="ios-podium" size={32} color="black" />
        ),
      }}
    />

    <Tab.Screen
      name="Task"
      component={Task}
      options={{
        tabBarIcon: () => (
          <Ionicons name="ios-list-box" size={32} color="black" />
        ),
      }}
    />
  </Tab.Navigator>

);

export default AppRoutes;
