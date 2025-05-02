import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from "./screens/HomeScreen";
import BoardScreen from "./screens/BoardScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LibraryScreen from "./screens/LibraryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Board" component={BoardScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Library" component={LibraryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}