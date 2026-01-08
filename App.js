// Stack navigator setup for main app screens
// Case sensitive filenames

import { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity, View, useWindowDimensions } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as SplashScreen from 'expo-splash-screen';

import AllBoardsScreen from "./screens/AllBoardsScreen";
import Routines from "./screens/Routines";
import Slideshow from "./screens/components/Slideshow";
import BoardScreen from "./screens/BoardScreen";
import LibraryScreen from "./screens/LibraryScreen";
import FinishedNowNext from "./screens/FinishedBoards/FinishedNowNext";
import FinshedRoutine from "./screens/FinishedBoards/FinishedRoutine";

import Add from "./assets/icons/add.svg";
import Word from "./assets/andThen-word.svg";

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const { width, height } = useWindowDimensions();
  const shorter = Math.min(width, height);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const lockPhonePortrait = async () => {
      const isLargeScreen = shorter >= 600; // let tablets and larger devices rotate
      try {
        if (isLargeScreen) {
          await ScreenOrientation.unlockAsync();
        } else {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        }
      } catch (error) {
        console.warn('Could not adjust global orientation lock', error);
      }
    };

    lockPhonePortrait();
  }, [shorter]);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Keep splash visible until the first layout is ready.
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const scale = Math.min(Math.max(shorter / 430, 1), 1.6);
  const iconSize = 30 * scale;
  const headerSpace = 10 * scale;
  const wordWidth = 190 * scale; 

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{ headerMode: 'screen' }}
          >
            <Stack.Screen 
              name="Home" 
              component={AllBoardsScreen}
              options={({ navigation }) => ({ 
                headerTitle: '',
                headerStyle: {
                  height: 72 + headerSpace * 3,
                  backgroundColor: '#0792e2ff',
                },
                headerLeft: () => (
                  <View style={{ pointerEvents: 'none' }}>
                    <Word width={wordWidth} height={iconSize} style={{ marginLeft: 8, marginBottom: 9 }} />
                  </View>
                ),
                headerRight: () => (
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 9, marginRight: 20 }}>
                    <TouchableOpacity onPress={() => navigation.setParams({ showAddModal: true })}>
                      <Add width={iconSize} height={iconSize} style={{ marginRight: 5 }} />
                    </TouchableOpacity>
                  </View>
                ),
              })}
            />
            <Stack.Screen 
              name="Routines" 
              component={Routines}
              options={() => ({
              headerTransparent: true,
              headerShown: false,
              })}
            />
            <Stack.Screen 
              name="FinishedRoutine" 
              component={FinshedRoutine}
              options={() => ({
              headerTransparent: true,
              headerShown: false,
              })}
            />
            <Stack.Screen name="Slideshow" component={Slideshow} />
            <Stack.Screen 
              name="Now/Next" 
              component={BoardScreen}
              options={() => ({
              headerTransparent: true,
              headerShown: false,
              })}
            />
            <Stack.Screen 
              name="FinishedNowNext" 
              component={FinishedNowNext}
              options={() => ({
              headerTransparent: true,
              headerShown: false,
              })}
            />
            <Stack.Screen 
              name="LibraryScreen" 
              component={LibraryScreen}
              options={() => ({
              headerTransparent: true,
              headerShown: false,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView> 
  );
}
