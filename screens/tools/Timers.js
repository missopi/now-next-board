import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable } from "react-native"
import styles from "../styles/timerStyles";

const Timers = () => {
  const [seconds, setSeconds] = useState(60);
  const [initialSeconds, setInitialSeconds] = useState(60)
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
    setSeconds(initialSeconds);
    setIsRunning(false);
  };

  const selectTime = (minutes) => {
    if (!isRunning) {
      const newTime = minutes * 60;
      setSeconds(newTime);
      setInitialSeconds(newTime);
    }
  };

  const formatTime = (time) => {
    const mins = String(Math.floor(time / 60)).padStart(2, '0');
    const secs = String(time % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <View style={styles.timerContainer}>
      <View style={styles.timeSelector}>
        {[1, 5, 10].map((min) => (
          <Pressable
            key={min}
            onPress={() => selectTime(min)}
            style={[styles.timeOption, initialSeconds === min * 60 && !isRunning && styles.selectedTimeOption,]}
          >
            <Text style={styles.timeOptionText}>{min} min</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.timerCount}>{formatTime(seconds)}</Text>
      
      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={() => setIsRunning(!isRunning)}> 
          <Text style={styles.buttonText}>{isRunning ? 'pause' : 'start'}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={resetTimer}>
          <Text style={styles.buttonText}>reset</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Timers;