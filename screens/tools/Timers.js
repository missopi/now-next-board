import React, { useState, useEffect, useRef } from "react";
import {View, Text, Image, Pressable, Animated} from "react-native"
import styles from "../styles/styles";

const Timers = () => {
  const [seconds, setSeconds] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prev -1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);
  
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setSeconds(30);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const mins = String(Math.floor(time / 60)).padStart(2, '0');
    const secs = String(time % 60).padStart(2, '0');
    return `${secs}`;
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.count}>{formatTime(seconds)}</Text>
      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={() => setIsRunning(!isRunning)}> 
          <Text style={styles.buttonText}>{isRunning ? 'pause' : 'start'}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Timers;