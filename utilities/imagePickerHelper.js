/**
 * File to store all image picker code so can be used on multiple screens.
 * Will handle selected images from camera and photo gallery.
 * */

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Directory, File, Paths } from "expo-file-system";

const MAX_IMAGE_WIDTH = 1024;
const JPEG_QUALITY = 0.85;
const IMAGE_MEDIA_TYPE =
  ImagePicker.MediaTypeOptions?.Images ??
  ImagePicker.MediaType?.Images ??
  "images";

const getDirectory = (type) => {
  try {
    const dir = type === "document" ? Paths.document : Paths.cache;
    return dir?.uri ? dir : null;
  } catch (error) {
    return null;
  }
};

const ensureImageDir = async () => {
  const documentDir = getDirectory("document");
  const cacheDir = getDirectory("cache");

  if (!documentDir && !cacheDir) {
    console.warn("[pickImage] Document and cache directories unavailable.");
    return null;
  }

  if (!documentDir && cacheDir) {
    console.warn("[pickImage] Document directory unavailable. Falling back to cache directory.");
  }

  try {
    const baseDirectory = documentDir || cacheDir;
    const imageDir = new Directory(baseDirectory, "user-images");
    console.log("[pickImage] Using image directory:", imageDir.uri);
    imageDir.create({ idempotent: true });
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
    return sourceUri;
  }

  const destFile = new File(dir, createImageFileName());

  try {
    console.log("[pickImage] Persisting image.", { sourceUri, destUri: destFile.uri });
    const sourceFile = new File(sourceUri);
    const sourceInfo = sourceFile.info();
    console.log("[pickImage] Source info:", sourceInfo);
    if (!sourceInfo.exists) {
      console.warn("[pickImage] Source file missing before copy.", { sourceUri });
    }
    sourceFile.copy(destFile);
    if (!destFile.exists) {
      console.warn("[pickImage] Persisted file missing after copy.");
      return sourceUri;
    }
    console.log("[pickImage] Persisted via copy:", destFile.info());
    return destFile.uri;
  } catch (error) {
    console.warn("[pickImage] Copy failed, trying move instead.", error);
    try {
      const sourceFile = new File(sourceUri);
      sourceFile.move(destFile);
      if (!destFile.exists) {
        console.warn("[pickImage] Persisted file missing after move.");
        return sourceUri;
      }
      console.log("[pickImage] Persisted via move:", destFile.info());
      return destFile.uri;
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
  const shouldManipulate = isLibraryAsset || needsFormatConversion || needsResize;
  console.log("[pickImage] Normalize decision:", {
    sourceUri,
    sourceWidth,
    mimeType,
    needsResize,
    isLibraryAsset,
    needsFormatConversion,
    shouldManipulate,
  });

  if (!sourceUri) {
    console.warn("[pickImage] Normalize skipped: missing source uri.");
    return null;
  }

  try {
    const resizeActions = needsResize ? [{ resize: { width: MAX_IMAGE_WIDTH } }] : [];

    if (!shouldManipulate) {
      const persistedUri = await persistImage(sourceUri);
      console.log("[pickImage] Normalize no-manipulate result:", persistedUri);
      return persistedUri;
    }

    if (!isLibraryAsset) {
      const persistedUri = await persistImage(sourceUri);
      console.log("[pickImage] Persisted before manipulate:", persistedUri);
      try {
        console.log("[pickImage] Running ImageManipulator on persisted file.", { resizeActions });
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          persistedUri,
          resizeActions,
          { compress: JPEG_QUALITY, format: ImageManipulator.SaveFormat.JPEG }
        );
        console.log("[pickImage] Manipulated image:", manipulatedImage);
        const normalizedUri = await persistImage(manipulatedImage?.uri || persistedUri);
        console.log("[pickImage] Normalize persisted after manipulate:", normalizedUri);
        return normalizedUri;
      } catch (manipulateError) {
        console.warn("[pickImage] Manipulator failed on persisted file.", manipulateError);
        return persistedUri;
      }
    }

    console.log("[pickImage] Running ImageManipulator.", { resizeActions });
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      sourceUri,
      resizeActions,
      { compress: JPEG_QUALITY, format: ImageManipulator.SaveFormat.JPEG }
    );
    console.log("[pickImage] Manipulated image:", manipulatedImage);
    const normalizedUri = await persistImage(manipulatedImage?.uri || sourceUri);
    console.log("[pickImage] Normalize persisted after manipulate:", normalizedUri);
    return normalizedUri;
  } catch (error) {
    console.error("[pickImage] Failed to normalize image.", error);
    const fallbackUri = await persistImage(sourceUri);
    console.log("[pickImage] Normalize fallback persist:", fallbackUri);
    return fallbackUri;
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
  const documentDir = getDirectory("document");
  const cacheDir = getDirectory("cache");
  console.log("[pickImage] Document directory:", documentDir?.uri || "");
  console.log("[pickImage] Cache directory:", cacheDir?.uri || "");

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
  try {
    const initialInfo = new File(imageUri).info();
    console.log("[pickImage] Initial file info:", initialInfo);
  } catch (infoError) {
    console.warn("[pickImage] Failed to read initial file info.", infoError);
  }
  console.time("[pickImage] normalize image");

  const normalizedUri = await normalizeImageUri(asset);
  console.log("[pickImage] normalized image uri:", normalizedUri);
  if (normalizedUri) {
    try {
      const normalizedInfo = new File(normalizedUri).info();
      console.log("[pickImage] Normalized file info:", normalizedInfo);
    } catch (normalizedError) {
      console.warn("[pickImage] Failed to read normalized file info.", normalizedError);
    }
  }

  console.timeEnd("[pickImage] normalize image");
  return normalizedUri;
}
