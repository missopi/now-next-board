import { useEffect } from "react";
import { SafeAreaView, View, Text } from "react-native";

const NowNextBoardFinished = () => {
  useEffect(() => {
  // Lock this screen to LANDSCAPE only
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

  return () => {
    // Unlock when leaving
    ScreenOrientation.unlockAsync();
  };
}, []);

};

export default NowNextBoardFinished;