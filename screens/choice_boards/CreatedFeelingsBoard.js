import { View, Text, SafeAreaView, useWindowDimensions } from "react-native";

const CreatedFeelingsBoard = ({ route }) => {
  const { selectedEmotions = [] } = route.params || {};
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;

  const num = selectedEmotions.length;

  // dynamically calculate columns
  const columns = num <=4 ? 1 : isPortrait
    ? Math.min(3, Math.ceil(Math.sqrt(num)))
    : Math.min(4, Math.ceil(Math.sqrt(num)));
  
  // calculate icon size
  const spacing = 16;
  const size = (width - spacing * (columns + 1)) / columns;

  // break into rows
  const rows = [];
  for (let i = 0; i < num; i += columns) {
    rows.push(selectedEmotions.slice(i, i + columns));
  }
   
  // fallback
  if (!selectedEmotions || selectedEmotions.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 12, marginBottom: 10 }}>No emotions selected</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: spacing }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, alignSelf: 'center' }}>I feel...</Text>

      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: spacing }}
        >
          {row.map(({ label, Icon }) => (
            <View
              key={label}
              style={{ width: size, alignItems: 'center', marginHorizontal: spacing / 2 }}
            >
              <Icon width={size * 0.8} height={size * 0.8} />
              <Text style={{ marginTop: 8, fontWeight: '500' }}>{label}</Text>
            </View>
          ))}
        </View>
      ))}
    </SafeAreaView>
  );
};

export default CreatedFeelingsBoard;