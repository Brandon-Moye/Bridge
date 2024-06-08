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

    try {
      setLoading(true);

      if (!validateEmailIsAnEmail(emailRef.current.value)) {
        throw new Error("invalid-email-format");
      }

      if (
        !validatePasswordsMatch(
          passwordRef.current.value,
          passwordConfirmRef.current.value
        )
      ) {
        throw new Error("passwords-do-not-match");
      }

      if (
        !validatePasswordRequirements(
          passwordRef.current.value,
          setError,
          setOpenSnackbar
        )
      ) {
        throw new Error("password-requirements-not-met");
      }

      /*need to add code to check MDB for an account, don't like the idea of creating a temp account in Firebase*/

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
      switch (error.message) {
        case "invalid-email-format":
          setError("Please enter a valid email address");
          break;
        case "passwords-do-not-match":
          setError("Passwords do not match");
          break;
        case "password-requirements-not-met":
          setError("Password not complex enough");
      }
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  }

  function validateEmailIsAnEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(String(email).toLowerCase());
  }

  function validatePasswordsMatch(password, confirmPassword) {
    if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  }

  /*make sure the password is to my liking, need to add more rules */
  function validatePasswordRequirements(password) {
    const containsUpperCaseLetter = /[A-Z]/.test(password);

    if (!containsUpperCaseLetter) {
      return false;
    } else {
      return true;
    }
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
