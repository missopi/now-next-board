// This screen allows users to either create a new NowNext board or load a previously saved one

import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput, SafeAreaView } from "react-native";
import { getBoards } from "../../utilities/BoardStore";
import SavedScreen from "../savedScreen";
import styles from "../styles/NowNextBoardStyles";

export default function NowNextBoardChooser({ navigation }) {
  const [boards, setBoards] = useState([]);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [showSavedScreen, setShowSavedScreen] = useState(false);

  useEffect(() => {
    const loadBoards = async () => {
      const all = await getBoards();
      const filtered = all.filter(b => b.type === 'nowNextThen');
      setBoards(filtered);
    };
    loadBoards();
  }, []);

  return (
    <SafeAreaView style={styles.chooserContainer}>
      <TextInput
        placeholder="Enter new board title..."
        value={newBoardTitle}
        onChangeText={setNewBoardTitle}
        style={styles.chooserTextInput}
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

      <TouchableOpacity onPress={() => setShowSavedScreen(true)}>
        <Text style={styles.chooserLoadText}>Load Saved Board</Text>
      </TouchableOpacity>
      
      {/*<FlatList
        data={boards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Now/Next', { mode: 'load', board: item })}
            style={{ padding: 12, backgroundColor: '#eee', marginBottom: 10 }}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />*/}

      {showSavedScreen && (
        <SavedScreen
          boardType="nowNextThen"
          onBoardSelected={(board) => {
            navigation.navigate('Now/Next', {
              mode: 'load',
              board,
            });
            setShowSavedScreen(false);
          }}
          onClose={() => setShowSavedScreen(false)}
        />
      )}
    </SafeAreaView>
  );
}