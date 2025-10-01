import { useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles/styles';
import AndNext from "../assets/andNext-logo";

export default function HomeScreen({ navigation }) {
  const modalRef = useRef(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Now/Next')}>
        <AndNext width={280} />
      </TouchableOpacity>
    </View>
  );
}
