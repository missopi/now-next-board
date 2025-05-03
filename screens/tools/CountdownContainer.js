import React, { useState } from "react";
import CountdownSetup from "./CountdownSetup";
import Countdown from "./Countdown";

const CountdownContainer = () => {
  const [startData, setStartData] = useState(null);

  if (startData) {
    return <Countdown countStart={startData.count} activity={startData.activity} />;
  }

  return <CountdownSetup onStart={(count, activity) => setStartData({ count, activity })} />;
};

export default CountdownContainer;