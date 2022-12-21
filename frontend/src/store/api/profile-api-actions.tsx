import { AppDispatch } from "..";
import { getCookie } from "../../helpers/Cookie";
import { profileActions } from "../slices/profile-slice";
import { uiActions } from "../slices/ui-slice";

export const fetchProfile = (personId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(uiActions.isLoadingProfile({ isFetching: true }));

    const fetchRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/` + personId,
        {
          headers: {
            Authorization: "Bearer " + getCookie("jwt"),
          },
        }
      );
      if (response.status === 404) {
        throw new Error("User doesn't exist.");
      }
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      return data;
    };

    try {
      const data = await fetchRequest();
      dispatch(uiActions.isLoadingProfile({ isFetching: false }));
      dispatch(profileActions.loadProfile(data.user));
    } catch (error) {
      const errorMessage = errorHandler(error);
      dispatch(
        uiActions.isLoadingProfile({
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
  if (!message) {
    message = "Something went wrong!";
  }
  return message;
};
