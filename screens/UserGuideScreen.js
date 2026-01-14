import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserGuideScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const horizontalPadding = isTablet ? 32 : 20;
  const contentMaxWidth = isTablet ? 720 : 640;
  const textScale = isTablet ? 1.5 : 1;

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingHorizontal: horizontalPadding, maxWidth: contentMaxWidth },
          ]}
        >
          <Text style={[styles.title, { fontSize: 26 * textScale }]}>Now & Next Guide</Text>
          <Text style={[styles.description, { fontSize: 16 * textScale }]}>
            Follow the steps below to create a Now/Next board.
          </Text>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: 18 * textScale }]}>1. Start a board</Text>
            <Text style={[styles.sectionText, { fontSize: 14 * textScale, lineHeight: 22 * textScale }]}>
              From Home, tap the plus button and choose 'Now & Next'.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: 18 * textScale }]}>
              2. Pick the "Now" activity
            </Text>
            <Text style={[styles.sectionText, { fontSize: 14 * textScale, lineHeight: 22 * textScale }]}>
              Tap the Now card. Choose from the library or create a custom card with a photo and title.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: 18 * textScale }]}>
              3. Pick the "Next" activity
            </Text>
            <Text style={[styles.sectionText, { fontSize: 14 * textScale, lineHeight: 22 * textScale }]}>
              Tap the Next card. Pick a clear, familiar image so it is easy to understand.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: 18 * textScale }]}>4. Saving a card</Text>
            <Text style={[styles.sectionText, { fontSize: 14 * textScale, lineHeight: 22 * textScale }]}>
              Long press a card to save it to the library.  Long press it in the library to delete it.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: 18 * textScale }]}>5. Save your board</Text>
            <Text style={[styles.sectionText, { fontSize: 14 * textScale, lineHeight: 22 * textScale }]}>
              When you leave the screen, we will ask if you want to save.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: 18 * textScale }]}>Need more help?</Text>
            <Text style={[styles.sectionText, { fontSize: 14 * textScale, lineHeight: 22 * textScale }]}>
              Any questions or something is not working, you can email or share logs with us from the Support screen.
            </Text>
            <TouchableOpacity
              accessibilityRole="button"
              style={styles.supportButton}
              onPress={() => navigation.navigate("Support")}
            >
              <Text style={[styles.supportButtonText, { fontSize: 16 * textScale }]}>
                Go to Support
              </Text>
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
