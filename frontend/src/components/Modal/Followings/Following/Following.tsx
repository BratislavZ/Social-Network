import React from "react";
import { useNavigate } from "react-router-dom";

import { PersonType } from "../../../../models/types";
import { useAppDispatch } from "../../../../store/hooks/hooks";
import { uiActions } from "../../../../store/slices/ui-slice";

import styles from "./Following.module.css";

type Props = {
  data: PersonType;
};

const Following = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { profilePicture, username, _id } = props.data;

  const selectFollower = () => {
    navigate("/person/" + _id);
    dispatch(uiActions.showFollowingsModal(false));
  };

  return (
    <div className={styles.following} ref={ref}>
      <img
        alt="follower"
        src={profilePicture}
        className={styles.image}
        onClick={selectFollower}
      />
      <div className={styles.username} onClick={selectFollower}>
        {username}
      </div>
    </div>
  );
});

export default Following;
