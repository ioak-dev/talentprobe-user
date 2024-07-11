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
import "./ObjectiveQuestion.css";
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

interface Props {}

const ObjectiveQuestion = (props: Props) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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

  return (
    <div className="objective-question">
      <div className="objective-question__form">
        <div>
          Hoping to patch things up between Johnny and Julia Linda visits the
          Potters and finds them packing for a voyage to Europe. Seton later
          offers Johnny a job at his bank and Johnny reveals his plans for a
          holiday from work. Johnny leaves the mansion in a dark mood without
          saying goodbye to the family although he wishes the kitchen staff a
          Happy New Year as he goes.
        </div>
        <div className="objective-question__form__choices">
          <Radio label="Seeing her while in midhandspring" />
          <Radio label="This makes Johnny realize that Julia and Edward Sr" checked />
          <Radio label="Julia is certain that Johnny will give up his plans and return to her" />
        </div>
      </div>
      <div className="objective-question__form__action">
        <div>2 of 10 questions</div>
        <Button theme={ThemeType.primary}>
          <FontAwesomeIcon icon={faChevronRight} />
          Next
        </Button>
      </div>
    </div>
  );
};

export default ObjectiveQuestion;
