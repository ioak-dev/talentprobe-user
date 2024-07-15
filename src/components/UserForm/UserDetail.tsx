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
    firstName: "",
    lastName: "",
  });

  const handleUserDetailsChange = (event: any) => {
    const { name, value } = event.target;
    let UpdatedValue = value;
    if (name === 'email') {
      UpdatedValue = value.trim().toLowerCase();
    }
    setUserDetails({
      ...userDetails,
      [name]: UpdatedValue,
    });
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
            />
            <Input
              label="First name"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleUserDetailsChange}
            />
            <Input
              label="Last name"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleUserDetailsChange}
            />
          </div>
          <div className="user-detail__action">
            <div />
            <Button
              theme={ThemeType.primary}
              onClick={() => props.saveUserDetails(userDetails)}
              disabled={!userDetails.email || !userDetails.firstName || !userDetails.lastName}
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
