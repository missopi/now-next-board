// Stack navigator setup for main app screens
// Case sensitive filenames

import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HeaderBackButton } from '@react-navigation/elements'

import HomeScreen from "./screens/HomeScreen";
import Today from "./screens/Today";
import ChoiceScreen from "./screens/ChoiceScreen";
import BoardScreen from "./screens/BoardScreen";
import ToolsScreen from "./screens/ToolsScreen";
import LibraryScreen from "./screens/LibraryScreen";
import Countdown from "./screens/tools/Countdown";
import TrafficLights from "./screens/tools/TrafficLights";
import Timers from "./screens/tools/Timers";

import CogIcon from "./assets/icons/cog.svg";
import HomeSettings from "./screens/settings/HomeSettings";
import NowNextSettings from "./screens/settings/NowNextSettings";


import { TouchableOpacity } from "react-native";
import SavedScreen from "./screens/savedScreen";

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
          name="Home" // main menu screen that app starts at
          component={HomeScreen}
          options={{
            headerTitle: '',
            headerRight: () => (  // for settings cog icon on top right of screen
              <TouchableOpacity onPress={() => navigation.navigate('HomeSettings')}>
                <CogIcon width={24} height={24} style={{ marginRight: 10 }} />
              </TouchableOpacity>
            ),
          }} 
        />
        <Stack.Screen
          name="SavedScreen" // for saved now/next & choice boards 
          component={SavedScreen}
          options={({ navigation }) => ({
            headerLeft: (props) => (
              <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
            ),
          })}  
        />
        <Stack.Screen 
          name="Today" // daily timetable screen, will include a now/next board i think
          component={Today} 
          options={({ navigation }) => ({
            headerLeft: (props) => ( // back button to only inlcude a '<' and no word 'back'
              <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
            ),
          })}  
        />
        <Stack.Screen 
          name="Choice Boards"  // for multi choice boards eg. snacks
          component={ChoiceScreen} 
          options={({ navigation }) => ({
            headerLeft: (props) => (
              <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
            ),
          })}
        />
        <Stack.Screen 
          name="Now/Next Board"  // will be able to toggle between now/next and now/next & then
          component={BoardScreen} 
          options={({ navigation }) => ({
            headerTransparent: true, 
            headerLeft: (props) => (
              <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
            ),
            headerRight: () => (  // for settings cog icon on top right of screen
              <TouchableOpacity onPress={() => navigation.navigate('NowNextSettings')}>
                <CogIcon width={24} height={24} style={{ marginRight: 10 }} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen 
          name="Tools" // menu screen for countdown etc
          component={ToolsScreen} 
          options={({ navigation }) => ({
            headerLeft: (props) => (
              <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
            ),
          })} 
        />
        <Stack.Screen 
          name="HomeSettings" 
          component={HomeSettings} 
          options={({ navigation }) => ({
            headerLeft: (props) => (
              <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
            ),
          })}
        />
        <Stack.Screen 
          name="NowNextSettings" 
          component={NowNextSettings} 
          options={({ navigation }) => ({
            headerLeft: (props) => (
              <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
            ),
          })}
        />
        <Stack.Screen 
          name="LibraryScreen" // attached to atcivity library for list of activity cards
          component={LibraryScreen} 
          options={({ navigation }) => ({
            headerTransparent: true, 
            headerLeft: (props) => (
              <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
            ),
          })}
        />
        <Stack.Screen 
          name="Countdown" 
          component={Countdown}  // default is 10, tap on screen to reduce
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
          name="TrafficLights" // green - amber - red, tap to progress
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
          name="Timers" // default is 1, 5 & 10 mins
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