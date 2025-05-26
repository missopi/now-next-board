import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, SafeAreaView, Image } from "react-native";
import styles from "./styles/SavedStyles";
import { getBoards, deleteBoard } from "../utilities/BoardStore";

const SavedScreen = ({ boardType, onBoardSelected, onClose }) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const loadBoards = async () => {
      const allBoards = await getBoards();
      const filtered = allBoards.filter((b) => b.type === boardType);
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
            const filtered = updated.filter((b) => b.type === boardType);
            setBoards(filtered);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.boardRow}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => onBoardSelected(item)} style={styles.boardItem}>
          <Text style={styles.boardTitle}>{item.title}</Text>
          <View style={styles.previewRow}>
            {item.cards?.map((card, index) => (
              <View key={index} style={styles.miniCard}>
                {card?.image?.uri && (
                  <Image source={{ uri: card.image.uri }} style={styles.miniCardImage} />
                )}
                <Text style={styles.miniCardText} numberOfLines={1}>{card?.name || 'Empty'}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>x</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Saved Boards</Text>
      <FlatList
        data={boards}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No saved boards yet.</Text>}
      />
      {onClose && (
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default SavedScreen;
