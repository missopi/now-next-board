import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CountdownSetup from "./CountdownSetup";
import Countdown from "./Countdown";

const Stack = createNativeStackNavigator();

const CountdownContainer = () => {
  return (
    <Stack.Navigator initialRouteName="CountdownSetup" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CountdownSetup" component={CountdownSetup} />
      <Stack.Screen name="Countdown" component={Countdown} />
    </Stack.Navigator>
  );
};

export default CountdownContainer;