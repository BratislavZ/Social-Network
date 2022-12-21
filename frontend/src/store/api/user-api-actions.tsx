import { AppDispatch } from "..";
import { profileActions } from "../slices/profile-slice";
import { uiActions } from "../slices/ui-slice";
import { userActions } from "../slices/user-slice";
import { feedActions } from "../slices/feed-slice";
import { eraseCookie, getCookie } from "../../helpers/Cookie";
import { authActions } from "../slices/auth-slice";

type UserInfo = {
  username: string;
  city: string;
  from: string;
  gender: string;
};

export const sendUserInfo = (userInfo: UserInfo) => {
  return async (dispatch: AppDispatch) => {
    dispatch(uiActions.isUpdatingUserInfo({ isFetching: true }));

    const fetchRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/info`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt"),
          },
          body: JSON.stringify(userInfo),
        }
      );
      if (response.status === 422) {
        throw new Error("Validation failed!");
      }

      if (response.status === 404) {
        throw new Error("User doesn't exist!");
      }

      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      return data;
    };

    try {
      const data = await fetchRequest();
      dispatch(
        uiActions.isUpdatingUserInfo({
          isFetching: false,
          successMsg: data.message,
        })
      );
      dispatch(
        feedActions.changeUsername({
          username: data.user.username,
        })
      );
      dispatch(userActions.loadUser(data.user));
      dispatch(profileActions.loadProfile(data.user));
    } catch (error) {
      const errorMessage = errorHandler(error);
      dispatch(
        uiActions.isUpdatingUserInfo({
          isFetching: false,
          errorMsg: errorMessage,
        })
      );
    }
  };
};

export const sendUserPicture = (imgData: FormData, isCoverImg?: boolean) => {
  return async (dispatch: AppDispatch) => {
    dispatch(uiActions.isUpdatingUserImg({ isFetching: true }));
    let imgType = "profileImage";
    if (isCoverImg) {
      imgType = "coverImage";
    }
    const fetchRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/` + imgType,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + getCookie("jwt"),
          },
          body: imgData,
        }
      );
      if (response.status === 422) {
        throw new Error("Validation failed!");
      }

      if (response.status === 404) {
        throw new Error("User doesn't exist!");
      }

      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      return data;
    };

    try {
      const data = await fetchRequest();
      dispatch(
        uiActions.isUpdatingUserImg({
          isFetching: false,
          successMsg: data.message,
        })
      );
      if (!isCoverImg) {
        dispatch(
          feedActions.changeProfilePicture({
            profilePicture: data.user.profilePicture,
          })
        );
      }
      dispatch(userActions.loadUser(data.user));
      dispatch(profileActions.loadProfile(data.user));
    } catch (error) {
      const errorMessage = errorHandler(error);
      dispatch(
        uiActions.isUpdatingUserImg({
          isFetching: false,
          errorMsg: errorMessage,
        })
      );
    }
  };
};

export const sendFollow = (personId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(uiActions.isSendingFollowStatus({ isFetching: true }));

    const fetchRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/follow/` + personId,
        {
          headers: {
            Authorization: "Bearer " + getCookie("jwt"),
          },
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      return data;
    };

    try {
      await fetchRequest();
      dispatch(uiActions.isSendingFollowStatus({ isFetching: false }));
      dispatch(profileActions.changeStatus({ isFollowed: true }));
    } catch (error) {
      const errorMessage = errorHandler(error);
      dispatch(
        uiActions.isSendingFollowStatus({
          isFetching: false,
          errorMsg: errorMessage,
        })
      );
    }
  };
};

export const sendUnfollow = (personId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(uiActions.isSendingFollowStatus({ isFetching: true }));
    const fetchRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/unfollow/` + personId,
        {
          headers: {
            Authorization: "Bearer " + getCookie("jwt"),
          },
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      return data;
    };

    try {
      await fetchRequest();
      dispatch(uiActions.isSendingFollowStatus({ isFetching: false }));
      dispatch(profileActions.changeStatus({ isFollowed: false }));
    } catch (error) {
      const errorMessage = errorHandler(error);
      dispatch(
        uiActions.isSendingFollowStatus({
          isFetching: false,
          errorMsg: errorMessage,
        })
      );
    }
  };
};

export const deleteUser = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(uiActions.isDeletingUser({ isFetching: true }));
    const fetchRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + getCookie("jwt"),
          },
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      return data;
    };

    try {
      await fetchRequest();
      eraseCookie("jwt");
      eraseCookie("userLogged");
      dispatch(uiActions.isDeletingUser({ isFetching: false }));
      dispatch(uiActions.showDeleteUserModal(false));
      dispatch(authActions.logout());

      // clean any error or success messages
      dispatch(uiActions.isDeletingPost({ isFetching: false }));
      dispatch(uiActions.isLoadingFeed({ isFetching: false }));
      dispatch(uiActions.isLoadingFollows({ isFetching: false }));
      dispatch(uiActions.isLoadingLikes({ isFetching: false }));
      dispatch(uiActions.isLoadingPeople({ isFetching: false }));
      dispatch(uiActions.isLoadingProfile({ isFetching: false }));
      dispatch(uiActions.isSendingFollowStatus({ isFetching: false }));
      dispatch(uiActions.isSendingPost({ isFetching: false }));
      dispatch(uiActions.isUpdatingUserImg({ isFetching: false }));
      dispatch(uiActions.isUpdatingUserInfo({ isFetching: false }));
      dispatch(feedActions.cleanFeed());
      dispatch(profileActions.cleanProfile());
    } catch (error) {
      const errorMessage = errorHandler(error);
      dispatch(
        uiActions.isDeletingUser({
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
