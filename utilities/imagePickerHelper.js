/**
 * File to store all image picker code so can be used on multiple screens.
 * Will handle selected images from camera and photo gallery.
 * */

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

const IMAGE_DIR = `${FileSystem.documentDirectory}user-images`;
const MAX_IMAGE_WIDTH = 1024;
const JPEG_QUALITY = 0.85;
const IMAGE_MEDIA_TYPE =
  ImagePicker.MediaTypeOptions?.Images ??
  ImagePicker.MediaType?.Images ??
  "images";

const ensureImageDir = async () => {
  if (!FileSystem.documentDirectory) {
    console.warn("[pickImage] Document directory unavailable.");
    return null;
  }

  try {
    console.log("[pickImage] Using image directory:", IMAGE_DIR);
    const dirInfo = await FileSystem.getInfoAsync(IMAGE_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(IMAGE_DIR, { intermediates: true });
      console.log("[pickImage] Created image directory.");
    }
    return IMAGE_DIR;
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
  if (!dir) return sourceUri;

  const destUri = `${dir}/${createImageFileName()}`;

  try {
    console.log("[pickImage] Persisting image.", { sourceUri, destUri });
    const sourceInfo = await FileSystem.getInfoAsync(sourceUri, { size: true });
    console.log("[pickImage] Source info:", sourceInfo);
    await FileSystem.copyAsync({ from: sourceUri, to: destUri });
    const destInfo = await FileSystem.getInfoAsync(destUri);
    if (!destInfo.exists) {
      console.warn("[pickImage] Persisted file missing after copy.");
      return sourceUri;
    }
    console.log("[pickImage] Persisted via copy:", destInfo);
    return destUri;
  } catch (error) {
    console.warn("[pickImage] Copy failed, trying move instead.", error);
    try {
      await FileSystem.moveAsync({ from: sourceUri, to: destUri });
      const destInfo = await FileSystem.getInfoAsync(destUri);
      if (!destInfo.exists) {
        console.warn("[pickImage] Persisted file missing after move.");
        return sourceUri;
      }
      console.log("[pickImage] Persisted via move:", destInfo);
      return destUri;
    } catch (moveError) {
      console.error("[pickImage] Failed to persist image.", moveError);
      return sourceUri;
    }
  }
};

const normalizeImageUri = async (asset) => {
  const sourceUri = asset?.uri;
  const sourceWidth = asset?.width;
  const lowerUri = sourceUri ? sourceUri.toLowerCase() : "";
  const mimeType = asset?.mimeType ? asset.mimeType.toLowerCase() : "";
  const needsResize = sourceWidth && sourceWidth > MAX_IMAGE_WIDTH;
  const isLibraryAsset = lowerUri.startsWith("ph://") || lowerUri.startsWith("assets-library://");
  const needsFormatConversion = mimeType.includes("png") || mimeType.includes("heic") || mimeType.includes("heif");
  const shouldManipulate = isLibraryAsset || needsFormatConversion;
  console.log("[pickImage] Normalize decision:", {
    sourceUri,
    sourceWidth,
    mimeType,
    needsResize,
    isLibraryAsset,
    needsFormatConversion,
    shouldManipulate,
  });

  try {
    if (!shouldManipulate) {
      return await persistImage(sourceUri);
    }

    const resizeActions = needsResize ? [{ resize: { width: MAX_IMAGE_WIDTH } }] : [];

    console.log("[pickImage] Running ImageManipulator.", { resizeActions });
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      sourceUri,
      resizeActions,
      { compress: JPEG_QUALITY, format: ImageManipulator.SaveFormat.JPEG }
    );
    console.log("[pickImage] Manipulated image:", manipulatedImage);
    return await persistImage(manipulatedImage.uri);
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
  console.log('[pickImage] start - type:', type);
  console.log("[pickImage] Document directory:", FileSystem.documentDirectory);

  const hasPermission = await requestPermission(type);
  console.log('[pickImage] permission granted:', hasPermission);

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
        mediaTypes: IMAGE_MEDIA_TYPE,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        copyToCacheDirectory: true,
      });
    }
    console.log('[pickImage] Picker result:', result);
  } catch (error) {
    console.error('[pickImage] Picker error.', error);
    return null;
  }

  if (result.canceled || !result.assets?.length) {
    console.log('[pickImage] cancelled or no assets');
    return null;
  }

  const asset = result.assets?.[0];
  console.log('[pickImage] Picked asset:', asset);
  console.log("[pickImage] Picked asset summary:", {
    uri: asset?.uri,
    fileName: asset?.fileName,
    fileSize: asset?.fileSize,
    width: asset?.width,
    height: asset?.height,
    type: asset?.type,
    mimeType: asset?.mimeType,
  });

  if (!asset || !asset.uri) {
    console.error('[pickImage] missing or has no URI', asset);
    return null;
  }

  let imageUri = result.assets[0].uri;
  console.log("initial image uri:", imageUri);
  console.time("[pickImage] normalize image");

  const normalizedUri = await normalizeImageUri(asset);
  console.log("[pickImage] normalized image uri:", normalizedUri);
  if (normalizedUri) {
    const normalizedInfo = await FileSystem.getInfoAsync(normalizedUri, { size: true });
    console.log("[pickImage] Normalized file info:", normalizedInfo);
  }

  console.timeEnd("[pickImage] normalize image");
  return normalizedUri;
}
