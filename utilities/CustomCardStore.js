import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

const STORAGE_KEY = "customActivityCards";
let cachedCards = null;

export const getCardImageUri = (card) => {
  if (!card) return null;
  if (typeof card.image === "string") return card.image;
  if (card.image?.uri && typeof card.image.uri === "string") return card.image.uri;
  if (card.imageUri && typeof card.imageUri === "string") return card.imageUri;
  return null;
};

export const getCustomCards = async () => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    cachedCards = parsed;
    return parsed;
  } catch (err) {
    console.error("Failed to load custom cards:", err);
    return [];
  }
};

export const getCachedCustomCards = () => cachedCards;

export const saveCustomCard = async ({ id, name, category, imageUri }) => {
  try {
    const trimmedName = name?.trim();
    if (!trimmedName || !imageUri) {
      return { cards: await getCustomCards(), savedCard: null, wasDuplicate: false };
    }

    const existing = await getCustomCards();
    const duplicate = existing.find(
      (card) =>
        card.name?.toLowerCase() === trimmedName.toLowerCase() &&
        card.imageUri === imageUri
    );
    if (duplicate) {
      return { cards: existing, savedCard: duplicate, wasDuplicate: true };
    }

    const newCard = {
      id: id || uuid.v4(),
      name: trimmedName,
      category: category || "Personal Care",
      imageUri,
      createdAt: Date.now(),
    };
    const updated = [newCard, ...existing];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    cachedCards = updated;
    return { cards: updated, savedCard: newCard, wasDuplicate: false };
  } catch (err) {
    console.error("Failed to save custom card:", err);
    return { cards: [], savedCard: null, wasDuplicate: false };
  }
};

export const deleteCustomCard = async (id) => {
  try {
    const cards = await getCustomCards();
    const updated = cards.filter((card) => card.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    cachedCards = updated;
    return updated;
  } catch (err) {
    console.error("Failed to delete custom card:", err);
    return [];
  }
};
