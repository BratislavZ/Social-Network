import { AppDispatch } from "..";
import { getCookie } from "../../helpers/Cookie";
import { feedActions } from "../slices/feed-slice";
import { uiActions } from "../slices/ui-slice";

export const sendNewPost = (postData: FormData) => {
  return async (dispatch: AppDispatch) => {
    dispatch(uiActions.isSendingPost({ isFetching: true }));

    const fetchRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/post/new-post`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + getCookie("jwt"),
          },
          body: postData,
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      return data;
    };

    try {
      const data = await fetchRequest();
      dispatch(feedActions.createPost(data.post));
      dispatch(uiActions.isSendingPost({ isFetching: false }));
    } catch (error) {
      dispatch(
        uiActions.isSendingPost({
          isFetching: false,
          errorMsg: "Something went wrong",
        })
      );
    }
  };
};

export const sendLike = (postId: string) => {
  return async (dispatch: AppDispatch) => {
    const fetchRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/post/like/` + postId,
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
    } catch (error) {}
  };
};

export const sendDislike = (postId: string) => {
  return async (dispatch: AppDispatch) => {
    const fetchRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/post/dislike/` + postId,
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
    } catch (error) {}
  };
};

export const sendPostToDelete = (postId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(uiActions.isDeletingPost({ isFetching: true }));
    const fetchRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/post/delete/` + postId,
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
      const data = await fetchRequest();
      dispatch(feedActions.removePost({ _id: data.postId }));
      dispatch(uiActions.isDeletingPost({ isFetching: false }));
      dispatch(uiActions.showDeleteModal(false));
    } catch (error) {
      dispatch(
        uiActions.isDeletingPost({
          isFetching: false,
          errorMsg: "Something went wrong!",
        })
      );
    }
  };
};
