import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RouteDrawer from './components/RouteDrawer';

const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='landingpage' component={RouteDrawer} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}