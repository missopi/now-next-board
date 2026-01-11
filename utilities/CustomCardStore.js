import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { ensureStoredImageUri, normalizeStoredImageUri } from "./UserImageStore";

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
    const normalized = await normalizeCustomCardImages(parsed);
    cachedCards = normalized;
    return normalized;
  } catch (err) {
    console.error("Failed to load custom cards:", err);
    return [];
  }
};

export const getCachedCustomCards = () => cachedCards;

async function normalizeCustomCardImages(cards) {
  if (!Array.isArray(cards) || !cards.length) return cards || [];

  try {
    const normalized = await Promise.all(
      cards.map(async (card) => {
        if (!card?.imageUri || typeof card.imageUri !== "string") return card;
        const normalizedUri = await normalizeStoredImageUri(card.imageUri);
        if (normalizedUri && normalizedUri !== card.imageUri) {
          return { ...card, imageUri: normalizedUri };
        }
        return card;
      })
    );

    const didChange = normalized.some(
      (card, index) => card?.imageUri !== cards[index]?.imageUri
    );

    if (didChange) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }

    return normalized;
  } catch (error) {
    console.warn("Failed to normalize custom card images:", error);
    return cards;
  }
}

export const saveCustomCard = async ({ id, name, category, imageUri }) => {
  try {
    const trimmedName = name?.trim();
    if (!trimmedName || !imageUri) {
      return { cards: await getCustomCards(), savedCard: null, wasDuplicate: false };
    }

    const persistedImageUri = await ensureStoredImageUri(imageUri);
    const finalImageUri = persistedImageUri || imageUri;

    const existing = await getCustomCards();
    const duplicate = existing.find(
      (card) =>
        card.name?.toLowerCase() === trimmedName.toLowerCase() &&
        card.imageUri === finalImageUri
    );
    if (duplicate) {
      return { cards: existing, savedCard: duplicate, wasDuplicate: true };
    }

    const newCard = {
      id: id || uuid.v4(),
      name: trimmedName,
      category: category || "Personal Care",
      imageUri: finalImageUri,
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
