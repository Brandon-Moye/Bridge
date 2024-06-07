import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { doLoginRealm, doStoreUserProfileData } from "../Helpers/Mongo";

import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { async } from "@firebase/util";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth(); /*from Firebase functions */
  const navigate = useNavigate(); /*react-router-dom function */

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); /*preventing from refreshing */
    setOpenSnackbar(false); /*reset the snackbar if resubmitting */
    setError("");

    if (!validateEmailIsAnEmail(emailRef.current.valu)) {
      return;
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setOpenSnackbar(true);
      setError("Passwords do not match");
      return;
    }

    if (
      !validatePasswordRequirements(
        passwordRef.current.value,
        setError,
        setOpenSnackbar
      )
    ) {
      return;
    }

    try {
      // setError("");
      setLoading(true);
      const userCredentials = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );

      await doLoginRealm(); /*get access to realm data needed to run doStoreUserProfileData */

      await doStoreUserProfileData({
        userWhoSignedUp: userCredentials.user.uid,
        email: emailRef.current.value,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        setError("Sorry, this email is already used");
      } else {
        setError("hmmm, something else went wrong, try again");
      }
      setOpenSnackbar(true);
      // setError("Failed to create an account, veryify passwords match");
    } finally {
      setLoading(false);
    }
  }
  /*checks if the email field is blank, if there are characters it makes sure it matches convential email syntax */
  function validateEmailIsAnEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isItAnEmail = regex.test(String(email).toLowerCase());
    if (email === "") {
      setOpenSnackbar(true);
      setError("Please enter an email");
      return false;
    } else if (!isItAnEmail) {
      setOpenSnackbar(true);
      setError("Please enter a valid email");
      return false;
    } else {
      setError("");
      return true;
    }
  }

  /*make sure the password is to my liking */
  function validatePasswordRequirements(password, setError, setLoading) {
    const containsUpperCaseLetter = /[A-Z]/.test(password);
    console.log(containsUpperCaseLetter);

    if (!containsUpperCaseLetter) {
      setError("Password must contain at least one uppercase letter");
      setLoading(true);
      return false;
    }
    return true;
  }

  const handleCloseSnackbar = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  return (
    <div className="loginPageWrapper">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="warning">
          <AlertTitle>Signup Error</AlertTitle>
          {error}
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit} className="signupForm">
        <h3 className="welcomeTitle">Signup to Join!</h3>
        <label className="emailLabel" htmlFor="">
          email
        </label>
        <input
          className="emailInput"
          placeholder="Email"
          ref={emailRef}
        ></input>
        <label className="passwordLabel" htmlFor="">
          password
        </label>
        <input
          className="passwordInput"
          placeholder="Password"
          type="password"
          ref={passwordRef}
        ></input>
        <label className="passwordConfirmLabel" htmlFor="">
          password
        </label>
        <input
          className="passwordConfirmInput"
          placeholder=" Confirm Password"
          type="password"
          ref={passwordConfirmRef}
        ></input>

        <button disabled={loading} className="signupButton" type="submit">
          Signup
        </button>
        <Link className="loginLink" to="/login">
          Login
        </Link>
        <Link className="forgotPasswordLink" to="/forgotPassword">
          Forgot Password?
        </Link>
      </form>
      <div className="blogLinkWrapper">
        <Link className="blogLink" to="/blog">
          Check out the Blog
        </Link>
      </div>
    </div>
  );
}
