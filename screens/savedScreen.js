import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image, ScrollView } from "react-native";
import styles from "./styles/SavedStyles";
import { getBoards, deleteBoard } from "../utilities/BoardStore";

export default function SavedScreen({ boardType, onBoardSelected }) {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const loadBoards = async () => {
      const all = await getBoards();
      const filtered = all.filter((b) => b.type === boardType);
      setBoards(filtered);
    };
    loadBoards();
  }, [boardType]);

  const handleDelete = (boardId) => {
    Alert.alert(
      'Delete Board',
      'Are you sure you want to delete this board?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updated = await deleteBoard(boardId);
            setBoards(updated.filter((b) => b.type === boardType));
          },
        },
      ]
    );
  };

  const renderBoard = (board) => (
    <View key={board.id} style={styles.boardBlock}>
      <View style={styles.boardHeader}>
        <Text style={styles.boardTitle}>{board.title}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(board.id)}>
          <Text style={styles.deleteText}>x</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {board.cards.map((card, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.cardPreview}
            onPress={() => onBoardSelected(board)}
          >
            <Image 
              source={typeof card.image === 'string' ? { uri: card.image } : card.image} 
              style={styles.cardImage} />
            <Text style={styles.cardLabel}>{card.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Saved Boards</Text>
      {boards.length === 0 ? (
        <Text style={styles.emptyText}>No saved boards yet</Text>
      ) : (
        boards.map(renderBoard)
      )}
    </ScrollView>
  );
};
