"use client";
import { Button, Radio, ThemeType } from "basicui";
import "./Assessment.css";
import { useEffect, useState } from "react";
import { faCheck, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Timer from "../Timer/index";

interface Props {
  currentQuestion: any;
  onSubmit: any;
  loading: boolean;
}

const Assessment = (props: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isResetTimer, setIsResetTimer] = useState(false);

  useEffect(() => {
    setIsResetTimer(false);
  }, [props.currentQuestion]);

  const handleChoiceChange = (answer: string, index: number) => {
    setSelectedAnswer(answer);
  };

  const onSubmitAnswer = () => {
    // const payload= {
    //   referenceId:response?.referenceId,
    //   answer:selectedAnswer,
    // }
    // submitAnswer(payload,assessmentId,response?.responseId).then((response: any) =>{
    //   console.log(response);
    //   setResponse(response);
    //   setAssessmentQuestion(response.question);
    // })
    props.onSubmit(selectedAnswer);
    setIsResetTimer(true);
  };

  const handleTimerEnd = () => {
    console.log("Timer has ended!");
    onSubmitAnswer();
  };

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
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div className="objective-question__form__action">
          <Timer onTimerEnd={handleTimerEnd} resetTimer={isResetTimer} />
          <Button
            theme={ThemeType.primary}
            onClick={() => onSubmitAnswer()}
            loading={props.loading}
          >
            <FontAwesomeIcon icon={faChevronRight} />
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
