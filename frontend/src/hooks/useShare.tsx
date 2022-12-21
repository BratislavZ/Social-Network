import React, { useState } from "react";

import { sendNewPost } from "../store/api/post-api-actions";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";

const useShare = () => {
  const fetchingError = useAppSelector((state) => state.ui.share.errorMsg);
  const dispatch = useAppDispatch();

  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setFile(fileList[0]);
    setError("");
  };

  const descChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
    setError("");
  };

  const removeImageHandler = () => {
    setFile(null);
  };

  const shareHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (desc.trim().length === 0 && !file) {
      setError("Please enter some data.");
      return;
    }

    const formData = new FormData();

    if (file) {
      formData.append("image", file);
    }
    formData.append("desc", desc);

    dispatch(sendNewPost(formData));
    setDesc("");
    setFile(null);
    setError("");
  };

  return {
    desc,
    file,
    removeImageHandler,
    imageChangeHandler,
    descChangeHandler,
    shareHandler,
    error: error || fetchingError,
  };
};

export default useShare;
