import { useEffect, useState } from "react";
import { Text, FlatList, TouchableOpacity } from "react-native";
import { getBoards } from "./components/BoardStore";


const SavedScreen = ({ onBoardSelected }) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const all = await getBoards();
      setBoards(all);
    };
    fetchBoards();
  }, []);

  return (
    <FlatList
      data={boards}
      keyExtractor={(b) => b.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onBoardSelected(item)}>
          <Text>{item.title} ({item.type})</Text>
        </TouchableOpacity>
      )}
    />
  );
};
