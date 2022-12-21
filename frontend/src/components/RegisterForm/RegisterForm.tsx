import { useAppSelector } from "../../store/hooks/hooks";
import useRegisterForm from "../../hooks/useRegisterForm";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
  const isRegistering = useAppSelector((state) => state.ui.register.isFetching);
  const {
    username,
    email,
    password,
    error,
    successMsg,
    inputHandler,
    loginHandler,
    submitHandler,
  } = useRegisterForm();

  const styleMessage = error ? `${styles.error}` : `${styles.success}`;

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
          <label>Username</label>
          <input
            placeholder="Username"
            name="username"
            value={username}
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

      {isRegistering && (
        <div className={styles.spinner}>
          <LoadingSpinner size="small" />
        </div>
      )}
      {!isRegistering && (
        <button className={styles["register-btn"]}>Register</button>
      )}

      {(error || successMsg) && (
        <span className={styleMessage}>{error || successMsg}</span>
      )}
      <div className={styles["login-container"]}>
        <span className={styles.question}>Already have an account?</span>
        <span className={styles.login} onClick={loginHandler}>
          Login here.
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
