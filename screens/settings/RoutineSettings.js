import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Slider } from 'react-native-elements';
import styles from "../styles/NowNextBoardStyles";
import tinycolor from 'tinycolor2';

const RoutineSettingsModal = ({ strokeColor, setStrokeColor }) => {
  const initialHSL = tinycolor(strokeColor).toHsl();

  const [hue, setHue] = useState(Math.round(initialHSL.h));
  const [saturation, setSaturation] = useState(Math.round(initialHSL.s * 100));
  const [lightness, setLightness] = useState(Math.round(initialHSL.l * 100));

  useEffect(() => {
    const h = hue;
    const s = saturation / 100;
    const l = lightness / 100;

    const newColor = tinycolor({ h, s, l }).toHexString();
    setStrokeColor(newColor);
  }, [hue, saturation, lightness]);

  const sliderStyle = {
    trackStyle: { 
      height: 6,
      borderRadius: 3,
      backgroundColor: '#e0e0e0',
    },
    thumbStyle: { 
      height: 24, 
      width: 24,
      backgroundColor: '#000',
      borderRadius: 12,
      borderWidth: 2,
      borderColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2, 
    },
    minimumTrackTintColor: "#4a90e2",
    maximumTrackTintColor: "#ccc",
  };

  return (
    <View style={styles.modal}>
      <Text style={styles.modalTitle}>Settings</Text>

      {/* HUE */}
      <Text>Hue</Text>
      {console.log("Slider HUE value:", hue)}
      <Slider
        minimumValue={0}
        maximumValue={360}
        step={1}
        value={hue}
        onValueChange={setHue}
        {...sliderStyle}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} />

      {/* SATURATION */}
      <Text style={{ marginTop: 24 }}>Saturation</Text>
      {console.log("Slider SATURATION value:", saturation)}
      <Slider
        value={saturation}
        onValueChange={setSaturation}
        minimumValue={0}
        maximumValue={100}
        step={1}
        {...sliderStyle}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} />

      {/* LIGHTNESS */}
      <Text style={{ marginTop: 24 }}>Lightness</Text>
      {console.log("Slider LIGHTNESS value:", lightness)}
      <Slider
        value={lightness}
        onValueChange={setLightness}
        minimumValue={0}
        maximumValue={100}
        step={1}
        {...sliderStyle}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} />

      {/* PREVIEW */}
      <View style={{ alignItems: 'center', marginTop: 32 }}>
        <Text>Preview</Text>
        <View
          style={{
            marginTop: 8,
            width: 120,
            height: 36,
            backgroundColor: strokeColor,
            borderRadius: 8,
            borderColor: '#aaa',
            borderWidth: 1,
          }}
        />
      </View>
      
      {/* DEFAULT */}
      <TouchableOpacity
        onPress={() => { 
          setHue(51); 
          setSaturation(100); 
          setLightness(85);
        }}
        style={{ marginTop: 20, padding: 12, backgroundColor: '#eee', borderRadius: 6, alignItems: 'center' }}
      >
        <Text style={{ color: '#333' }}>Back to Default</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoutineSettingsModal;