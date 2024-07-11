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

interface Props {}

const UserDetail = (props: Props) => {
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
    <div className="user-detail">
      <div className="user-detail__form">
        <Input label="Email" />
        <Input label="First name" />
        <Input label="Last name" />
      </div>
      <div className="user-detail__action">
        <div />
        <Button theme={ThemeType.primary}>
          <FontAwesomeIcon icon={faChevronRight} />
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default UserDetail;
