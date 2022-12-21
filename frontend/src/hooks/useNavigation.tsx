import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { pageActions } from "../store/slices/page-slice";

const useNavigation = () => {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.user._id);
  const dispatch = useAppDispatch();

  const homePageHandler = () => {
    navigate("/home");
    dispatch(pageActions.refreshHome());
  };

  const profilePageHandler = () => {
    navigate("/person/" + userId);
    dispatch(pageActions.refreshProfile());
  };

  const peoplePageHandler = () => {
    navigate("/people");
    dispatch(pageActions.refreshPeople());
  };

  const jobsPageHandler = () => {
    navigate("/jobs");
    dispatch(pageActions.refreshJobs());
  };
  return {
    homePageHandler,
    profilePageHandler,
    peoplePageHandler,
    jobsPageHandler,
  };
};

export default useNavigation;
