import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HeaderBackButton } from '@react-navigation/elements'

import HomeScreen from "./screens/HomeScreen";
import Today from "./screens/Today";
import ChoiceScreen from "./screens/ChoiceScreen";
import BoardScreen from "./screens/BoardScreen";
import ToolsScreen from "./screens/ToolsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LibraryScreen from "./screens/LibraryScreen";
import Countdown from "./screens/tools/Countdown";
import TrafficLights from "./screens/tools/TrafficLights";
import Timers from "./screens/tools/Timers";

import CogIcon from "./assets/icons/cog.svg";
import { TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerBackTitleVisible: false,
          headerTitle: '',
          headerTintColor: '#000',
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerTitle: '',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <CogIcon width={24} height={24} style={{ marginRight: 16 }} />
              </TouchableOpacity>
            ),
          }} 
        />
        <Stack.Screen 
          name="Today" 
          component={Today} 
          options={({ navigation }) => ({
            headerLeft: (props) => (
              <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
            ),
          })}  
        />
        <Stack.Screen 
          name="Choice Boards" 
          component={ChoiceScreen} 
          options={({ navigation }) => ({
            headerLeft: (props) => (
              <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
            ),
          })}
        />
        <Stack.Screen 
          name="Now/Next Board" 
          component={BoardScreen} 
          options={({ navigation }) => ({
            headerLeft: (props) => (
              <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
            ),
          })}
        />
        <Stack.Screen 
          name="Tools" 
          component={ToolsScreen} 
          options={({ navigation }) => ({
            headerLeft: (props) => (
              <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
            ),
          })} 
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={({ navigation }) => ({
            headerLeft: (props) => (
              <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
            ),
          })}
        />
        <Stack.Screen 
          name="Library" 
          component={LibraryScreen} 
          options={({ navigation }) => ({
            headerLeft: (props) => (
              <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
            ),
          })}
        />
        <Stack.Screen 
          name="Countdown" 
          component={Countdown} 
          options={({ navigation }) => ({
            headerTransparent: true, 
            headerLeft: (props) => (
              <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
            ), 
            headerShadowVisible: false, 
            headerTintColor: '#fff'
          })} 
        />
        <Stack.Screen 
          name="Traffic Lights" 
          component={TrafficLights} 
          options={({ navigation }) => ({
            headerTransparent: true, 
            headerLeft: (props) => (
              <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} tintColor="rgba(0,0,0,0.25)" />
            ), 
            headerShadowVisible: false
          })} 
        />
        <Stack.Screen 
          name="Timers" 
          component={Timers} 
          options={({ navigation }) => ({
            headerTransparent: true, 
            headerLeft: (props) => (
              <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
            ), 
            headerShadowVisible: false, 
            headerTintColor: '#fff'
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}