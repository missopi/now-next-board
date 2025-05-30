// This screen allows users to either create a new NowNext board or load a previously saved one

import { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
import SavedScreen from "../savedScreen";
import styles from "../styles/NowNextBoardStyles";

export default function RoutineChooser({ navigation }) {
  const [newBoardTitle, setNewBoardTitle] = useState('');

  return (
    <SafeAreaView style={styles.chooserContainer}>
      <View style={styles.chooserTop}>
        <TextInput
          placeholder="Enter new routine title..."
          value={newBoardTitle}
          onChangeText={setNewBoardTitle}
          style={styles.chooserTextInput}
          placeholderTextColor={"#aaa"}
        />
        <TouchableOpacity
          onPress={() => {
            if (!newBoardTitle.trim()) {
              alert('Please enter a title for your new routine.');
              return;
            }
            navigation.navigate('Routines', { 
              mode: 'new',
              initialTitle: newBoardTitle.trim(), 
            });
          }}
          style={styles.chooserCreateButton}
        >
          <Text style={styles.chooserCreateText}>Create New Routine</Text>
        </TouchableOpacity>
      </View>

      <SavedScreen
        boardType="routine"
        onBoardSelected={(board) => {
          navigation.navigate('Routines', {
            mode: 'load',
            board,
          });
        }}
      />
    </SafeAreaView>
  );
}