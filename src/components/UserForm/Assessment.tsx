"use client";
import { Button, Radio, ThemeType } from "basicui";
import "./Assessment.css";
import { useEffect, useState } from "react";
import { faCheck, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Timer from "../Timer/index";
import { fetchResponse } from "./service";
import { useParams } from "next/navigation";

interface Props {
  currentQuestion: any;
  onSubmit: any;
  loading: boolean;
}

const Assessment = (props: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isResetTimer, setIsResetTimer] = useState(false);
  const [isTimerEnded, setIsTimerEnded] = useState(false);
  const params = useParams<{ assessmentid: string }>();
  const [assessmentData, setAssessmentData] = useState("");
  const [duration, setDuration] = useState();
  const [buttonText, setButtonText] = useState('Next');

  useEffect(() => {
    setIsResetTimer(false);
    setIsTimerEnded(false);
  }, [props.currentQuestion]);

  useEffect(() => {
    getAssessmentData();
  }, []);

  const getAssessmentData = () => {
    fetchResponse(params.assessmentid || "").then(
      (response: any) => {
        setAssessmentData(response);
        setDuration(response?.duration);
      }
    );
  }

  const handleChoiceChange = (answer: string, index: number) => {
    setSelectedAnswer(answer);
  };

  const onSubmitAnswer = () => {
    props.onSubmit(selectedAnswer);
    setIsResetTimer(true);
    setIsTimerEnded(false);
    setSelectedAnswer('');
    setButtonText('Next')
  };

  const handleTimerEnd = () => {
    console.log("Timer has ended!");
    setIsTimerEnded(true);
    // onSubmitAnswer();
  };

  useEffect(() => {
    if (isTimerEnded && !selectedAnswer) {
      setButtonText('Skip');
    }
  }, [isTimerEnded, selectedAnswer]);

  return (
    <div className="main-container">
      <div className="objective-question">
        <div className="objective-question__form">
          {/* <div>{props.currentQuestion.question?.question}</div> */}
          <div className="objective-question__form__choices">
            {props.currentQuestion.question?.choices?.map(
              (item: any, index: number) => (
                <div
                  className="objective-question__choices__choice"
                  key={index}
                >
                  <Radio
                    checked={item === selectedAnswer}
                    value={item}
                    onChange={() => handleChoiceChange(item, index)}
                    label={item}
                    disabled={isTimerEnded}
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div className="objective-question__form__action">
          <Timer onTimerEnd={handleTimerEnd} resetTimer={isResetTimer} duration={duration} />
          <Button
            theme={ThemeType.primary}
            onClick={() => onSubmitAnswer()}
            loading={props.loading}
            disabled={!selectedAnswer && !isTimerEnded}
          >
            <FontAwesomeIcon icon={faChevronRight} />
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
