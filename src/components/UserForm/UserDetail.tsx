import { Button, Input, ThemeType } from "basicui";
import "./UserDetail.css";
import { useEffect, useState } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
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

  const OnSubmitDetails = () => {
    if (validateEmail(userDetails.email)) {
      props.saveUserDetails(userDetails);
    } else {
      setIsEmailValid(false);
    }
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
              onClick={() => OnSubmitDetails()}
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
    </div>
  );
};

export default UserDetail;
