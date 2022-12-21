import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { sendFollow } from "../store/api/user-api-actions";
import { useAppDispatch } from "../store/hooks/hooks";
import { peopleActions } from "../store/slices/people-slice";
import { uiActions } from "../store/slices/ui-slice";

const usePerson = (_id: string, followers: []) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isSendingFollow, setIsSendingFollow] = useState(false);
  const [error, setError] = useState("");
  const [numOfFollowers] = useState<number>(followers.length);

  const showFollowersHandler = () => {
    dispatch(uiActions.showFollowersModal(true));
    dispatch(peopleActions.selectPerson({ _id }));
  };

  const followHandler = () => {
    setError("");
    setIsSendingFollow(true);
    dispatch(sendFollow(_id))
      .then(() => {
        setIsSendingFollow(false);
        dispatch(peopleActions.removePerson({ _id }));
      })
      .catch(() => {
        setIsSendingFollow(false);
        setError("Something went wrong!");
      });
  };

  const selectPersonHandler = () => {
    navigate("/person/" + _id);
  };

  return {
    numOfFollowers,
    isSendingFollow,
    error,
    followHandler,
    showFollowersHandler,
    selectPersonHandler,
  };
};

export default usePerson;
