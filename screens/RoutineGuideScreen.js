import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RoutineGuideScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Routine Guide</Text>
          <Text style={styles.description}>
            Build a simple routine with steps your child recognizes.
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Start a routine</Text>
            <Text style={styles.sectionText}>
              From Home, tap the plus button and choose Routine. 
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Add steps</Text>
            <Text style={styles.sectionText}>
              Tap a step card. Choose from the library or add a custom photo and title.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Keep it simple</Text>
            <Text style={styles.sectionText}>
              Use clear images and short titles. Fewer steps are easier to follow.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Saving an activity</Text>
            <Text style={styles.sectionText}>
              Long press an activity card if you want to save it to the library.  You can delete the card if you no longer want it by long pressing it in the library.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Save your routine</Text>
            <Text style={styles.sectionText}>
              When you leave the screen, we will ask if you want to save.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Need more help?</Text>
            <Text style={styles.sectionText}>
              If something is not working, you can share logs with us from the Support screen.
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
    fontSize: 15,
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

export default RoutineGuideScreen;
