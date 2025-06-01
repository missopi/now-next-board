// Visual layout for answer card with yes, no and i don't know 

import { View, Text, SafeAreaView, useWindowDimensions } from "react-native";
import styles from "../styles/AnswerStyles";
import Yes from "../../assets/icons/hollowCircleTick";
import No from "../../assets/icons/no";
import IDontKnow from "../../assets/icons/question-mark";

const AnswerCard = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.wrapper, isLandscape ? styles.landscape : styles.portrait]}>
        <View style={styles.column}>
          <View style={styles.cardOne}>
            <Yes style={styles.yes}/>
            <Text style={styles.header}>Yes</Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.cardTwo}>
            <No style={styles.yes}/>
            <Text style={styles.header}>No</Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.cardThree}>
            <IDontKnow style={styles.yes}/>
            <Text style={styles.header}>I Don't Know</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AnswerCard;