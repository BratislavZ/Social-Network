import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PostInterface } from "../../models/interfaces";
import DefaultImg from "../../assets/person/newUser.jpg";

interface Feed {
  posts: PostInterface[];
}

const initialState: Feed = {
  posts: [],
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    loadFeed(state, action: PayloadAction<PostInterface[]>) {
      const posts = action.payload;
      state.posts = posts.map((post) => {
        const imageUrl = post.imageUrl || "";
        const profilePicture = post.creator.profilePicture || DefaultImg;
        return {
          ...post,
          imageUrl,
          creator: {
            ...post.creator,
            profilePicture,
          },
        };
      });
    },
    createPost(state, action: PayloadAction<PostInterface>) {
      const post = action.payload;

      post.creator.profilePicture = post.creator.profilePicture || DefaultImg;
      state.posts.unshift(post);
    },
    removePost(state, action: PayloadAction<{ _id: string }>) {
      const postId = action.payload._id;
      const post = state.posts.find((post) => post._id === postId);
      if (post) {
        state.posts = state.posts.filter((post) => post._id !== postId);
      }
    },
    changeProfilePicture(
      state,
      action: PayloadAction<{ profilePicture: string }>
    ) {
      const profilePicture = action.payload.profilePicture;
      const posts = state.posts.map((post) => {
        return {
          ...post,
          creator: {
            ...post.creator,
            profilePicture: profilePicture || DefaultImg,
          },
        };
      });
      state.posts = posts;
    },
    cleanFeed(state) {
      state.posts = [];
    },
  },
});

export const feedActions = feedSlice.actions;
export default feedSlice.reducer;
