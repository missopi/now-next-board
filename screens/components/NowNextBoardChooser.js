// This screen allows users to either create a new NowNext board or load a previously saved one

import { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
import SavedScreen from "../savedScreen";
import styles from "../styles/NowNextBoardStyles";

export default function NowNextBoardChooser({ navigation }) {
  const [newBoardTitle, setNewBoardTitle] = useState('');

  return (
    <SafeAreaView style={styles.chooserContainer}>
      <View style={styles.chooserTop}>
        <TextInput
          placeholder="Enter new board title..."
          value={newBoardTitle}
          onChangeText={setNewBoardTitle}
          style={styles.chooserTextInput}
          placeholderTextColor={"#aaa"}
        />
        <TouchableOpacity
          onPress={() => {
            if (!newBoardTitle.trim()) {
              alert('Please enter a title for your new board.');
              return;
            }
            navigation.navigate('Now/Next', { 
              mode: 'new',
              initialTitle: newBoardTitle.trim(), 
            });
          }}
          style={styles.chooserCreateButton}
        >
          <Text style={styles.chooserCreateText}>Create New Board</Text>
        </TouchableOpacity>
      </View>

      <SavedScreen
        boardType="nowNextThen"
        onBoardSelected={(board) => {
          navigation.navigate('Now/Next', {
            mode: 'load',
            board,
          });
        }}
      />
    </SafeAreaView>
  );
}