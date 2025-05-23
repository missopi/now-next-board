import { View, Text, SafeAreaView, useWindowDimensions } from "react-native";

const CreatedFeelingsBoard = ({ route }) => {
  const { selectedEmotions = [] } = route.params || {};
  const { width } = useWindowDimensions();

  // calculate size based on count
  const num = selectedEmotions.length;
  const columns = Math.ceil(Math.sqrt(num));
  const size = width / columns - 20; // margin buffer

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>I feel...</Text>
      {selectedEmotions.length === 0 ? (
          <Text style={{ fontSize: 12, marginBottom: 10 }}>No emotions selected</Text>
        ) : (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {selectedEmotions.map(({ label, Icon }) => (
              <View
                key={label}
                style={{ width: size, height: size, margin: 5, alignItems: 'center', justifyContent: 'center' }}
              >
                <Icon width={size * 0.6} height={size * 0.6} />
                <Text style={{ marginTop: 4 }}>{label}</Text>
              </View>
            ))}
          </View>
        )}
    </SafeAreaView>
  );
};

export default CreatedFeelingsBoard;