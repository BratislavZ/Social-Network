import React, { useState, useRef } from "react";

import { sendUserPicture } from "../store/api/user-api-actions";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { uiActions } from "../store/slices/ui-slice";

const useUserImgModal = (isCoverImg?: boolean) => {
  const fetchingErrorMsg = useAppSelector((state) => state.ui.userImg.errorMsg);
  const fetchingSuccessMsg = useAppSelector(
    (state) => state.ui.userImg.successMsg
  );
  const isSending = useAppSelector((state) => state.ui.userImg.isFetching);
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const closeHandler = () => {
    if (isCoverImg) {
      dispatch(uiActions.showCoverImgModal(false));
    } else {
      dispatch(uiActions.showProfileImgModal(false));
    }
    dispatch(
      uiActions.isUpdatingUserImg({
        isFetching: false,
        errorMsg: "",
        successMsg: "",
      })
    );
  };

  const removeImageHandler = () => {
    setFile(null);
  };

  const selectImgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setFile(fileList[0]);

    setError("");
    dispatch(
      uiActions.isUpdatingUserImg({
        isFetching: false,
        errorMsg: "",
        successMsg: "",
      })
    );
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!file) {
      setError("Image is not selected.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    if (isCoverImg) {
      dispatch(sendUserPicture(formData, isCoverImg)).then((res) =>
        setFile(null)
      );
      return;
    }
    dispatch(sendUserPicture(formData)).then((res) => setFile(null));
  };

  return {
    inputRef,
    file,
    error: error || fetchingErrorMsg,
    successMsg: fetchingSuccessMsg,
    isSending,
    closeHandler,
    removeImageHandler,
    selectImgHandler,
    submitHandler,
  };
};

export default useUserImgModal;
