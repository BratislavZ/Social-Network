import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Modal = {
  isModalShown?: boolean;
  isFetching?: boolean;
  errorMsg?: string;
};

type UserInfoModal = {
  isModalShown: boolean;
  city?: string;
  from?: string;
  gender?: string;
  username?: string;
};

type ImageModal = {
  isModalShown: boolean;
  image?: string;
};

type Request = {
  isFetching: boolean;
  errorMsg?: string;
  successMsg?: string;
};

interface UI {
  share: Request;
  login: Request;
  register: Request;
  feed: Request;
  people: Request;
  person: Request;
  profile: Request;
  userImg: Request;
  userInfo: Request;
  followStatus: Request;
  follows: Request;
  deleteUser: Request;

  modalDeletePost: Modal;
  modalDeleteUser: Modal;
  modalLogout: Modal;
  modalLikes: Modal;
  modalFollowers: Modal;
  modalFollowings: Modal;
  modalProfileImg: Modal;
  modalCoverImg: Modal;
  modalEditUserInfo: UserInfoModal;
  modalImage: ImageModal;
}

const initialState: UI = {
  share: {
    isFetching: false,
    errorMsg: "",
  },
  login: {
    isFetching: false,
    errorMsg: "",
  },
  register: {
    isFetching: false,
    errorMsg: "",
    successMsg: "",
  },
  feed: {
    isFetching: false,
    errorMsg: "",
  },
  people: {
    isFetching: false,
    errorMsg: "",
  },
  person: {
    isFetching: false,
    errorMsg: "",
  },
  profile: {
    isFetching: false,
    errorMsg: "",
  },
  userImg: {
    isFetching: false,
    errorMsg: "",
    successMsg: "",
  },
  userInfo: {
    isFetching: false,
    errorMsg: "",
    successMsg: "",
  },
  followStatus: {
    isFetching: false,
    errorMsg: "",
  },
  follows: {
    isFetching: false,
    errorMsg: "",
  },
  deleteUser: {
    isFetching: false,
    errorMsg: "",
    successMsg: "",
  },

  modalDeletePost: {
    isModalShown: false,
    isFetching: false,
    errorMsg: "",
  },
  modalDeleteUser: {
    isModalShown: false,
    isFetching: false,
    errorMsg: "",
  },
  modalLikes: {
    isModalShown: false,
    isFetching: false,
    errorMsg: "",
  },
  modalFollowers: {
    isModalShown: false,
  },
  modalFollowings: {
    isModalShown: false,
  },
  modalLogout: {
    isModalShown: false,
  },
  modalEditUserInfo: {
    isModalShown: false,
    city: "",
    from: "",
    gender: "",
  },
  modalProfileImg: {
    isModalShown: false,
  },
  modalCoverImg: {
    isModalShown: false,
  },
  modalImage: {
    isModalShown: false,
    image: "",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    isSendingPost(state, action: PayloadAction<Request>) {
      state.share.isFetching = action.payload.isFetching;
      state.share.errorMsg = action.payload.errorMsg || "";
    },
    isDeletingPost(state, action: PayloadAction<Request>) {
      state.modalDeletePost.isFetching = action.payload.isFetching;
      state.modalDeletePost.errorMsg = action.payload.errorMsg || "";
    },
    isLoggingIn(state, action: PayloadAction<Request>) {
      state.login.isFetching = action.payload.isFetching;
      state.login.errorMsg = action.payload.errorMsg || "";
    },
    isRegistering(state, action: PayloadAction<Request>) {
      state.register.isFetching = action.payload.isFetching;
      state.register.errorMsg = action.payload.errorMsg || "";
      state.register.successMsg = action.payload.successMsg || "";
    },
    isLoadingProfile(state, action: PayloadAction<Request>) {
      state.profile.isFetching = action.payload.isFetching;
      state.profile.errorMsg = action.payload.errorMsg || "";
    },
    isLoadingFeed(state, action: PayloadAction<Request>) {
      state.feed.isFetching = action.payload.isFetching;
      state.feed.errorMsg = action.payload.errorMsg || "";
    },
    isLoadingPeople(state, action: PayloadAction<Request>) {
      state.people.isFetching = action.payload.isFetching;
      state.people.errorMsg = action.payload.errorMsg || "";
    },
    showDeleteModal(state, action: PayloadAction<boolean>) {
      state.modalDeletePost.isModalShown = action.payload;
    },

    showLikesModal(state, action: PayloadAction<boolean>) {
      state.modalLikes.isModalShown = action.payload;
    },
    isLoadingLikes(state, action: PayloadAction<Request>) {
      state.modalLikes.isFetching = action.payload.isFetching;
      state.modalLikes.errorMsg = action.payload.errorMsg || "";
    },

    showFollowersModal(state, action: PayloadAction<boolean>) {
      state.modalFollowers.isModalShown = action.payload;
    },
    showFollowingsModal(state, action: PayloadAction<boolean>) {
      state.modalFollowings.isModalShown = action.payload;
    },
    isLoadingFollows(state, action: PayloadAction<Request>) {
      state.follows.isFetching = action.payload.isFetching;
      state.follows.errorMsg = action.payload.errorMsg || "";
    },

    showLogoutModal(state, action: PayloadAction<boolean>) {
      state.modalLogout.isModalShown = action.payload;
    },

    showEditUserInfoModal(state, action: PayloadAction<UserInfoModal>) {
      state.modalEditUserInfo.isModalShown = action.payload.isModalShown;
      state.modalEditUserInfo.username = action.payload.username || "";
      state.modalEditUserInfo.city = action.payload.city || "";
      state.modalEditUserInfo.from = action.payload.from || "";
      state.modalEditUserInfo.gender = action.payload.gender || "";
    },
    isUpdatingUserInfo(state, action: PayloadAction<Request>) {
      state.userInfo.isFetching = action.payload.isFetching;
      state.userInfo.errorMsg = action.payload.errorMsg || "";
      state.userInfo.successMsg = action.payload.successMsg || "";
    },

    showProfileImgModal(state, action: PayloadAction<boolean>) {
      state.modalProfileImg.isModalShown = action.payload;
    },
    showCoverImgModal(state, action: PayloadAction<boolean>) {
      state.modalCoverImg.isModalShown = action.payload;
    },
    isUpdatingUserImg(state, action: PayloadAction<Request>) {
      state.userImg.isFetching = action.payload.isFetching;
      state.userImg.errorMsg = action.payload.errorMsg || "";
      state.userImg.successMsg = action.payload.successMsg || "";
    },

    isSendingFollowStatus(state, action: PayloadAction<Request>) {
      state.followStatus.isFetching = action.payload.isFetching;
      state.followStatus.errorMsg = action.payload.errorMsg || "";
    },

    showDeleteUserModal(state, action: PayloadAction<boolean>) {
      state.modalDeleteUser.isModalShown = action.payload;
    },
    isDeletingUser(state, action: PayloadAction<Request>) {
      state.deleteUser.isFetching = action.payload.isFetching;
      state.deleteUser.errorMsg = action.payload.errorMsg || "";
    },

    showImageModal(state, action: PayloadAction<ImageModal>) {
      state.modalImage.isModalShown = action.payload.isModalShown;
      state.modalImage.image = action.payload.image || "";
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
