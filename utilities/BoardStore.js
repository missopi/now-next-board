import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = 'allboards';

export const getBoards = async () => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveBoard = async (newBoard) => {
  const boards = await getBoards();
  const updated = [...boards, newBoard];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const updateBoard = async (updatedBoard) => {
  const boards = await getBoards();
  const updated = boards.map((b) => (b.id === updateBoard.id ? updateBoard : b));
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteBoard = async (id) => {
  const boards = await getBoards();
  const filtered = boards.filter((b) => b.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
};