import React, { useState, useEffect } from "react";
import {
  faClock,
  faHourglassEnd,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";

interface Props {
  onTimerEnd: any;
  resetTimer: any;
}

const Timer = (props: Props) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft === 0) {
      props.onTimerEnd();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, props.onTimerEnd]);

  const resetCountDown = () => {
    setTimeLeft(60);
  };

  useEffect(() => {
    if (props.resetTimer) {
      resetCountDown();
    }
  }, [props.resetTimer]);

  return (
    <div className="timer-display">
      <FontAwesomeIcon icon={faStopwatch} />
      <p>{timeLeft}s</p>
    </div>
  );
};

export default Timer;
