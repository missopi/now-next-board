import { useEffect, useState } from "react";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { clearLogs, getLogText, shareLogs } from "../utilities/logger";
import StatusModal from "./modals/StatusModal";

const SUPPORT_EMAIL = "support@andthenapp.com";

const SupportScreen = () => {
  const [logs, setLogs] = useState("");
  const [emailStatusVisible, setEmailStatusVisible] = useState(false);

  const loadLogs = async () => {
    const text = await getLogText();
    setLogs(text.trim() ? text : "No logs recorded yet.");
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const openEmail = async ({ subject, body }) => {
    const baseUrl = `mailto:${SUPPORT_EMAIL}`;
    const queryParts = [];
    if (subject) {
      queryParts.push(`subject=${encodeURIComponent(subject)}`);
    }
    if (body) {
      queryParts.push(`body=${encodeURIComponent(body)}`);
    }
    const fullUrl = queryParts.length ? `${baseUrl}?${queryParts.join("&")}` : baseUrl;

    try {
      await Linking.openURL(fullUrl);
      return true;
    } catch {
      // fall back to simpler mailto formats for third-party apps
    }

    if (subject) {
      const subjectOnlyUrl = `${baseUrl}?subject=${encodeURIComponent(subject)}`;
      try {
        await Linking.openURL(subjectOnlyUrl);
        return true;
      } catch {
        // keep falling back
      }
    }

    try {
      await Linking.openURL(baseUrl);
      return true;
    } catch {
      return false;
    }
  };

  const handleEmailLogs = async () => {
    const text = await getLogText();
    const fallbackNote = "Logs are attached below. If this email is too long, please use Share Logs instead.";
    const trimmed = text.trim() ? text.trim() : "No logs recorded yet.";
    const maxBodyLength = 6000;
    const body = trimmed.length > maxBodyLength
      ? `${fallbackNote}\n\n${trimmed.slice(trimmed.length - maxBodyLength)}`
      : trimmed;

    const subject = "andThen support logs";
    const opened = await openEmail({ subject, body });
    if (!opened) {
      await shareLogs();
    }
  };

  const handleEmailSupport = async () => {
    const subject = "andThen support question";
    const body = "Hi,\n\nI have a question about:\n\n";
    const opened = await openEmail({ subject, body });
    if (!opened) {
      setEmailStatusVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Support</Text>
        <Text style={styles.description}>
          Choose the kind of help you need. Questions and feedback are separate from log sharing.
        </Text>

        <View style={styles.group}>
          <Text style={styles.groupTitle}>Questions or feedback</Text>
          <Text style={styles.groupText}>
            Send a message without logs.
          </Text>
          <TouchableOpacity style={styles.primaryButtonFull} onPress={handleEmailSupport}>
            <Text style={styles.primaryButtonText}>Email Support</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.group}>
          <Text style={styles.groupTitle}>Share logs for troubleshooting</Text>
          <Text style={styles.groupText}>
            Send recent logs so we can help fix issues.
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.primaryButtonHalf} onPress={handleEmailLogs}>
              <Text style={styles.primaryButtonText}>Email Logs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButtonHalf}
              onPress={async () => {
                await clearLogs();
                await loadLogs();
              }}
            >
              <Text style={styles.secondaryButtonText}>Clear Logs</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Logs</Text>
        <ScrollView style={styles.logBox} contentContainerStyle={styles.logContent}>
          <Text style={styles.logText}>{logs}</Text>
        </ScrollView>
      </View>

      <StatusModal
        visible={emailStatusVisible}
        title="Email not available"
        message={`Please email ${SUPPORT_EMAIL} from any mail app.`}
        buttonLabel="OK"
        onClose={() => setEmailStatusVisible(false)}
      />
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
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 12,
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
  group: {
    marginTop: 18,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d7e5f2",
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#14324a",
  },
  groupText: {
    marginTop: 6,
    fontSize: 15,
    color: "#2b4d66",
  },
  buttonRow: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  primaryButtonFull: {
    backgroundColor: "#0792e2",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
    minHeight: 48,
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: 12,
  },
  primaryButtonHalf: {
    flex: 1,
    backgroundColor: "#0792e2",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    minHeight: 48,
    alignItems: "center",
    marginRight: 12,
    marginBottom: 12,
    marginTop: 12,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButtonHalf: {
    flex: 1,
    backgroundColor: "#e6f1fb",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    minHeight: 48,
    alignItems: "center",
    marginBottom: 12,
    marginTop: 12,
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
