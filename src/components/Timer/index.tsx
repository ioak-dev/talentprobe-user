import React, { useState, useEffect, useRef } from "react";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";

interface Props {
  onTimerEnd: any;
  resetTimer: any;
  duration: any;
}

const Timer = (props: Props) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const intervalId = useRef<any>(null);
  const endTime = useRef<number>(0);

  const updateCountdown = () => {
    const now = new Date().getTime();
    const difference = endTime.current - now;
    const secondsLeft = Math.max(0, Math.floor(difference / 1000));
    setTimeLeft(secondsLeft);

    if (secondsLeft === 0) {
      clearInterval(intervalId.current);
      props.onTimerEnd();
    }
  };

  useEffect(() => {
    endTime.current = new Date().getTime() + props.duration * 1000;
    setTimeLeft(props.duration);

    intervalId.current = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId.current); 
  }, [props.duration]); 

  useEffect(() => {
    if (props.resetTimer) {
      clearInterval(intervalId.current);
      endTime.current = new Date().getTime() + props.duration * 1000;
      setTimeLeft(props.duration);
      intervalId.current = setInterval(updateCountdown, 1000);
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
