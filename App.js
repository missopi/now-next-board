// Stack navigator setup for main app screens
// Case sensitive filenames

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity, View } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import Routines from "./screens/Routines";
import Slideshow from "./screens/components/Slideshow";
import BoardScreen from "./screens/BoardScreen";
import LibraryScreen from "./screens/LibraryScreen";

import Search from "./assets/icons/search.svg";
import Add from "./assets/icons/add.svg";
import Word from "./assets/andNext-word.svg";

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
            headerTitle: '',
            headerLeft: () => (
              <Word width={180} height={180} style={{ marginLeft: 8 }} />

            ),
            headerRight: () => (  // for settings cog icon on top right of screen
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                  <Add width={28} height={28} style={{ marginRight: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                  <Search width={28} height={28} style={{ }} />
                </TouchableOpacity>
              </View>
            ),
          }}  
          />
          <Stack.Screen 
            name="Routines" 
            component={Routines}
            options={() => ({
            headerTransparent: true,
            headerTitle: '',
            })}
          />
          <Stack.Screen name="Slideshow" component={Slideshow} />
          <Stack.Screen 
            name="Now/Next" 
            component={BoardScreen}
            options={() => ({
            headerTransparent: true,
            headerTitle: '',
            })}
          />
          <Stack.Screen name="LibraryScreen" component={LibraryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView> 
  );
}