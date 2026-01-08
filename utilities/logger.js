import * as FileSystem from "expo-file-system";
import { Share } from "react-native";

const LOG_DIR = `${FileSystem.documentDirectory}logs`;
const LOG_FILE = `${LOG_DIR}/app.log`;
const MAX_LOG_BYTES = 120000;
const WRITE_DELAY_MS = 500;

let logCache = "";
let isInitialized = false;
let writeTimer = null;
let hasLoaded = false;

const ensureLogDir = async () => {
  if (!FileSystem.documentDirectory) {
    return false;
  }

  try {
    const info = await FileSystem.getInfoAsync(LOG_DIR);
    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(LOG_DIR, { intermediates: true });
    }
    return true;
  } catch {
    return false;
  }
};

const loadCache = async () => {
  if (hasLoaded) return;
  hasLoaded = true;

  try {
    const info = await FileSystem.getInfoAsync(LOG_FILE);
    if (info.exists) {
      logCache = await FileSystem.readAsStringAsync(LOG_FILE, {
        encoding: FileSystem.EncodingType.UTF8,
      });
    }
  } catch {
    logCache = "";
  }
};

const trimCache = () => {
  if (logCache.length <= MAX_LOG_BYTES) return;
  logCache = logCache.slice(logCache.length - MAX_LOG_BYTES);
  const firstBreak = logCache.indexOf("\n");
  if (firstBreak > 0) {
    logCache = logCache.slice(firstBreak + 1);
  }
};

const scheduleWrite = () => {
  if (writeTimer) return;
  writeTimer = setTimeout(async () => {
    writeTimer = null;
    const ready = await ensureLogDir();
    if (!ready) return;
    try {
      await FileSystem.writeAsStringAsync(LOG_FILE, logCache, {
        encoding: FileSystem.EncodingType.UTF8,
      });
    } catch {
      // ignore write failures to avoid recursive console logging
    }
  }, WRITE_DELAY_MS);
};

const serializeArg = (value) => {
  if (typeof value === "string") return value;
  if (value instanceof Error) {
    return value.stack || value.message || "Error";
  }
  try {
    return JSON.stringify(value);
  } catch {
    return "[unserializable]";
  }
};

const appendLogLine = (level, args) => {
  const timestamp = new Date().toISOString();
  const message = args.map(serializeArg).join(" ");
  logCache += `[${timestamp}] ${level.toUpperCase()}: ${message}\n`;
  trimCache();
  scheduleWrite();
};

export const initLogger = () => {
  if (isInitialized) return;
  isInitialized = true;
  loadCache();

  ["log", "warn", "error"].forEach((level) => {
    const original = console[level];
    console[level] = (...args) => {
      original(...args);
      appendLogLine(level, args);
    };
  });
};

export const getLogText = async () => {
  await loadCache();
  return logCache;
};

export const clearLogs = async () => {
  logCache = "";
  const ready = await ensureLogDir();
  if (!ready) return;
  await FileSystem.writeAsStringAsync(LOG_FILE, "", {
    encoding: FileSystem.EncodingType.UTF8,
  });
};

export const shareLogs = async () => {
  await loadCache();
  const content = logCache.trim() || "No logs recorded yet.";
  return Share.share({
    title: "andThen logs",
    message: content,
  });
};
