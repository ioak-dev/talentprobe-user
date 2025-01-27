"use client";

import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import UserDetail from "../UserForm/UserDetail";
import Assessment from "../UserForm/Assessment";
import { checkResponse, submitAnswer } from "../UserForm/service";
import { validateResponseId } from "./service";
import AssessmentSubmitted from "../UserForm/AssessmentSubmitted";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Camera } from "react-camera-pro";

interface Props {}

const MainPage = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams<{ assessmentid: string }>();
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>({
    responseId: "",
    referenceId: "",
    question: {},
    currentQuestionNumber: 0,
    totalQuestions: 0,
  });
  const responseId = searchParams.get("response-id");
  const camera = useRef<any>(null);
  const [image, setImage] = useState("");
  const [showCamera, setShowCamera] = useState(false);

  const saveUserDetails = (userDetails: any) => {
    setShowCamera(true);
    const assessmentId = params.assessmentid;
    setLoading(true);
    checkResponse(assessmentId, userDetails).then((res: any) => {
      setLoading(false);
      router.push(`/${assessmentId}?response-id=${res.responseId}`);
      // captureImage();
    });
  };

  const onSubmitAnswer = (answer: string) => {
    // if (currentQuestion.currentQuestionNumber % 5 === 0) {
    //   captureImage();
    // }
    setLoading(true);
    submitAnswer(params.assessmentid, responseId || "", {
      referenceId: currentQuestion.referenceId,
      answer,
    }).then((res: any) => {
      setCurrentQuestion(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (responseId) { 
      validateResponseId(params.assessmentid, responseId || "").then(
        (response) => {
        setCurrentQuestion(response);
        setShowCamera(true);
        }
      );
    }
  }, [responseId]);

  // const captureImage = () => {
  //   setTimeout(() => {
  //     const imageSrc = camera.current.takePhoto();
  //     setImage(imageSrc);
  //     console.log(imageSrc);
  //   }, 5000);
  // };

  return (
    <div className="main-page-container">
      {/* <div className="camera-container">
        {showCamera && <Camera ref={camera} />}
      </div> */}
      <div className="main-page">
        {!responseId && (
          <div className="main-page__left">
            <h2>Fill in your details to start the assessment</h2>
            <p>All the best</p>
          </div>
        )}
        {responseId && !currentQuestion?.hasSubmitted && (
          <div className="main-page__left">
            <p>
              <b>
                Question {currentQuestion.currentQuestionNumber} of{" "}
                {currentQuestion.totalQuestions}
              </b>
            </p>
            <h4><pre>{currentQuestion.question?.question}</pre></h4>
            <p>Select one answer</p>
          </div>
        )}
        {responseId && currentQuestion?.hasSubmitted && (
               <div className="main-page__left">
                 <div className="main-page__icon" > <FontAwesomeIcon icon={faFaceSmile} /></div>
               </div>
            )}
        <div className="main-page__right">
          <div>
            {!responseId && <UserDetail saveUserDetails={saveUserDetails} />}
            {responseId && currentQuestion?.question && (
              <Assessment
                currentQuestion={currentQuestion}
                onSubmit={onSubmitAnswer}
                loading={loading}
              />
            )}
            {responseId && currentQuestion?.hasSubmitted && (
              <AssessmentSubmitted></AssessmentSubmitted>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
