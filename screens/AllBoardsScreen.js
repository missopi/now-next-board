import { useEffect, useState, useRef } from 'react';
import { Alert, View, Text, FlatList, Image, ScrollView, TextInput, Modal, TouchableOpacity, SafeAreaView } from 'react-native';
import { getBoards, deleteBoard } from '../utilities/BoardStore';
import styles from '../screens/styles/AllBoardsStyles';
import { useNavigation } from '@react-navigation/native';
import { Entypo, Feather } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';

const TAB_TYPE_MAP = {
  'Now/Next': 'nowNextThen',
  'Routine': 'routine',
  'Choice': 'choice',
};

const TABS = ['All'].concat(Object.keys(TAB_TYPE_MAP));

export default function AllBoardsScreen() {
  const navigation = useNavigation();
  const [boards, setBoards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const [selectedBoard, setSelectedBoard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    const loadBoards = async () => {
      const all = await getBoards();
      setBoards(all);
    };
    loadBoards();
  }, []);

  const filteredBoards = boards.filter((board) => {
    const matchesType = activeTab === 'All' || board.type === TAB_TYPE_MAP[activeTab];
    const matchesSearch = board.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

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

  const navigateToBoard = (board, action = 'edit') => {
    switch (board.type) {
      case 'routine':
        if (action === 'edit') {
          navigation.navigate('Routines', { mode: 'load', board });
        } else if (action === 'view') {
          navigation.navigate('FinishedRoutine', { board });
        } else if (action === 'slideshow') {
          navigation.navigate('Slideshow', { board });
        }
        break;

      case 'nowNextThen':
        if (action === 'edit') {
          navigation.navigate('Now/Next', { mode: 'load', board });
        } else if (action === 'view') {
          navigation.navigate('NowNextBoardFinished', { board });
        } else if (action === 'slideshow') {
          navigation.navigate('NowNextSlideshow', { board });
        }
        break;

      case 'choice':
        if (action === 'edit') {
          navigation.navigate('ChoiceScreen', { mode: 'load', board });
        } else {
          alert('View and slideshow not yet supported for choice boards.');
        }
        break;

      default:
        console.warn('Unknown board type:', board.type);
    }
  };


  const renderBoard = ({ item }) => (
    <TouchableOpacity style={styles.boardCard}>
      <View style={styles.boardHeader}>
        <Text style={styles.boardTitle}>{item.title || 'Now / Next Board'}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteIcon}>✕</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {item.cards.map((card, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.cardPreview}
          >
            <Image 
              source={typeof card.image === 'string' ? { uri: card.image } : card.image} 
              style={styles.cardImage} />
            <Text style={styles.cardLabel}>{card.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
        
      <View style={styles.cardFooter}>
        <TouchableOpacity
          onPress={() => {
            setSelectedBoard(item);
            modalRef.current?.open();
          }}
          style={styles.iconButton}
        >
          <Feather name="share" size={20} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setSelectedBoard(item);
            modalRef.current?.open();
          }}
          style={styles.iconButton}
        >
          <Entypo name="dots-three-horizontal" size={20} color="#333" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>

      {selectedBoard && (
        <Modalize
          ref={modalRef}
          modalHeight={300}
          handleStyle={{ backgroundColor: '#ccc', width: 40 }}
          handlePosition="inside"
          modalStyle={{
            backgroundColor: '#1c1c1e',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 16,
          }}
        >
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => {
              modalRef.current?.close();
              navigateToBoard(selectedBoard, 'edit');
            }}
          >
            <Text style={styles.modalText}>✏️  Edit Board</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => {
              modalRef.current?.close();
              navigateToBoard(selectedBoard, 'view');
            }}
          >
            <Text style={styles.modalText}>👁️  View Board</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => {
              modalRef.current?.close();
              navigateToBoard(selectedBoard, 'slideshow');
            }}
          >
            <Text style={styles.modalText}>🎞️  View Slideshow</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => {
              modalRef.current?.close();
              alert('Coming soon: Export to PDF');
            }}
          >
            <Text style={styles.modalText}>🖨️  Print PDF</Text>
          </TouchableOpacity>
        </Modalize>
      )}
    </>
  );
};
