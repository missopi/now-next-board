import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HelpScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const horizontalPadding = isTablet ? 32 : 20;
  const contentMaxWidth = isTablet ? 680 : 560;
  const textScale = isTablet ? 1.5 : 1;

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]}>
      <View style={[styles.container, { paddingHorizontal: horizontalPadding }]}>
        <View style={[styles.content, { maxWidth: contentMaxWidth }]}>
          <Text style={[styles.title, { fontSize: 26 * textScale }]}>How can we help?</Text>
          <Text style={[styles.description, { fontSize: 16 * textScale }]}>
            Choose a guide or contact support. Everything is simple and easy to follow.
          </Text>

          <TouchableOpacity
            accessibilityRole="button"
            style={styles.secondaryCard}
            onPress={() => navigation.navigate("UserGuide")}
          >
            <Text style={[styles.cardTitle, { fontSize: 18 * textScale }]}>Now & Next Guide</Text>
            <Text style={[styles.cardText, { fontSize: 15 * textScale }]}>
              Step-by-step help for building a Now/Next board.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityRole="button"
            style={styles.secondaryCard}
            onPress={() => navigation.navigate("RoutineGuide")}
          >
            <Text style={[styles.cardTitle, { fontSize: 18 * textScale }]}>Routine Guide</Text>
            <Text style={[styles.cardText, { fontSize: 15 * textScale }]}>
              Simple steps for building a routine with multiple cards.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityRole="button"
            style={styles.secondaryCard}
            onPress={() => navigation.navigate("Support")}
          >
            <Text style={[styles.cardTitle, { fontSize: 18 * textScale }]}>Support</Text>
            <Text style={[styles.cardText, { fontSize: 15 * textScale }]}>
              Share logs or email us if something is not working.
            </Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 12,
  },
  content: {
    width: "100%",
    maxWidth: 560,
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
  primaryCard: {
    marginTop: 20,
    backgroundColor: "#829cb6ff",
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 16,
    minHeight: 64,
  },
  secondaryCard: {
    marginTop: 14,
    backgroundColor: "#d8dee3ff",
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 16,
    minHeight: 64,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#14324a",
  },
  cardText: {
    marginTop: 6,
    fontSize: 15,
    color: "#2b4d66",
  },
});

export default HelpScreen;
