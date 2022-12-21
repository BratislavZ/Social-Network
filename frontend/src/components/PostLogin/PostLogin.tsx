import React from "react";

import { useAppSelector } from "../../store/hooks/hooks";

import DeletePost from "../Modal/DeletePost/DeletePost";
import DeleteUser from "../Modal/DeleteUser/DeleteUser";
import EditUserInfo from "../Modal/EditUserInfo/EditUserInfo";
import Followers from "../Modal/Followers/Followers";
import Followings from "../Modal/Followings/Followings";
import Image from "../Modal/Image/Image";
import Likes from "../Modal/Likes/Likes";
import Logout from "../Modal/Logout/Logout";
import UserImg from "../Modal/UserImg/UserImg";
import SideBar from "../SideBar/SideBar";
import Toolbar from "../Toolbar/Toolbar";
import styles from "./PostLogin.module.css";

type Props = {
  children: React.ReactNode;
};

const PostLogin = ({ children }: Props) => {
  const isLogOutModalShown = useAppSelector(
    (state) => state.ui.modalLogout.isModalShown
  );
  const isDeleteUserModalShown = useAppSelector(
    (state) => state.ui.modalDeleteUser.isModalShown
  );
  const isLikesModalShown = useAppSelector(
    (state) => state.ui.modalLikes.isModalShown
  );
  const isDeleteModalShown = useAppSelector(
    (state) => state.ui.modalDeletePost.isModalShown
  );
  const isImageModalShown = useAppSelector(
    (state) => state.ui.modalImage.isModalShown
  );
  const isFollowersModalShown = useAppSelector(
    (state) => state.ui.modalFollowers.isModalShown
  );

  const isEditUserInfoModalShown = useAppSelector(
    (state) => state.ui.modalEditUserInfo.isModalShown
  );
  const isProfileImgModalShown = useAppSelector(
    (state) => state.ui.modalProfileImg.isModalShown
  );
  const isCoverImgModalShown = useAppSelector(
    (state) => state.ui.modalCoverImg.isModalShown
  );
  const isFollowingsModalShown = useAppSelector(
    (state) => state.ui.modalFollowings.isModalShown
  );

  return (
    <>
      {isLogOutModalShown && <Logout />}
      {isDeleteUserModalShown && <DeleteUser />}
      {isLikesModalShown && <Likes />}
      {isDeleteModalShown && <DeletePost />}
      {isImageModalShown && <Image />}
      {isFollowersModalShown && <Followers />}

      {isEditUserInfoModalShown && <EditUserInfo />}
      {isProfileImgModalShown && <UserImg title="Profile image" />}
      {isCoverImgModalShown && (
        <UserImg isCoverImg={true} title="Cover image" />
      )}
      {isFollowingsModalShown && <Followings />}

      <Toolbar />
      <div className={styles.container}>
        <SideBar />
        {children}
      </div>
    </>
  );
};

export default PostLogin;
