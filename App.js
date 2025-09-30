// Stack navigator setup for main app screens
// Case sensitive filenames

import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from "./screens/HomeScreen";
import Routines from "./screens/Routines";
import Slideshow from "./screens/components/Slideshow";
import BoardScreen from "./screens/BoardScreen";
import LibraryScreen from "./screens/LibraryScreen";
import AllBoardsScreen from "./screens/AllBoardsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen 
            name="Home" // main menu screen that app starts at
            component={HomeScreen}
          />
          <Stack.Screen 
            name="Routines" // daily timetable screen, will include a now/next board i think
            component={Routines} 
          />
          <Stack.Screen 
            name="Slideshow" // presentation display for routines
            component={Slideshow} 
          />
          <Stack.Screen 
            name="Now/Next"  // will be able to toggle between now/next and now/next & then
            component={BoardScreen} 
          />
          <Stack.Screen 
            name="LibraryScreen" // attached to atcivity library for list of activity cards
            component={LibraryScreen} 
          />
          <Stack.Screen 
            name="AllBoardsScreen" // attached to library of saved boards
            component={AllBoardsScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView> 
  );
}