import { useEffect, useState } from "react";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { clearLogs, getLogText, shareLogs } from "../utilities/logger";

const SupportScreen = () => {
  const [logs, setLogs] = useState("");

  const loadLogs = async () => {
    const text = await getLogText();
    setLogs(text.trim() ? text : "No logs recorded yet.");
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleEmailLogs = async () => {
    const text = await getLogText();
    const fallbackNote = "Logs are attached below. If this email is too long, please use Share Logs instead.";
    const trimmed = text.trim() ? text.trim() : "No logs recorded yet.";
    const maxBodyLength = 6000;
    const body = trimmed.length > maxBodyLength
      ? `${fallbackNote}\n\n${trimmed.slice(trimmed.length - maxBodyLength)}`
      : trimmed;

    const subject = "andThen support logs";
    const mailtoUrl = `mailto:support@andthenapp.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const canOpen = await Linking.canOpenURL(mailtoUrl);
    if (!canOpen) {
      alert("Email isn't available on this device. Please use Share Logs instead.");
      return;
    }
    await Linking.openURL(mailtoUrl);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Support</Text>
        <Text style={styles.description}>
          If something isn't working, you can share recent logs with us.
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleEmailLogs}>
            <Text style={styles.primaryButtonText}>Email Logs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={shareLogs}>
            <Text style={styles.primaryButtonText}>Share Logs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={async () => {
              await clearLogs();
              await loadLogs();
            }}
          >
            <Text style={styles.secondaryButtonText}>Clear Logs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={loadLogs}>
            <Text style={styles.secondaryButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Recent Logs</Text>
        <ScrollView style={styles.logBox} contentContainerStyle={styles.logContent}>
          <Text style={styles.logText}>{logs}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f7fbff",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#14324a",
  },
  description: {
    marginTop: 8,
    fontSize: 16,
    color: "#35526a",
  },
  buttonRow: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  primaryButton: {
    backgroundColor: "#0792e2",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
    minWidth: 130,
    alignItems: "center",
    marginRight: 12,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#e6f1fb",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    minWidth: 110,
    alignItems: "center",
    marginRight: 12,
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: "#1d4a6b",
    fontSize: 15,
    fontWeight: "600",
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "600",
    color: "#14324a",
  },
  logBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d7e5f2",
  },
  logContent: {
    padding: 14,
  },
  logText: {
    fontSize: 12,
    color: "#22384c",
  },
});

export default SupportScreen;
