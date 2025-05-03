import React, { useState } from "react";
import CountdownSetup from "./CountdownSetup";
import Countdown from "./Countdown";

const CountdownContainer = () => {
  const [startCount, setStartCount] = useState(null);

  const activity = {
    name: '',
    image: require('../images/water_play.jpg'),
  };

  if (startCount !== null) {
    return <Countdown countStart={startCount} activity={activity} />;
  }

  return <CountdownSetup onStart={setStartCount} />;
};

export default CountdownContainer;