/* eslint-disable react/style-prop-object */
import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppProvider from './src/hooks';

import Routes from './src/routes';

export default function App() {
  return (
    <SafeAreaProvider style={{ paddingTop: 24 }}>
      <StatusBar style="auto" />
      <AppProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
