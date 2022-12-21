import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../helpers/Cookie";

const isUserLoggedIn = () => {
  const userCookie = getCookie("userLogged");
  if (userCookie) {
    return true;
  }
  return false;
};

interface AuthInterface {
  isLoggedIn: boolean;
}

const initialState: AuthInterface = {
  isLoggedIn: isUserLoggedIn(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
