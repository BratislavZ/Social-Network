import { useState } from "react";

import { PostInterface } from "../models/interfaces";
import { sendDislike, sendLike } from "../store/api/post-api-actions";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { postActions } from "../store/slices/post-slice";
import { uiActions } from "../store/slices/ui-slice";

const usePost = (data: PostInterface) => {
  const userId = useAppSelector((state) => state.user._id);
  const dispatch = useAppDispatch();
  const [numOfLikes, setNumOfLikes] = useState<number>(data.likes.length);

  const liked = data.likes.find((_id) => _id === userId);
  const [isLiked, setIsLiked] = useState<boolean>(liked ? true : false);

  const likeHandler = () => {
    if (isLiked) {
      setNumOfLikes((prev: number) => (prev = prev - 1));
      dispatch(sendDislike(data._id));
    } else {
      setNumOfLikes((prev: number) => (prev = prev + 1));
      dispatch(sendLike(data._id));
    }
    setIsLiked((prev) => !prev);
  };

  const showLikesHandler = () => {
    dispatch(postActions.selectPost({ _id: data._id }));
    dispatch(uiActions.showLikesModal(true));
  };

  const deleteHandler = () => {
    dispatch(postActions.selectPost({ _id: data._id }));
    dispatch(uiActions.showDeleteModal(true));
  };

  const showImageHandler = () => {
    dispatch(
      uiActions.showImageModal({ isModalShown: true, image: data.imageUrl })
    );
  };

  return {
    isLiked,
    likeHandler,
    numOfLikes,
    showLikesHandler,
    deleteHandler,
    showImageHandler,
  };
};

export default usePost;
