import { useNavigate } from "react-router-dom";

import { PostInterface } from "../../models/interfaces";
import { useAppSelector } from "../../store/hooks/hooks";
import usePost from "../../hooks/usePost";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import styles from "./Post.module.css";

type Props = {
  data: PostInterface;
};

const Post = ({ data }: Props) => {
  const userId = useAppSelector((state) => state.user._id);
  const navigate = useNavigate();

  const {
    isLiked,
    likeHandler,
    numOfLikes,
    showLikesHandler,
    deleteHandler,
    showImageHandler,
  } = usePost(data);

  const styleDesc = data.imageUrl ? styles["post-text"] : styles["only-text"];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          {userId === data.creator._id && (
            <DeleteOutlineIcon
              fontSize="large"
              className={styles["delete-icon"]}
              onClick={deleteHandler}
            />
          )}
          <div className={styles.header}>
            <img
              className={styles["profile-image"]}
              src={data.creator.profilePicture}
              alt=""
              onClick={() => navigate("/person/" + data.creator._id)}
            />
            <span
              className={styles.username}
              onClick={() => navigate("/person/" + data.creator._id)}
            >
              {data.creator.username}
            </span>
            <span className={styles.date}>
              {data.createdAt.substring(0, 10)}
            </span>
          </div>
        </div>
        <div className={styles.content}>
          <span className={styleDesc}>{data.desc}</span>
          <img
            className={styles["post-image"]}
            src={data.imageUrl}
            alt=""
            onClick={showImageHandler}
          />
        </div>
        <div className={styles.bottom}>
          <div className={styles["bottom-left"]}>
            {!isLiked && (
              <ThumbUpOffAltIcon
                className={styles.icon}
                onClick={likeHandler}
              />
            )}
            {isLiked && (
              <ThumbUpIcon className={styles.success} onClick={likeHandler} />
            )}

            <span className={styles["like-counter"]} onClick={showLikesHandler}>
              {numOfLikes >= 0 &&
                (numOfLikes === 1
                  ? numOfLikes + " like"
                  : numOfLikes + " likes")}
            </span>
          </div>
          <div className={styles["bottom-right"]}>
            <span className={styles["comment-text"]}>
              {/* {props.data.comments.length} comments */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
