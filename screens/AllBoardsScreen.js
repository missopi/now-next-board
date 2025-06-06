import { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { getBoards, deleteBoard } from '../utilities/BoardStore';

const screenWidth = Dimensions.get('window').width;
const cardSize = screenWidth * 0.25;

const TABS = ['All', 'Now/Next', 'Routine', 'Choice'];

export default function AllBoardsScreen({ onBoardSelected }) {
  const [boards, setBoards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const loadBoards = async () => {
      const all = await getBoards();
      setBoards(all);
    };
    loadBoards();
  }, []);

  const filteredBoards = boards.filter((board) => {
    const matchesType = activeTab === 'All' || board.type === activeTab.toLowerCase();
    const matchesSearch = board.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDelete = async (boardId) => {
    await deleteBoard(boardId);
    setBoards((prev) => prev.filter((b) => b.id !== boardId));
  };

  const renderBoard = ({ item }) => (
    <TouchableOpacity style={styles.boardCard} onPress={() => onBoardSelected(item)}>
      <View style={styles.boardHeader}>
        <Text style={styles.boardTitle}>{item.title}</Text>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={item.cards.filter(Boolean)}
        horizontal
        keyExtractor={(_, index) => `${item.id}-${index}`}
        renderItem={({ item: cardItem }) => (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>{cardItem.name}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search boards..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      <View style={styles.tabs}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredBoards}
        keyExtractor={(item) => item.id}
        renderItem={renderBoard}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  searchInput: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-around',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    color: '#000',
  },
  boardCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  boardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  boardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteIcon: {
    fontSize: 18,
    color: '#d00',
  },
  card: {
    backgroundColor: '#fafafa',
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: cardSize,
  },
  cardLabel: {
    fontSize: 14,
    color: '#333',
  },
});