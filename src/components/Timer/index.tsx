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

  const percentageLeft = (timeLeft / props.duration) * 100;

  let colorClass = "default-bg";
  let blink = "";
  if (percentageLeft > 50 && percentageLeft < 75) {
    colorClass = "warning-bg";
  } else if (percentageLeft <= 50) {
    colorClass = "danger-bg";
    blink = "blink";
  }

  return (
    <div className={`timer-display ${colorClass}`}>
      <FontAwesomeIcon
        className={`timer-display ${colorClass} ${blink}`}
        icon={faStopwatch}
      />
      {timeLeft > 0 && <p className="timer-text">{timeLeft} Seconds</p>}
      {timeLeft === 0 && <p className="timer-text">Time up</p>}
    </div>
  );
};

export default Timer;
