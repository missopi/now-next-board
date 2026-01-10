import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserGuideScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Now & Next Guide</Text>
          <Text style={styles.description}>
            Follow the steps below to create a Now/Next board.
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Start a board</Text>
            <Text style={styles.sectionText}>
              From Home, tap the plus button and choose 'Now & Next'.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Pick the "Now" activity</Text>
            <Text style={styles.sectionText}>
              Tap the Now card. Choose from the library or create a custom card with a photo and title.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Pick the "Next" activity</Text>
            <Text style={styles.sectionText}>
              Tap the Next card. Pick a clear, familiar image so it is easy to understand.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Saving an activity</Text>
            <Text style={styles.sectionText}>
              Long press an activity card to save it to the library.  Long press the card in the library to delete it.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Save your board</Text>
            <Text style={styles.sectionText}>
              When you leave the screen, we will ask if you want to save.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Need more help?</Text>
            <Text style={styles.sectionText}>
              Any questions or something is not working, you can email or share logs with us from the Support screen.
            </Text>
            <TouchableOpacity
              accessibilityRole="button"
              style={styles.supportButton}
              onPress={() => navigation.navigate("Support")}
            >
              <Text style={styles.supportButtonText}>Go to Support</Text>
            </TouchableOpacity>
          </View>
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
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 12,
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
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
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#14324a",
  },
  sectionText: {
    marginTop: 6,
    fontSize: 14,
    color: "#2b4d66",
    lineHeight: 22,
  },
  supportButton: {
    marginTop: 20,
    backgroundColor: "#0792e2",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    alignItems: "center",
    minHeight: 48,
  },
  supportButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default UserGuideScreen;
