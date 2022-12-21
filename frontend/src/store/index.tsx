import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth-slice";
import userReducer from "./slices/user-slice";
import feedReducer from "./slices/feed-slice";
import uiReducer from "./slices/ui-slice";
import postReducer from "./slices/post-slice";
import peopleReducer from "./slices/people-slice";
import profileReducer from "./slices/profile-slice";
import pageReducer from "./slices/page-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    feed: feedReducer,
    ui: uiReducer,
    post: postReducer,
    people: peopleReducer,
    profile: profileReducer,
    page: pageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
