import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchRegister } from "../store/api/auth-api-actions";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { uiActions } from "../store/slices/ui-slice";

type FormData = {
  username: string;
  email: string;
  password: string;
};

const useRegisterForm = () => {
  const navigate = useNavigate();
  const fetchingErrorMsg = useAppSelector(
    (state) => state.ui.register.errorMsg
  );
  const fetchingSuccessMsg = useAppSelector(
    (state) => state.ui.register.successMsg
  );

  const dispatch = useAppDispatch();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: FormData) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const loginHandler = () => {
    navigate("/login");
    // clean error && success messages
    setError("");
    dispatch(uiActions.isRegistering({ isFetching: false }));
  };

  const validEmail = new RegExp(
    /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/
  );

  const validationHandler = () => {
    if (formData.username.trim().length === 0) {
      setError("Please fill in username field.");
      return false;
    }
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
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    dispatch(fetchRegister(data));
  };

  return {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    error: error || fetchingErrorMsg,
    successMsg: fetchingSuccessMsg,
    inputHandler,
    loginHandler,
    submitHandler,
  };
};

export default useRegisterForm;
