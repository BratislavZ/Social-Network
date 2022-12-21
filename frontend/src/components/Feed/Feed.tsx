import { useAppSelector } from "../../store/hooks/hooks";
import { PostInterface } from "../../models/interfaces";
import useFeed from "../../hooks/useFeed";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Post from "../Post/Post";
import Share from "../Share/Share";
import styles from "./Feed.module.css";

type Props = {
  isProfile?: boolean;
};

const Feed = ({ isProfile }: Props) => {
  const isFetchingFeed = useAppSelector((state) => state.ui.feed.isFetching);
  const { posts, showShare, errorMessage } = useFeed(isProfile);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {showShare() && <Share />}

        {isFetchingFeed && (
          <div className={styles.spinner}>
            <LoadingSpinner />
          </div>
        )}
        {!isFetchingFeed &&
          !errorMessage &&
          posts.map((p: PostInterface) => <Post key={p._id} data={p} />)}
        {!isFetchingFeed && !errorMessage && posts.length === 0 && (
          <div className={styles["no-posts"]}>No posts.</div>
        )}
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Feed;
