import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import DefaultImg from "../../assets/person/newUser.jpg";

interface User {
  _id: string;
  email: string;
  username: string;
  profilePicture: string;
}

const initialState: User = {
  _id: "",
  email: "",
  username: "",
  profilePicture: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser(state, action: PayloadAction<User>) {
      const user = action.payload;
      state._id = user._id;
      state.email = user.email;
      state.username = user.username;
      state.profilePicture = user.profilePicture || DefaultImg;
    },
    cleanUser(state) {
      state = initialState;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
