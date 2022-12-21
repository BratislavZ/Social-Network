import React, { useEffect, Suspense } from "react";
import { Navigate, Route } from "react-router";
import { Routes } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./store/hooks/hooks";
import { getCookie } from "./helpers/Cookie";
import { userActions } from "./store/slices/user-slice";

import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import People from "./pages/People/People";
import Jobs from "./pages/Jobs/Jobs";
import Profile from "./pages/Profile/Profile";
import "./App.css";

const Login = React.lazy(() => import("./pages/Login/Login"));
const Register = React.lazy(() => import("./pages/Register/Register"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userCookie = getCookie("userLogged");
    if (userCookie) {
      const user = JSON.parse(userCookie);
      dispatch(userActions.loadUser(user));
    }
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="spinner">
          <LoadingSpinner />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate replace to="/home" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate replace to="/home" /> : <Register />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/people"
          element={isLoggedIn ? <People /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/jobs"
          element={isLoggedIn ? <Jobs /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/person/:personId"
          element={isLoggedIn ? <Profile /> : <Navigate replace to="/login" />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
