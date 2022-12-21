import { sendPostToDelete } from "../store/api/post-api-actions";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { uiActions } from "../store/slices/ui-slice";

const useDeletePostModal = () => {
  const isDeleting = useAppSelector(
    (state) => state.ui.modalDeletePost.isFetching
  );
  const postId = useAppSelector((state) => state.post._id);
  const error = useAppSelector((state) => state.ui.modalDeletePost.errorMsg);
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    dispatch(uiActions.showDeleteModal(false));
  };

  const deleteHandler = () => {
    dispatch(sendPostToDelete(postId));
  };
  return {
    isDeleting,
    error,
    closeHandler,
    deleteHandler,
  };
};

export default useDeletePostModal;
