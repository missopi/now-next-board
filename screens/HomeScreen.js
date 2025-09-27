import { useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles/styles';

export default function HomeScreen({ navigation }) {
  const modalRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

      return () => {
        ScreenOrientation.unlockAsync();
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.routinesButton} onPress={() => navigation.navigate('Routines')}>
          <Text style={styles.routineText}>Routines</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nowButton} onPress={() => navigation.navigate('Now/Next')}>
          <Text style={styles.savedText}>Now & Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.savedButton} onPress={() => navigation.navigate('AllBoardsScreen')}>
          <Text style={styles.savedText}>Saved Boards</Text>  
        </TouchableOpacity>
      </View>
    </View>
  );
}
