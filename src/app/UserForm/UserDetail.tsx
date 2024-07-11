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
import "./UserDetail.css";
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
import { useRouter } from "next/navigation";
import Link from 'next/link';

interface Props {}

const UserDetail = (props: Props) => {
  const router = useRouter();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [hasSubmitted,setHasSubmitted] = useState(false);

  const [state, setState] = useState<{
    question: string;
    answer: string;
    choices: string[];
  }>({
    question: "",
    answer: "",
    choices: [],
  });

  const editQuestion = () => {};

  const handleQuestionChange = (event: any) => {
    setState({
      ...state,
      question: event.currentTarget.value || "",
    });
  };

  const handleChoiceChange = (answer: string, index: number) => {
    setState({
      ...state,
      answer,
    });
  };

  const handleSave = () => {
    setIsEditDialogOpen(false);
  };

  const saveUserDetails = () => {
    const assessmentId="123";
    const id="123"
    const response={
      hasSubmitted:false
    }
    if(response.hasSubmitted){
      setHasSubmitted(true);
    } else{
      router.push(`/UserForm/ObjectiveQuestion?${assessmentId}?response-id=${id}`)
    }
    
  }

  return (
    <div className="user-detail">
      {!hasSubmitted && (
      <><div className="user-detail__form">
          <Input label="Email" />
          <Input label="First name" />
          <Input label="Last name" />
        </div><div className="user-detail__action">
            <div />
            <Button theme={ThemeType.primary} onClick={() => saveUserDetails()}>
              <FontAwesomeIcon icon={faChevronRight} />
              Proceed
            </Button>
          </div></>
      )}
      {hasSubmitted && (
      <div className="submitted-response">
        <p>Your response has been already submitted.</p>
      </div>
      )}
    </div>
  );
};

export default UserDetail;
