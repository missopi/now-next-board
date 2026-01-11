import { Directory, File, Paths } from "expo-file-system";

const USER_IMAGE_DIR = "user-images";

const getUserImageDir = () => {
  try {
    const base = Paths.document;
    if (!base?.uri) return null;
    return new Directory(base, USER_IMAGE_DIR);
  } catch (error) {
    return null;
  }
};

const ensureUserImageDir = async () => {
  const dir = getUserImageDir();
  if (!dir) return null;

  try {
    dir.create({ intermediates: true, idempotent: true });
    return dir;
  } catch (error) {
    console.warn("Failed to prepare user image directory:", error);
    return null;
  }
};

const getFileNameFromUri = (uri) => {
  if (!uri || typeof uri !== "string") return null;
  const cleanUri = uri.split("?")[0]?.split("#")[0] || "";
  const parts = cleanUri.split("/");
  return parts.length ? parts[parts.length - 1] : null;
};

const createFallbackFileName = () => {
  const suffix = Math.random().toString(36).slice(2, 8);
  return `card-${Date.now()}-${suffix}.jpg`;
};

export const ensureStoredImageUri = async (uri) => {
  if (!uri || typeof uri !== "string") return uri;
  if (!uri.startsWith("file://")) return uri;

  let sourceFile;
  try {
    sourceFile = new File(uri);
  } catch (error) {
    return uri;
  }

  if (!sourceFile.exists) return uri;

  const destDir = await ensureUserImageDir();
  if (!destDir) return uri;

  if (uri.startsWith(destDir.uri)) {
    return uri;
  }

  const fileName = getFileNameFromUri(uri) || createFallbackFileName();
  const destFile = new File(destDir, fileName);
  if (destFile.uri === uri) return uri;

  try {
    if (destFile.exists) {
      return destFile.uri;
    }
  } catch (error) {
    // Ignore and try to copy.
  }

  try {
    sourceFile.copy(destFile);
    if (destFile.exists) {
      return destFile.uri;
    }
  } catch (copyError) {
    console.warn("Failed to persist image to documents:", copyError);
    try {
      sourceFile.move(destFile);
      if (destFile.exists) {
        return destFile.uri;
      }
    } catch (moveError) {
      console.warn("Failed to move image to documents:", moveError);
    }
  }

  return uri;
};

export const normalizeStoredImageUri = async (uri) => {
  if (!uri || typeof uri !== "string") return uri;

  const ensuredUri = await ensureStoredImageUri(uri);
  if (ensuredUri && ensuredUri !== uri) return ensuredUri;

  if (uri.startsWith("file://")) {
    try {
      const sourceFile = new File(uri);
      if (sourceFile.exists) {
        return uri;
      }
    } catch (error) {
      // Ignore invalid file uri and fall through to candidate lookup.
    }
  }

  const fileName = getFileNameFromUri(uri);
  const baseDir = getUserImageDir();
  if (!fileName || !baseDir) return uri;

  const candidateFile = new File(baseDir, fileName);
  if (candidateFile.uri === uri) return uri;
  if (candidateFile.exists) return candidateFile.uri;

  return uri;
};
