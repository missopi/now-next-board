import React, { useLayoutEffect } from 'react';
import { View, Text, Pressable, Button } from 'react-native';
import styles from './styles/styles';
import CustomButton from './styles/CustomButton';
import CogIcon from '../assets/icons/cog.svg';

export default function HomeScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('Settings')} style={{ maarginRight: 15 }}>
          <CogIcon width={24} height={24} />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <CustomButton
        title="Today"
        icon="today"
        onPress={() => navigation.navigate('Today')}
      />
      <CustomButton
        title="Now/Next Board"
        onPress={() => navigation.navigate('Now/Next Board')}
      />
      <CustomButton
        title="Choice Boards"
        onPress={() => navigation.navigate('Choice Boards')}
      />
      <CustomButton
        title="Tools"
        icon="construction"
        onPress={() => navigation.navigate('Tools')}
      />
      <CustomButton
        title="Activity Library"
        onPress={() => navigation.navigate('Library')}
      />
    </View>
  );
}
