import "./style.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ObjectiveQuestion from "./ObjectiveQuestion";
import UserDetail from "./UserDetail";

interface Props {}

const UserForm = (props: Props) => {
  const searchParams = useSearchParams();

  const responseId = searchParams.get("response-id");

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
  };

  return (
    <div className="user-form">
      {!responseId && <UserDetail />}
      {responseId && <ObjectiveQuestion />}
    </div>
  );
};

export default UserForm;
