import React, { useState } from "react";
import "./SignUpScreen.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { signUp } from "./global";
import { useNavigate } from "react-router-dom";

const SignUpScreen = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === "") {
      setUsernameValid(true);
      setErrorMessage("Fill out all fields");
    }
    if (password === "") {
      setPasswordValid(true);
      setErrorMessage("Fill out all fields");
    }

    if (password !== "" && username !== "") {
      setUsername("");
      setPassword("");

      const response = await signUp(username, password);
      if (response === "error") {
        setErrorMessage("Username has already been taken, choose another!");
      } else {
        setErrorMessage("");
        navigate("/");
      }
    }
  };
  return (
    <div className="signUpScreen">
      <h1 className="title">Sign Up</h1>

      <div className="errorMessageContainer">{errorMessage}</div>
      <form>
        <TextField
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            if (usernameValid) {
              setUsernameValid(false);
            }
          }}
          variant="filled"
          label="Username"
          focused
          sx={{ input: { color: "white" } }}
          InputLabelProps={{
            className: "textfield__label",
          }}
          error={usernameValid}
        />
        <TextField
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            if (passwordValid) {
              setPasswordValid(false);
            }
          }}
          variant="filled"
          label="Password"
          sx={{ input: { color: "white" } }}
          InputLabelProps={{
            className: "textfield__label",
          }}
          error={passwordValid}
        />
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          Sign Up
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="error"
          className="cancelButton"
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default SignUpScreen;
