// Stack navigator setup for main app screens
// Case sensitive filenames

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AllBoardsScreen from "./screens/AllBoardsScreen";
import Routines from "./screens/Routines";
import Slideshow from "./screens/components/Slideshow";
import BoardScreen from "./screens/BoardScreen";
import LibraryScreen from "./screens/LibraryScreen";
import FinishedNowNext from "./screens/FinishedBoards/FinishedNowNext";
import FinshedRoutine from "./screens/FinishedBoards/FinishedRoutine";

import Add from "./assets/icons/add.svg";
import Word from "./assets/andNext-word.svg";

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
                headerLeft: () => (
                  <View style={{ pointerEvents: 'none' }}>
                    <Word width={180} height={28} style={{ marginLeft: 8, marginBottom: 9 }} />
                  </View>
                ),
                headerRight: () => (
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 9, marginRight: 20 }}>
                    <TouchableOpacity onPress={() => navigation.setParams({ showAddModal: true })}>
                      <Add width={28} height={28} style={{ marginRight: 10 }} />
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
