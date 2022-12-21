import { useEffect, useState } from "react";

import { getCookie } from "../helpers/Cookie";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { uiActions } from "../store/slices/ui-slice";
import DefaultImg from "../assets/person/newUser.jpg";

type User = {
  _id: string;
  username: string;
  profilePicture: string;
};

const useLikesModal = () => {
  const postId = useAppSelector((state) => state.post._id);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const [peopleThatLiked, setPeopleThatLiked] = useState<User[]>([]);

  const closeModalHandler = () => {
    dispatch(uiActions.showLikesModal(false));
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchRequest = () => {
      setIsLoading(true);
      fetch(`${process.env.REACT_APP_BACKEND_URL}/post/likes/` + postId, {
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
          setIsLoading(false);
          const likes = data.likes.map((user: User) => {
            return {
              ...user,
              profilePicture: user.profilePicture || DefaultImg,
            };
          });
          setPeopleThatLiked(likes);
          setIsLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchRequest();

    return () => {
      controller.abort();
    };
  }, [postId]);

  return {
    isLoading,
    isLoaded,
    peopleThatLiked,
    closeModalHandler,
  };
};

export default useLikesModal;
