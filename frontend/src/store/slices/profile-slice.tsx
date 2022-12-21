import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProfileInterface } from "../../models/interfaces";
import CoverImg from "../../assets/post/3.jpeg";
import DefaultImg from "../../assets/person/newUser.jpg";

const initialState: ProfileInterface = {
  _id: "",
  email: "",
  username: "",
  profilePicture: "",
  coverPicture: "",
  city: "",
  from: "",
  gender: "",
  followers: [],
  followings: [],
  isFollowed: undefined,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    loadProfile(state, action: PayloadAction<ProfileInterface>) {
      const profile = action.payload;

      state._id = profile._id;
      state.username = profile.username;
      state.email = profile.email;
      state.profilePicture = profile.profilePicture || DefaultImg;
      state.coverPicture = profile.coverPicture || CoverImg;
      state.city = profile.city;
      state.from = profile.from;
      state.gender = profile.gender;
      state.followers = profile.followers;
      state.followings = profile.followings;
      state.isFollowed = profile.isFollowed;
    },
    changeStatus(state, action: PayloadAction<{ isFollowed: boolean }>) {
      state.isFollowed = action.payload.isFollowed;
    },
    cleanProfile(state) {
      state = initialState;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
