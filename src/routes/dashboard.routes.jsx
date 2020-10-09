import React from 'react';

import { AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';

import {
  TitleIcon,
  BtnLogout, BtnTxt, BtnView,
} from './styles';

import { useAuth } from '../hooks/auth';

const Stack = createStackNavigator();

const DashboardRoutes = () => {
  const { signOut } = useAuth();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard',
          headerLeft: () => <TitleIcon><AntDesign name="barschart" size={45} color="white" /></TitleIcon>,
          headerRight: () => (
            <BtnView>
              <BtnLogout onPress={() => signOut()} title="Info" color="#fff">
                <BtnTxt>Logout</BtnTxt>
              </BtnLogout>
            </BtnView>
          ),
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
};

export default DashboardRoutes;
