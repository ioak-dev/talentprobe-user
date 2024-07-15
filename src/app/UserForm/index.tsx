import "./style.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import UserDetail from "./UserDetail";
import Assessment from "./Assessment/page"
import { checkResponse } from "./Assessment/service";
import { useRouter } from "next/navigation";

interface Props {}

const UserForm = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [response,setResponse] =useState({
    responseId:'',
    referenceId:'',
    question:''
  });
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

  const saveUserDetails = () => {
    const assessmentId = "667a79c9ec2bf94e9da6756c";
    const id = "123";
    checkResponse(assessmentId).then((response: any) => {
      console.log(response)
      setResponse(response);
      if (response.hasSubmitted) {
        setHasSubmitted(true);
      } else {
        router.push(
          `?assessmentId=${assessmentId}&response-id=${id}`,
          undefined,
          { shallow: true }
        );
      }
    });
  };

  return (
    <div className="user-form">
      {!responseId && <UserDetail saveUserDetails={saveUserDetails} />}
      {responseId && <Assessment response={response}/>}
    </div>
  );
};

export default UserForm;
