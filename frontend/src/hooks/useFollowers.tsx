import { useEffect, useState } from "react";

import { PersonType } from "../models/types";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { uiActions } from "../store/slices/ui-slice";
import { peopleActions } from "../store/slices/people-slice";
import { getCookie } from "../helpers/Cookie";

import defaultPicture from "../assets/person/newUser.jpg";

const useFollowers = () => {
  const profile = useAppSelector((state) => state.profile);
  const { _id } = profile;
  const dispatch = useAppDispatch();

  const [followers, setFollowers] = useState<PersonType[]>([]);
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const openModalHandler = () => {
    dispatch(peopleActions.selectPerson({ _id }));
    dispatch(uiActions.showFollowersModal(true));
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchRequest = () => {
      setIsLoading(true);
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/followers/${_id}?page=1&perPage=6`,
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
          const followers = data.user.followers.map((follower: PersonType) => {
            return {
              ...follower,
              profilePicture: follower.profilePicture || defaultPicture,
            };
          });
          setTotalFollowers(data.user.totalFollowers);
          setFollowers(followers);
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

  return { followers, totalFollowers, error, isLoading, openModalHandler };
};

export default useFollowers;
