// Stack navigator setup for main app screens
// Case sensitive filenames

import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HeaderBackButton } from '@react-navigation/elements'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from "./screens/HomeScreen";
import Routines from "./screens/Routines";
import ChoiceScreen from "./screens/ChoiceScreen";
import BoardScreen from "./screens/BoardScreen";
import ToolsScreen from "./screens/ToolsScreen";
import LibraryScreen from "./screens/LibraryScreen";
import Countdown from "./screens/tools/Countdown";
import TrafficLights from "./screens/tools/TrafficLights";
import Timers from "./screens/tools/Timers";
import AllBoardsScreen from "./screens/AllBoardsScreen";

import FeelingsBoard from "./screens/choice_boards/FeelingsBoard";
import CreatedFeelingsBoard from "./screens/choice_boards/CreatedFeelingsBoard";
import WantBoard from "./screens/choice_boards/WantBoard";
import NeedsBoard from "./screens/choice_boards/NeedsBoard";
import AnswerCard from "./screens/components/AnswerCard";
import Slideshow from "./screens/components/Slideshow";

import NowNextBoardChooser from "./screens/components/NowNextBoardChooser";

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
            options={{
              headerTitle: '',
            }} 
          />
          <Stack.Screen 
            name="Routines" // daily timetable screen, will include a now/next board i think
            component={Routines} 
            options={({ navigation }) => ({
              headerTransparent: true,
              headerLeft: (props) => ( // back button to only inlcude a '<' and no word 'back'
                <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
              ),
            })}  
          />
          <Stack.Screen 
            name="Slideshow" // presentation display for routines etc
            component={Slideshow} 
            options={({ navigation }) => ({
              headerTransparent: true,
              headerShadowVisible: false,
              headerBackTitleVisible: false,
            })}  
          />
          <Stack.Screen 
            name="Choices"  // for multi choice boards eg. snacks
            component={ChoiceScreen} 
            options={({ navigation }) => ({
              headerLeft: (props) => (
                <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
              ),
            })}
          />
          <Stack.Screen 
            name="FeelingsBoard"  // for multi choice boards eg. snacks
            component={FeelingsBoard} 
            options={({ navigation }) => ({
              headerLeft: (props) => (
                <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
              ),
            })}
          />
          <Stack.Screen 
            name="CreatedFeelingsBoard"  // for multi choice boards eg. snacks
            component={CreatedFeelingsBoard} 
            options={({ navigation }) => ({
              headerLeft: (props) => (
                <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
              ),
            })}
          />
          <Stack.Screen 
            name="NeedsBoard"  // for multi choice boards eg. snacks
            component={NeedsBoard} 
            options={({ navigation }) => ({
              headerLeft: (props) => (
                <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
              ),
            })}
          />
          <Stack.Screen 
            name="WantBoard"  // for multi choice boards eg. snacks
            component={WantBoard} 
            options={({ navigation }) => ({
              headerLeft: (props) => (
                <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
              ),
            })}
          />
          <Stack.Screen 
            name="AnswerCard"  // for yes/no/i don't know
            component={AnswerCard} 
            options={({ navigation }) => ({
              headerLeft: (props) => (
                <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
              ),
            })}
          />
          <Stack.Screen 
            name="Now/Next"  // will be able to toggle between now/next and now/next & then
            component={BoardScreen} 
            options={({ navigation }) => ({
              headerTransparent: true, 
              headerLeft: (props) => (
                <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
              ),
            })}
          />
          <Stack.Screen 
            name="NowNextBoardChooser"  // will be able to toggle between now/next and now/next & then
            component={NowNextBoardChooser} 
            options={({ navigation }) => ({
              headerTransparent: true, 
              headerLeft: (props) => (
                <HeaderBackButton {...props} labelVisible={false} onPress={() => navigation.goBack()} />
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
            name="AllBoardsScreen" // attached to library of saved boards
            component={AllBoardsScreen} 
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
    </GestureHandlerRootView> 
  );
}