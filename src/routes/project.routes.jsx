import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

import AsyncStorage from '@react-native-community/async-storage';
import {
  TitleIcon, BtnLogout, BtnTxt, BtnView,
} from './styles';

import StackTasks from '../pages/ProjectTasks';
import Project from '../pages/Projects';

const Stack = createStackNavigator();

const ProjectRoutes = ({ navigation }) => {
  const gotoLogin = () => navigation.navigate('Login');

  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
    gotoLogin();
  };

  return (

    <Stack.Navigator>
      <Stack.Screen
        component={Project}
        name="Project"
        options={{
          title: 'Projects',
          headerLeft: () => <TitleIcon><AntDesign name="folderopen" size={45} color="white" /></TitleIcon>,
          headerRight: () => (
            <BtnView>
              <BtnLogout onPress={() => clearAsyncStorage()} title="Info" color="#fff">
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
      <Stack.Screen
        component={StackTasks}
        name="StackTasks"
        options={({ route }) => ({
          headerTitle: `${route.params.prjct.description}`,
          headerLeft: () => <TitleIcon><FontAwesome5 name="tasks" size={40} color="white" /></TitleIcon>,
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
        })}
      />
    </Stack.Navigator>
  );
};

export default ProjectRoutes;
