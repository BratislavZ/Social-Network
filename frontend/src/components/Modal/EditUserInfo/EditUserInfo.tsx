import useEditUserInfoModal from "../../../hooks/useEditUserInfoModal";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Modal from "../Modal";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import styles from "./EditUserInfo.module.css";

const EditUserInfo = () => {
  const {
    username,
    city,
    from,
    gender,
    error,
    successMsg,
    isSending,
    inputHandler,
    selectHandler,
    submitHandler,
    closeHandler,
  } = useEditUserInfoModal();

  const styleMessage = error ? `${styles.error}` : `${styles.success}`;

  return (
    <Modal onClose={closeHandler}>
      <form onSubmit={submitHandler} className={styles.form}>
        <CloseIcon
          fontSize="large"
          className={styles["close-icon"]}
          onClick={closeHandler}
        />
        <div className={styles.title}>User information</div>
        <div className={styles.inputs}>
          <TextField
            name="username"
            label="Username"
            variant="standard"
            value={username}
            onChange={inputHandler}
          />
          <TextField
            name="city"
            label="City"
            variant="standard"
            value={city}
            onChange={inputHandler}
          />
          <TextField
            name="from"
            label="From"
            variant="standard"
            value={from}
            onChange={inputHandler}
          />
          <FormControl fullWidth variant="standard">
            <InputLabel id="select-label-gender">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label="Gender"
              onChange={selectHandler}
              className={styles.select}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={styles.buttons}>
          {isSending && (
            <div className={styles.spinner}>
              <LoadingSpinner size="small" />
            </div>
          )}
          {!isSending && (
            <Button variant="contained" type="submit">
              Save
            </Button>
          )}
          <Button variant="outlined" type="button" onClick={closeHandler}>
            Cancel
          </Button>
        </div>
        {(error || successMsg) && (
          <span className={styleMessage}>{error || successMsg}</span>
        )}
      </form>
    </Modal>
  );
};

export default EditUserInfo;
