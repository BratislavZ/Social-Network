import { useEffect } from "react";

import { getCookie } from "../helpers/Cookie";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { peopleActions } from "../store/slices/people-slice";
import { uiActions } from "../store/slices/ui-slice";

const usePeople = () => {
  const people = useAppSelector((state) => state.people.people);
  const peoplePageRefresh = useAppSelector((state) => state.page.people);
  const isFetchingPeople = useAppSelector(
    (state) => state.ui.people.isFetching
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchRequest = () => {
      dispatch(uiActions.isLoadingPeople({ isFetching: true }));

      fetch(`${process.env.REACT_APP_BACKEND_URL}/user/people`, {
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
          dispatch(uiActions.isLoadingPeople({ isFetching: false }));
          dispatch(peopleActions.loadPeople(data.people));
        })
        .catch(() => {
          dispatch(
            uiActions.isLoadingPeople({
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
  }, [dispatch, peoplePageRefresh]);

  return { people, isFetchingPeople };
};

export default usePeople;
