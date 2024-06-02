import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { doLoginRealm, doStoreUserProfileData } from "../Helpers/Mongo";

import { Alert, AlertTitle, Snackbar } from "@mui/material";

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
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      const userCredentials = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      /**
       Start code for signup store after the firebase function
       */

      await doLoginRealm();

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
    }
    setLoading(false);
  }

  const handleCloseSnackbar = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  return (
    <div className="loginPageWrapper">
      {/* {error && ( */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="warning">
          <AlertTitle>Email Exists</AlertTitle>
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
