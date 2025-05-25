import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput } from "react-native";
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
    <View style={{ flex: 1, padding: 20 }}>
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
        style={{ backgroundColor: '#000', padding: 12, marginBottom: 20 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Create New Board</Text>
      </TouchableOpacity>

      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Saved Boards</Text>

      <FlatList
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
      />

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
    </View>
  );
}