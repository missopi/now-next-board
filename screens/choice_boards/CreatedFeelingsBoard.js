import { View, Text, SafeAreaView, useWindowDimensions } from "react-native";

const CreatedFeelingsBoard = ({ route }) => {
  const { selectedEmotions = [] } = route.params || {};
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;

  const num = selectedEmotions.length;

  // fallback
  if (num === 0) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 12, marginBottom: 10 }}>No emotions selected</Text>
      </SafeAreaView>
    );
  }

  const getGridDimension = (count) => {
    if (count <= 4) return 1;
    if (count <= 8) return 2;
    return 3;
  };

  let rows, columns;

  if (isPortrait) {
    columns =getGridDimension(num);
    rows = Math.ceil(num / columns);
  } else {
    rows = getGridDimension(num);
    columns = Math.ceil(num / rows);
  };

  const spacing = 10;
  const size = (width - spacing * (columns + 1)) / columns;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>I feel...</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingHorizontal: 8 }}>
        {selectedEmotions.map(({ label, Icon }, index) => (
          <View
            key={label + index}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon width={size * 0.85} height={size * 0.85} />
            <Text style={{ marginTop: 2, fontSize: 16, fontWeight: 'bold' }}>{label}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default CreatedFeelingsBoard;