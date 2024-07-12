"use client";
import {
  Button,
  ButtonVariantType,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Radio,
  Textarea,
  ThemeType,
} from "basicui";
import cloneDeep from "lodash/cloneDeep";
import "./style.css";
import { useEffect, useState } from "react";
import {
  faCheck,
  faChevronRight,
  faClose,
  faPen,
  faPenAlt,
  faPenClip,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkResponse, submitAnswer } from "./service";
import { ObjectiveQuestionResponse } from "@/types/ObjectiveQuestionResponse";

interface Props {
  response:any;
}

const ObjectiveQuestion = (props: Props) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [response,setResponse]=useState({
    currentQuestionNumber:0,
    responseId:'',
    referenceId:'',
    question:{choices:[],
      question:'',
      questionId:'',
      type:''}
  });
  const [assessmentQuestion, setAssessmentQuestion]=useState({
    choices:[],
    question:'',
    questionId:'',
    type:''
  });
  const [selectedAnswer, setSelectedAnswer]=useState('');
  const [assessmentId,setAssessmentId]=useState('667a79c9ec2bf94e9da6756c');

  const [state, setState] = useState<{
    question: string;
    answer: string;
    choices: string[];
  }>({
    question: "",
    answer: "",
    choices: [],
  });

  useEffect(() => {
    setResponse(props.response);
      setAssessmentQuestion(props.response.question);
   console.log(props.response)
  }, [props.response]);

  const editQuestion = () => {};

  const handleQuestionChange = (event: any) => {
    setState({
      ...state,
      question: event.currentTarget.value || "",
    });
  };

  const handleChoiceChange = (answer: string, index: number) => {
    setSelectedAnswer(answer)
  };

  const handleSave = () => {
    setIsEditDialogOpen(false);
  };

  const onSubmitAnswer = () => {
    const payload= {
      referenceId:response?.referenceId,
      answer:selectedAnswer,
    }
    submitAnswer(payload,assessmentId,response?.responseId).then((response: any) =>{
      console.log(response);
      setResponse(response);
      setAssessmentQuestion(response.question);
    })
  }

  return (
    <div className="main-container">
    <div className="objective-question">
      <div className="objective-question__form">
        <div>
         {assessmentQuestion.question}
        </div>
        <div className="objective-question__form__choices">
        {assessmentQuestion?.choices.map((item, index: number) => (
                <div
                  className="objective-question__choices__choice"
                  key={index}
                >
                  <Radio
                    value={item}
                    onChange={() => handleChoiceChange(item, index)}
                    label={item}
                  />
                </div>
              ))}
        </div>
      </div>
      <div className="objective-question__form__action">
        <div>{response.currentQuestionNumber} of 10 questions</div>
        <Button theme={ThemeType.primary} onClick={()=> onSubmitAnswer()}>
          <FontAwesomeIcon icon={faChevronRight} />
          Next
        </Button>
      </div>
    </div>
    </div>
  );
};

export default ObjectiveQuestion;
