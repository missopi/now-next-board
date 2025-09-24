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
import Countdown from "./screens/tools/Countdown";
import TrafficLights from "./screens/tools/TrafficLights";
import Timers from "./screens/tools/Timers";
import AllBoardsScreen from "./screens/AllBoardsScreen";
import FeelingsBoard from "./screens/choice_boards/FeelingsBoard";
import CreatedFeelingsBoard from "./screens/choice_boards/CreatedFeelingsBoard";
import WantBoard from "./screens/choice_boards/WantBoard";
import NeedsBoard from "./screens/choice_boards/NeedsBoard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerTransparent: true,
            headerBackTitleVisible: false,
            headerTitle: '',
            headerTintColor: '#000',
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
            options={() => ({
              headerTransparent: true,
              headerShadowVisible: false,
            })}  
          />
          <Stack.Screen 
            name="FeelingsBoard" 
            component={FeelingsBoard} 
          />
          <Stack.Screen 
            name="CreatedFeelingsBoard" 
            component={CreatedFeelingsBoard} 
          />
          <Stack.Screen 
            name="NeedsBoard" 
            component={NeedsBoard} 
          />
          <Stack.Screen 
            name="WantBoard"  
            component={WantBoard} 
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
          <Stack.Screen 
            name="Countdown" 
            component={Countdown}  // default is 10, tap on screen to reduce
            options={() => ({
              headerTransparent: true, 
              headerShadowVisible: false, 
              headerTintColor: '#fff'
            })} 
          />
          <Stack.Screen 
            name="TrafficLights" // green - amber - red, tap to progress
            component={TrafficLights} 
            options={() => ({
              headerTransparent: true, 
              headerShadowVisible: false
            })} 
          />
          <Stack.Screen 
            name="Timers" // default is 1, 5 & 10 mins
            component={Timers} 
            options={() => ({
              headerTransparent: true, 
              headerShadowVisible: false, 
              headerTintColor: '#fff'
            })} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView> 
  );
}