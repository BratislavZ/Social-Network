import { useState, useEffect } from "react";

import { getCookie } from "../helpers/Cookie";
import { PersonType } from "../models/types";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { peopleActions } from "../store/slices/people-slice";
import { uiActions } from "../store/slices/ui-slice";

import defaultPicture from "../assets/person/newUser.jpg";

const useFollowings = () => {
  const profile = useAppSelector((state) => state.profile);
  const { _id } = profile;
  const dispatch = useAppDispatch();

  const [followings, setFollowings] = useState<PersonType[]>([]);
  const [totalFollowings, setTotalFollowings] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const openModalHandler = () => {
    dispatch(peopleActions.selectPerson({ _id }));
    dispatch(uiActions.showFollowingsModal(true));
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchRequest = () => {
      setIsLoading(true);
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/followings/${_id}?page=1&perPage=6`,
        {
          headers: {
            Authorization: "Bearer " + getCookie("jwt"),
          },
          signal,
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Something went wrong!");
          }
          return res.json();
        })
        .then((data) => {
          const followings = data.user.followings.map(
            (following: PersonType) => {
              return {
                ...following,
                profilePicture: following.profilePicture || defaultPicture,
              };
            }
          );
          setTotalFollowings(data.user.totalFollowings);
          setFollowings(followings);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setError("Something went wrong!");
        });
    };

    fetchRequest();

    return () => {
      controller.abort();
    };
  }, [_id, profile.isFollowed]);

  return { followings, totalFollowings, error, isLoading, openModalHandler };
};

export default useFollowings;
