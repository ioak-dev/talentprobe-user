"use client";

import React, { useEffect, useState } from "react";
import "./style.css";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import UserDetail from "../UserForm/UserDetail";
import Assessment from "../UserForm/Assessment";
import { checkResponse, submitAnswer } from "../UserForm/service";
import { validateResponseId } from "./service";
import AssessmentSubmitted from "../UserForm/AssessmentSubmitted";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const saveUserDetails = (userDetails: any) => {
    const assessmentId = params.assessmentid;
    setLoading(true);
    checkResponse(assessmentId, userDetails).then((res: any) => {
      setLoading(false);
      router.push(`/${assessmentId}?response-id=${res.responseId}`);
    });
  };

  const onSubmitAnswer = (answer: string) => {
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
    console.log(responseId);
    validateResponseId(params.assessmentid, responseId || "").then(
      (response) => {
        setCurrentQuestion(response);
      }
    );
  }, [responseId]);

  return (
    <div className="main-page-container">
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
            <h3>{currentQuestion.question?.question}</h3>
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
