import { useAppSelector } from "../../store/hooks/hooks";
import useLoginForm from "../../hooks/useLoginForm";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const isLoggingIn = useAppSelector((state) => state.ui.login.isFetching);

  const {
    email,
    password,
    error,
    inputHandler,
    submitHandler,
    registerHandler,
  } = useLoginForm();

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <div className={styles.inputs}>
        <div className={styles["input-container"]}>
          <label>Email</label>
          <input
            placeholder="Email"
            name="email"
            value={email}
            onChange={inputHandler}
          />
        </div>

        <div className={styles["input-container"]}>
          <label>Password</label>
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={inputHandler}
          />
        </div>
      </div>
      {isLoggingIn && (
        <div className={styles.spinner}>
          <LoadingSpinner size="small" />
        </div>
      )}
      {!isLoggingIn && <button className={styles["login-btn"]}>Log In</button>}
      {error && <span className={styles.error}>{error}</span>}
      <div className={styles["register-container"]}>
        <span className={styles.question}>Don't have an account?</span>
        <span className={styles.register} onClick={registerHandler}>
          Register here.
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
