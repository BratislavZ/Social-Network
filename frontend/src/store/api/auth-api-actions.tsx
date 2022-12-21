import { AppDispatch } from "..";
import { setCookie } from "../../helpers/Cookie";
import { authActions } from "../slices/auth-slice";
import { uiActions } from "../slices/ui-slice";
import { userActions } from "../slices/user-slice";

type Auth = {
  email: string;
  password: string;
  username?: string;
};

export const fetchLogin = (loginData: Auth) => {
  return async (dispatch: AppDispatch) => {
    dispatch(uiActions.isLoggingIn({ isFetching: true }));

    const fetchRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (response.status === 404) {
        throw new Error("User doesn't exist!");
      }

      if (response.status === 401) {
        throw new Error("Wrong password, please try again.");
      }

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      return data;
    };

    try {
      const data = await fetchRequest();
      console.log(data);
      setCookie("jwt", data.token, 3 * 60 * 60 * 1000);
      setCookie("userLogged", JSON.stringify(data.user), 3 * 60 * 60 * 1000);
      dispatch(uiActions.isLoggingIn({ isFetching: false }));
      dispatch(authActions.login());
      dispatch(userActions.loadUser(data.user));

      // clean any error or success messages
      dispatch(uiActions.isRegistering({ isFetching: false }));
    } catch (error) {
      const errorMessage = errorHandler(error);
      dispatch(
        uiActions.isLoggingIn({
          isFetching: false,
          errorMsg: errorMessage,
        })
      );
    }
  };
};

export const fetchRegister = (registerData: Auth) => {
  return async (dispatch: AppDispatch) => {
    dispatch(uiActions.isRegistering({ isFetching: true }));

    const fetchRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        }
      );

      if (response.status === 422) {
        throw new Error("User already exists or validation failed.");
      }
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      return data;
    };

    try {
      const data = await fetchRequest();
      dispatch(
        uiActions.isRegistering({ isFetching: false, successMsg: data.message })
      );
    } catch (error) {
      const errorMessage = errorHandler(error);
      dispatch(
        uiActions.isRegistering({
          isFetching: false,
          errorMsg: errorMessage,
        })
      );
    }
  };
};

const errorHandler = (error: any) => {
  let message = "";
  if (error instanceof Error) {
    message = error.message;
  } else {
    message = String(error);
  }
  if (message === "Failed to fetch") {
    message = "Something went wrong!";
  }
  return message;
};
