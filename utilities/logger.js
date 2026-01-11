import { Directory, File, Paths } from "expo-file-system";
import { Share } from "react-native";

const MAX_LOG_BYTES = 120000;
const WRITE_DELAY_MS = 500;

let logCache = "";
let isInitialized = false;
let writeTimer = null;
let hasLoaded = false;

const getLogDir = () => {
  try {
    const base = Paths.document;
    if (!base?.uri) return null;
    return new Directory(base, "logs");
  } catch (error) {
    return null;
  }
};

const getLogFile = () => {
  const dir = getLogDir();
  return dir ? new File(dir, "app.log") : null;
};

const ensureLogDir = async () => {
  const dir = getLogDir();
  if (!dir) return false;

  try {
    dir.create({ intermediates: true, idempotent: true });
    return true;
  } catch {
    return false;
  }
};

const loadCache = async () => {
  if (hasLoaded) return;
  hasLoaded = true;

  try {
    const file = getLogFile();
    if (!file || !file.exists) return;
    logCache = await file.text();
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
      const file = getLogFile();
      if (!file) return;
      file.write(logCache, { encoding: "utf8" });
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
  const file = getLogFile();
  if (!file) return;
  file.write("", { encoding: "utf8" });
};

export const shareLogs = async () => {
  await loadCache();
  const content = logCache.trim() || "No logs recorded yet.";
  return Share.share({
    title: "andThen logs",
    message: content,
  });
};
