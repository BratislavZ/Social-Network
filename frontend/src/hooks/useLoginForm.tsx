import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchLogin } from "../store/api/auth-api-actions";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { uiActions } from "../store/slices/ui-slice";

type FormData = {
  email: string;
  password: string;
};

const useLoginForm = () => {
  const navigate = useNavigate();
  const fetchingError = useAppSelector((state) => state.ui.login.errorMsg);
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: FormData) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const registerHandler = () => {
    navigate("/register");
    // clean error && success messages
    setError("");
    dispatch(uiActions.isLoggingIn({ isFetching: false }));
  };

  const validEmail = new RegExp(
    /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/
  );

  const validationHandler = () => {
    if (!validEmail.test(formData.email)) {
      setError("Please enter a valid email!");
      return false;
    }
    if (formData.password.trim().length < 6) {
      setError("Password has to be at least 6 characters long!");
      return false;
    }
    return true;
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = validationHandler();
    if (!isFormValid) {
      return;
    }
    setError("");

    const data = {
      email: formData.email,
      password: formData.password,
    };

    dispatch(fetchLogin(data));
  };

  return {
    email: formData.email,
    password: formData.password,
    error: error || fetchingError,
    inputHandler,
    registerHandler,
    submitHandler,
  };
};

export default useLoginForm;
