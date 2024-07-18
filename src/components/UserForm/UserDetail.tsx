import {
  Button,
  Input,
  ThemeType,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  IconButton,
} from "basicui";
import "./UserDetail.css";
import { useEffect, useState } from "react";
import { faChevronRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

interface Props {
  saveUserDetails: any;
}

const UserDetail = (props: Props) => {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    givenName: "",
    familyName: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isRulesDialogOpen, setIsRulesDialogOpen] = useState(false);

  const handleUserDetailsChange = (event: any) => {
    const { name, value } = event.target;
    let UpdatedValue = value;
    if (name === "email") {
      setIsEmailValid(true);
      UpdatedValue = value.trim().toLowerCase();
      validateEmail(value);
    }
    setUserDetails({
      ...userDetails,
      [name]: UpdatedValue,
    });
  };

  const openInfoDialog = () => {
    if (validateEmail(userDetails.email)) {
      setIsRulesDialogOpen(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const onSubmitDetails = () => {
    props.saveUserDetails(userDetails);
  };

  const validateEmail = (email: any) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  return (
    <div className="user-detail">
      {!hasSubmitted && (
        <>
          <div className="user-detail__form">
            <Input
              label="Email"
              name="email"
              value={userDetails.email}
              onChange={handleUserDetailsChange}
              tooltip={isEmailValid ? "" : "E-mail not valid"}
            />
            {/* {!isEmailValid && <p className="email_invalid">E-mail not valid</p>} */}
            <Input
              label="Given name"
              name="givenName"
              value={userDetails.givenName}
              onChange={handleUserDetailsChange}
            />
            <Input
              label="Family name"
              name="familyName"
              value={userDetails.familyName}
              onChange={handleUserDetailsChange}
            />
          </div>
          <div className="user-detail__action">
            <div />
            <Button
              theme={ThemeType.primary}
              onClick={() => openInfoDialog()}
              disabled={
                !userDetails.email ||
                !userDetails.givenName ||
                !userDetails.familyName
              }
            >
              <FontAwesomeIcon icon={faChevronRight} />
              Proceed
            </Button>
          </div>
        </>
      )}
      {hasSubmitted && (
        <div className="submitted-response">
          <p>Your response has been already submitted.</p>
        </div>
      )}
      <Modal
        isOpen={isRulesDialogOpen}
        onClose={() => setIsRulesDialogOpen(false)}
      >
        <ModalHeader
          heading="Attention"
          onClose={() => setIsRulesDialogOpen(false)}
        />
        <ModalBody>
          <div className="info_box">
            {/* <div className="info-title">
              <span>Some Rules of this Quiz</span>
            </div> */}
            <div className="info-list">
              <div className="info">
                1. Each question should be answered within the time indicated in
                the counter.
              </div>
              <div className="info">
                2. Once the time runs out, the last selected answer will be
                saved.
              </div>
              <div className="info">
                3. If no answer is selected, you will not receive any score for
                that question.
              </div>
              <div className="info">
                4. You can't exit from the assessment in the middle.
              </div>
              <div className="info">
                5. You'll get points on the basis of your correct answers.
              </div>
              <div className="info">
                6. No negative marks for incorrect answers.
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button theme={ThemeType.primary} onClick={() => onSubmitDetails()}>
            Continue
          </Button>
          <IconButton onClick={() => setIsRulesDialogOpen(false)}>
            <FontAwesomeIcon icon={faClose} />
          </IconButton>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UserDetail;
