import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Post = {
  _id: string;
};

const initialState: Post = {
  _id: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    selectPost(state, action: PayloadAction<Post>) {
      state._id = action.payload._id;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
