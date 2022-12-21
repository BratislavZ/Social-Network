import { createSlice } from "@reduxjs/toolkit";

type Page = {
  home: boolean;
  profile: boolean;
  people: boolean;
  jobs: boolean;
};

const initialState: Page = {
  home: false,
  profile: false,
  people: false,
  jobs: false,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    refreshHome(state) {
      state.home = !state.home;
    },
    refreshProfile(state) {
      state.profile = !state.profile;
    },
    refreshPeople(state) {
      state.people = !state.people;
    },
    refreshJobs(state) {
      state.jobs = !state.jobs;
    },
  },
});

export const pageActions = pageSlice.actions;
export default pageSlice.reducer;
