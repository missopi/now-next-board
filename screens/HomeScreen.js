import { useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles/styles';
import AndNext from "../assets/andNext-logo";

export default function HomeScreen({ navigation }) {
  const modalRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 40 }}> 
        <AndNext width={280} height={250}/>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Routines')}>
          <Text style={styles.buttonText}>Routines</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Now/Next')}>
          <Text style={styles.buttonText}>Now & Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AllBoardsScreen')}>
          <Text style={styles.buttonText}>Saved Boards</Text>  
        </TouchableOpacity>
      </View>
    </View>
  );
}
