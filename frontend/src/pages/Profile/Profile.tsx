import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { fetchProfile } from "../../store/api/profile-api-actions";

import Feed from "../../components/Feed/Feed";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Top from "../../components/Profile/Top/Top";
import PostLogin from "../../components/PostLogin/PostLogin";
import styles from "./Profile.module.css";

const Profile = () => {
  const error = useAppSelector((state) => state.ui.profile.errorMsg);
  const isFetchingProfile = useAppSelector(
    (state) => state.ui.profile.isFetching
  );
  const personId = useParams().personId;
  const profilePageRefresh = useAppSelector((state) => state.page.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (personId) {
      dispatch(fetchProfile(personId));
    }
  }, [personId, dispatch, profilePageRefresh]);

  return (
    <PostLogin>
      {!isFetchingProfile && !error && (
        <div className={styles.right}>
          <Top />
          <div className={styles.main}>
            <div className={styles["profile-info"]}>
              <ProfileInfo />
            </div>
            <div className={styles.feed}>
              <Feed isProfile={true} />
            </div>
          </div>
        </div>
      )}

      {!isFetchingProfile && error && (
        <div className={styles.error}>{error}</div>
      )}

      {isFetchingProfile && (
        <div className={styles.spinner}>
          <LoadingSpinner />
        </div>
      )}
    </PostLogin>
  );
};

export default Profile;
