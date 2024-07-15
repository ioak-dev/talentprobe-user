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

interface Props {
  saveUserDetails: any;
}

const UserDetail = (props: Props) => {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  return (
    <div className="user-detail">
      {!hasSubmitted && (
        <>
          <div className="user-detail__form">
            <Input label="Email" />
            <Input label="First name" />
            <Input label="Last name" />
          </div>
          <div className="user-detail__action">
            <div />
            <Button
              theme={ThemeType.primary}
              onClick={() => props.saveUserDetails()}
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
