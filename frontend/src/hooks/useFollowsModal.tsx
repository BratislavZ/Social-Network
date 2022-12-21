import { useEffect, useState, useCallback, useRef } from "react";

import { getCookie } from "../helpers/Cookie";
import { PersonType } from "../models/types";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { uiActions } from "../store/slices/ui-slice";

import defaultPicture from "../assets/person/newUser.jpg";

type Props = {
  isFollower?: boolean;
};

const useFollowsModal = ({ isFollower }: Props) => {
  const personId = useAppSelector((state) => state.people.person._id);
  const dispatch = useAppDispatch();

  const observer = useRef<IntersectionObserver | null>(null);
  const [people, setPeople] = useState<PersonType[]>([]);
  const [totalNumPeople, setTotalNumPeople] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState("");

  const closeModalHandler = () => {
    if (isFollower) {
      dispatch(uiActions.showFollowersModal(false));
    } else {
      dispatch(uiActions.showFollowingsModal(false));
    }
  };

  const lastCardRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) {
        observer.current?.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);

    const fetchRequest = () => {
      let url = `${process.env.REACT_APP_BACKEND_URL}/user/followings/${personId}?page=${pageNumber}&perPage=10`;
      if (isFollower) {
        url = `${process.env.REACT_APP_BACKEND_URL}/user/followers/${personId}?page=${pageNumber}&perPage=10`;
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
          setError("");
          let peopleData = data.user.followings;
          if (isFollower) {
            peopleData = data.user.followers;
          }
          const people = peopleData.map((person: PersonType) => {
            return {
              ...person,
              profilePicture: person.profilePicture || defaultPicture,
            };
          });
          let total = data.user.totalFollowings;
          if (isFollower) {
            total = data.user.totalFollowers;
          }
          setTotalNumPeople(total);
          setPeople((prev) => (prev ? [...prev, ...people] : people));
          setHasMore(peopleData.length > 0);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setHasMore(false);
          setError("Something went wrong.");
        });
    };
    fetchRequest();

    return () => {
      controller.abort();
    };
  }, [personId, pageNumber, isFollower]);

  return {
    totalNumPeople,
    people,
    lastCardRef,
    error,
    loading,
    closeModalHandler,
  };
};

export default useFollowsModal;
