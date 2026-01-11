import AsyncStorage from "@react-native-async-storage/async-storage";
import { ensureStoredImageUri, normalizeStoredImageUri } from "./UserImageStore";

const STORAGE_KEY = 'allboards';

// fetch all existing saved boards
export const getBoards = async () => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return await normalizeBoardImages(parsed);
  } catch (err) {
    console.error('Failed to load boards:', err);
    return [];
  }
};

// save a new board
export const saveBoard = async (newBoard) => {
  try {
    const boardToSave = await persistBoardImages(newBoard);
    const existing = await getBoards();
    const updated = [...existing, boardToSave];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save board:', err);
    return [];
  }
};

// update an existing board
export const updateBoard = async (updateBoard) => {
  try {
    const boardToSave = await persistBoardImages(updateBoard);
    const boards = await getBoards();
    const updated = boards.map((b) => (b.id === boardToSave.id ? boardToSave : b));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to update board:', err);
    return [];
  }
};

// delete a board
export const deleteBoard = async (id) => {
  try {
    const boards = await getBoards();
    const filtered = boards.filter((b) => b.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (err) {
    console.error('Failed to delete board:', err);
    return [];
  }
};

// clear all boards!
export const clearAllBoards = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear boards:', err);
  }
};

const getCardImageUri = (card) => {
  if (!card || card.fromLibrary) return null;
  if (typeof card.image === "string") return card.image;
  if (card.image?.uri && typeof card.image.uri === "string") return card.image.uri;
  if (card.imageUri && typeof card.imageUri === "string") return card.imageUri;
  return null;
};

const applyCardImageUri = (card, nextUri) => {
  if (!card) return card;

  let nextImage = card.image;
  if (typeof card.image === "string") {
    nextImage = nextUri;
  } else if (card.image?.uri && typeof card.image.uri === "string") {
    nextImage = { ...card.image, uri: nextUri };
  } else if (!card.image && card.imageUri) {
    nextImage = nextUri;
  }

  return {
    ...card,
    image: nextImage,
    imageUri: card.imageUri ? nextUri : card.imageUri,
  };
};

async function persistBoardImages(board) {
  if (!board?.cards?.length) return board;

  let didChange = false;

  const persistedCards = await Promise.all(
    board.cards.map(async (card) => {
      if (!card || card.fromLibrary) return card;

      const rawUri = getCardImageUri(card);
      if (!rawUri) return card;

      const persistedUri = await ensureStoredImageUri(rawUri);
      if (!persistedUri || persistedUri === rawUri) return card;

      didChange = true;
      return applyCardImageUri(card, persistedUri);
    })
  );

  if (!didChange) return board;
  return { ...board, cards: persistedCards };
}

async function normalizeBoardImages(boards) {
  if (!Array.isArray(boards) || !boards.length) return boards || [];

  let didChange = false;

  const normalizedBoards = await Promise.all(
    boards.map(async (board) => {
      if (!board?.cards?.length) return board;

      const normalizedCards = await Promise.all(
        board.cards.map(async (card) => {
          if (!card || card.fromLibrary) return card;

          const rawUri = getCardImageUri(card);

          if (!rawUri) return card;

          const normalizedUri = await normalizeStoredImageUri(rawUri);
          if (!normalizedUri || normalizedUri === rawUri) return card;

          didChange = true;

          return applyCardImageUri(card, normalizedUri);
        })
      );

      if (!didChange) return board;
      return { ...board, cards: normalizedCards };
    })
  );

  if (didChange) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedBoards));
    } catch (error) {
      console.warn("Failed to persist normalized board images:", error);
    }
  }

  return normalizedBoards;
}
