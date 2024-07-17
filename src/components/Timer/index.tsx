import React, { useState, useEffect, useRef } from "react";
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
    const endTime = new Date().getTime() + timeLeft * 1000;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = endTime - now;
      const secondsLeft = Math.max(0, Math.floor(difference / 1000));
      setTimeLeft(secondsLeft);

      if (secondsLeft === 0) {
        clearInterval(intervalId);
        props.onTimerEnd();
        return;
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [props.onTimerEnd]);

  const resetCountDown = () => {
    setTimeLeft(60);
  };

  useEffect(() => {
    if (props.resetTimer) {
      resetCountDown();
    }
  }, [props.resetTimer]);

  return (
    <div className={`timer-display ${timeLeft <= 15 ? "change-bg-color" : ""}`}>
      <FontAwesomeIcon
        className={`${timeLeft <= 15 ? "blink timer-end" : ""}`}
        icon={faStopwatch}
      />
      <p className={`${timeLeft <= 15 ? "timer-end" : ""}`}>{timeLeft}s</p>
    </div>
  );
};

export default Timer;
