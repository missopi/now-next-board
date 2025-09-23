import { useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles/styles';
import CustomButton from './styles/CustomButton';
import CogIcon from '../assets/icons/cog.svg';
import Timer from '../assets/icons/timer.svg';
import { Modalize } from 'react-native-modalize';

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
        <TouchableOpacity style={styles.timerButton} onPress={() => navigation.navigate('Timers')}>
          <Timer width={70} height={70} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.trafficButton} onPress={() => navigation.navigate('TrafficLights')}>
          <View style={{ flex: 1, backgroundColor: "#7dbf7d" }} />
          <View style={{ flex: 1, backgroundColor: "#e0a958" }} />
          <View style={{ flex: 1, backgroundColor: "#d96c6c" }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.countdownButton} onPress={() => navigation.navigate('Countdown')}>
          <Text style={styles.ten}>10</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.savedButton} onPress={() => navigation.navigate('AllBoardsScreen')}>
          <Text style={styles.savedText}>Saved Boards</Text>  
        </TouchableOpacity>
        {/*<TouchableOpacity style={styles.settingButton} onPress={() => modalRef.current?.open()}>
          <CogIcon width={70} height={70} style={{ color: '#fff' }} />
        </TouchableOpacity>*/}
      </View>
      

      <Modalize
        ref={modalRef}
        modalHeight={250}
        handlePosition="inside"
        handleStyle={styles.handle}
        modalStyle={styles.modal}
      >
        <View style={{ height: 15 }} />

        <View style={styles.modalView}>
        </View>
      </Modalize>
    </View>
  );
}
