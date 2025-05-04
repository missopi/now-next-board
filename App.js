import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from "./screens/HomeScreen";
import Today from "./screens/Today";
import ChoiceScreen from "./screens/ChoiceScreen";
import BoardScreen from "./screens/BoardScreen";
import ToolsScreen from "./screens/ToolsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LibraryScreen from "./screens/LibraryScreen";
import CountdownContainer from "./screens/tools/CountdownContainer";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Today" component={Today} />
        <Stack.Screen name="Choice Boards" component={ChoiceScreen} />
        <Stack.Screen name="Now/Next Board" component={BoardScreen} />
        <Stack.Screen name="Tools" component={ToolsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Library" component={LibraryScreen} />
        <Stack.Screen name="CountdownContainer" component={CountdownContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}