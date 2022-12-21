import { useEffect } from "react";

import { getCookie } from "../helpers/Cookie";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { feedActions } from "../store/slices/feed-slice";
import { uiActions } from "../store/slices/ui-slice";

const useFeed = (isProfile?: boolean) => {
  const userId = useAppSelector((state) => state.user._id);
  const errorMessage = useAppSelector((state) => state.ui.feed.errorMsg);
  const profileId = useAppSelector((state) => state.profile._id);
  const posts = useAppSelector((state) => state.feed.posts);
  const homePageRefresh = useAppSelector((state) => state.page.home);
  const dispatch = useAppDispatch();

  const showShare = () => {
    if (!isProfile) {
      return true;
    }
    if (isProfile && profileId === userId) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchRequest = () => {
      dispatch(uiActions.isLoadingFeed({ isFetching: true }));

      let url = `${process.env.REACT_APP_BACKEND_URL}/post/feed`;
      if (isProfile) {
        url += "/profile/" + profileId;
      }

      fetch(url, {
        headers: {
          Authorization: "Bearer " + getCookie("jwt"),
        },
        signal,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json();
        })
        .then((data) => {
          dispatch(uiActions.isLoadingFeed({ isFetching: false }));
          dispatch(feedActions.loadFeed(data.posts));
        })
        .catch((err) => {
          dispatch(
            uiActions.isLoadingFeed({
              isFetching: false,
              errorMsg: "Something went wrong!",
            })
          );
        });
    };
    fetchRequest();

    return () => {
      controller.abort();
    };
  }, [dispatch, profileId, isProfile, homePageRefresh]);

  return {
    posts,
    showShare,
    errorMessage,
  };
};

export default useFeed;
