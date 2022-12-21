import React, { useState } from "react";

import { sendUserInfo } from "../store/api/user-api-actions";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { uiActions } from "../store/slices/ui-slice";

import { SelectChangeEvent } from "@mui/material/Select";

const useEditUserInfoModal = () => {
  const isSending = useAppSelector((state) => state.ui.userInfo.isFetching);
  const userInfo = useAppSelector((state) => state.ui.modalEditUserInfo);
  const fetchingErrorMsg = useAppSelector(
    (state) => state.ui.userInfo.errorMsg
  );
  const fetchingSuccessMsg = useAppSelector(
    (state) => state.ui.userInfo.successMsg
  );
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");
  const [gender, setGender] = useState(userInfo.gender || "");
  const [inputData, setInputData] = useState({
    username: userInfo.username || "",
    city: userInfo.city || "",
    from: userInfo.from || "",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const closeHandler = () => {
    dispatch(uiActions.showEditUserInfoModal({ isModalShown: false }));
    dispatch(uiActions.isUpdatingUserInfo({ isFetching: false }));
  };

  const selectHandler = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (inputData.username.trim().length === 0) {
      setError("Username field can't be empty.");
      return;
    }
    const data = {
      username: inputData.username,
      city: inputData.city,
      from: inputData.from,
      gender,
    };
    dispatch(sendUserInfo(data));
  };

  return {
    username: inputData.username,
    city: inputData.city,
    from: inputData.from,
    gender,
    error: error || fetchingErrorMsg,
    successMsg: fetchingSuccessMsg,
    isSending,
    inputHandler,
    selectHandler,
    submitHandler,
    closeHandler,
  };
};

export default useEditUserInfoModal;
