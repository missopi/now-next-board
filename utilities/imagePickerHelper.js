/**
 * File to store all image picker code so can be used on multiple screens.
 * Will handle selected images from camera and photo gallery.
 * */

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Directory, File, Paths } from "expo-file-system";
import { ensureStoredImageUri } from "./UserImageStore";

const MAX_IMAGE_WIDTH = 1024;
const JPEG_QUALITY = 0.85;
const IMAGE_MEDIA_TYPE = ImagePicker.MediaType?.Images ?? "images";
const USER_IMAGE_DIR = "user-images";

const getDocumentDirectory = () => {
  try {
    const dir = Paths.document;
    return dir?.uri ? dir : null;
  } catch (error) {
    return null;
  }
};

const ensureImageDir = async () => {
  const baseDirectory = getDocumentDirectory();
  if (!baseDirectory) {
    console.warn("[pickImage] Document directory unavailable.");
    return null;
  }

  try {
    const imageDir = new Directory(baseDirectory, USER_IMAGE_DIR);
    imageDir.create({ intermediates: true, idempotent: true });
    return imageDir;
  } catch (error) {
    console.error("[pickImage] Failed to prepare image directory.", error);
    return null;
  }
};

const createImageFileName = () => {
  const suffix = Math.random().toString(36).slice(2, 8);
  return `card-${Date.now()}-${suffix}.jpg`;
};

const persistImage = async (sourceUri) => {
  const dir = await ensureImageDir();
  if (!dir) {
    console.warn("[pickImage] Persist skipped: image directory unavailable.");
    return null;
  }

  if (!sourceUri || !sourceUri.startsWith("file://")) {
    console.warn("[pickImage] Persist skipped: non-file source uri.", { sourceUri });
    return null;
  }

  let sourceFile;
  try {
    sourceFile = new File(sourceUri);
  } catch (error) {
    console.warn("[pickImage] Persist skipped: invalid source uri.", { sourceUri, error });
    return null;
  }

  const destFile = new File(dir, createImageFileName());

  try {
    sourceFile.copy(destFile);
  } catch (error) {
    console.warn("[pickImage] Copy failed, trying move instead.", error);
    try {
      sourceFile.move(destFile);
    } catch (moveError) {
      console.error("[pickImage] Failed to persist image.", moveError);
      return null;
    }
  }

  if (!destFile.exists) {
    console.warn("[pickImage] Persisted file missing after copy/move.");
    return null;
  }

  return destFile.uri;
};

const normalizeImageUri = async (asset) => {
  const sourceUri = asset?.uri;
  const sourceWidth = asset?.width;
  const lowerUri = sourceUri ? sourceUri.toLowerCase() : "";
  const mimeType = asset?.mimeType ? asset.mimeType.toLowerCase() : "";
  const needsResize = sourceWidth && sourceWidth > MAX_IMAGE_WIDTH;
  const isFileUri = lowerUri.startsWith("file://");
  const isLibraryAsset = !isFileUri || lowerUri.startsWith("ph://") || lowerUri.startsWith("assets-library://");
  const needsFormatConversion = mimeType.includes("png") || mimeType.includes("heic") || mimeType.includes("heif");
  const shouldManipulate = isLibraryAsset || needsFormatConversion || needsResize;
  if (!sourceUri) {
    console.warn("[pickImage] Normalize skipped: missing source uri.");
    return null;
  }

  try {
    const resizeActions = needsResize ? [{ resize: { width: MAX_IMAGE_WIDTH } }] : [];

    if (!shouldManipulate) {
      const persistedUri = await persistImage(sourceUri);
      return persistedUri;
    }

    if (!isLibraryAsset) {
      const persistedUri = await persistImage(sourceUri);
      if (!persistedUri) return null;
      try {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          persistedUri,
          resizeActions,
          { compress: JPEG_QUALITY, format: ImageManipulator.SaveFormat.JPEG }
        );
        const normalizedUri = await persistImage(manipulatedImage?.uri || persistedUri);
        return normalizedUri || persistedUri;
      } catch (manipulateError) {
        console.warn("[pickImage] Manipulator failed on persisted file.", manipulateError);
        return persistedUri;
      }
    }

    const manipulatedImage = await ImageManipulator.manipulateAsync(
      sourceUri,
      resizeActions,
      { compress: JPEG_QUALITY, format: ImageManipulator.SaveFormat.JPEG }
    );
    const normalizedUri = await persistImage(manipulatedImage?.uri || sourceUri);
    return normalizedUri;
  } catch (error) {
    console.error("[pickImage] Failed to normalize image.", error);
    return await persistImage(sourceUri);
  }
};

// Ask for permissions
export async function requestPermission(type) {
  if (type === 'camera') {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  } else {
    const { status, accessPrivileges } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted' || accessPrivileges === 'limited';
  }
}

// Choose image from camera or photo gallery and normalize to a local file
export async function pickImage(type = 'camera') {
  const hasPermission = await requestPermission(type);

  if (!hasPermission) {
    alert('Permission denied. Please enable permissions in settings.');
    return null;
  }

  let result;
  try {
    if (type === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        copyToCacheDirectory: true,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: [IMAGE_MEDIA_TYPE],
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        copyToCacheDirectory: true,
      });
    }
  } catch (error) {
    console.error('[pickImage] Picker error.', error);
    return null;
  }

  if (result.canceled || !result.assets?.length) {
    return null;
  }

  const asset = result.assets?.[0];

  if (!asset || !asset.uri) {
    console.error('[pickImage] missing or has no URI', asset);
    return null;
  }

  try {
    let normalizedUri = null;
    try {
      normalizedUri = await normalizeImageUri(asset);
    } catch (normalizeError) {
      console.error("[pickImage] normalize threw", normalizeError);
    }

    if (!normalizedUri) {
      normalizedUri = await persistImage(asset.uri);
    }

    if (normalizedUri) {
      const persistedUri = await ensureStoredImageUri(normalizedUri);
      if (persistedUri) {
        normalizedUri = persistedUri;
      }
    }

    if (!normalizedUri) {
      alert("Unable to save that image. Please try again.");
      return null;
    }

    return normalizedUri;
  } catch (pickError) {
    console.error("[pickImage] Failed during normalize flow.", pickError);
    alert("Unable to save that image. Please try again.");
    return null;
  }
}
