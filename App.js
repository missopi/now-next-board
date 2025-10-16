// Stack navigator setup for main app screens
// Case sensitive filenames

import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from "./screens/HomeScreen";
import Routines from "./screens/Routines";
import Slideshow from "./screens/components/Slideshow";
import BoardScreen from "./screens/BoardScreen";
import LibraryScreen from "./screens/LibraryScreen";
import AllBoardsScreen from "./screens/AllBoardsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                opacity: current.progress,
              },
            }),
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Routines" component={Routines} />
          <Stack.Screen name="Slideshow" component={Slideshow} />
          <Stack.Screen name="Now/Next" component={BoardScreen} />
          <Stack.Screen name="LibraryScreen" component={LibraryScreen} />
          <Stack.Screen name="AllBoardsScreen" component={AllBoardsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView> 
  );
}