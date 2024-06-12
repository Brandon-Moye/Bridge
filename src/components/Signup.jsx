import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  doLoginRealm,
  doCheckIfEmailExists,
  doStoreUserProfileData,
} from "../Helpers/Mongo";

import { Alert, AlertTitle, Snackbar } from "@mui/material";
import "./Signup.css";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth(); /*from Firebase functions */
  const navigate = useNavigate(); /*react-router-dom function */

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorsForPasswordCriteriaNotMet, setErrorsForPasswordCriteriaNotMet] =
    useState("");

  async function handleSubmit(e) {
    e.preventDefault(); /*preventing from refreshing */
    setOpenSnackbar(false); /*reset the snackbar if resubmitting */
    setError("");

    try {
      await doLoginRealm(); /*get access to realm data needed to run doStoreUserProfileData */
      setLoading(true);

      if (await doCheckIfEmailExists(emailRef.current.value)) {
        throw new Error("email-already-exists");
      }

      if (!validateEmailIsAnEmail(emailRef.current.value)) {
        throw new Error("invalid-email-format");
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

      if (
        !validatePasswordsMatch(
          passwordRef.current.value,
          passwordConfirmRef.current.value
        )
      ) {
        throw new Error("passwords-do-not-match");
      }

      const userCredentials = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );

      await doStoreUserProfileData({
        userWhoSignedUp: userCredentials.user.uid,
        email: emailRef.current.value,
      });
      navigate("/");
    } catch (error) {
      switch (error.message) {
        case "email-already-exists":
          setError("Email already in use");
          break;
        case "invalid-email-format":
          setError("Please enter a valid email address");
          break;
        case "password-requirements-not-met":
          setError("Password does not meet complexity requirements");
          break;
        case "passwords-do-not-match":
          setError("Passwords do not match");
          break;
      }
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  }

  function validateEmailIsAnEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email.toLowerCase());
  }

  function validatePasswordsMatch(password, confirmPassword) {
    return password === confirmPassword;
  }

  function validatePasswordRequirements(password) {
    const minLength = 12;
    const criteria = [
      { regex: /[A-Z]/, passwordError: "one uppercase letter" },
      { regex: /[a-z]/, passwordError: "one lowercase letter" },
      { regex: /\d/, passwordError: "one number" },
      {
        regex: /[!@#$%^&*(),.?":{}|<>]/,
        passwordError: "one special character",
      },
      { regex: /.{12}/, passwordError: `at least ${minLength} characters` },
    ];

    const criteriaNotMet = criteria.filter(
      (criteria) => !criteria.regex.test(password)
    );

    if (criteriaNotMet.length > 0) {
      const errorsForCriteriaNotMet = criteriaNotMet
        .map((criteria) => criteria.passwordError)
        .join(", ");
      setErrorsForPasswordCriteriaNotMet(errorsForCriteriaNotMet);
      return false;
    } else return true;
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
          Email
        </label>
        <input
          className="emailInput"
          placeholder="Email"
          ref={emailRef}
        ></input>
        <label className="passwordLabel" htmlFor="">
          Password
        </label>
        <input
          className="passwordInput"
          placeholder="Password"
          type="password"
          ref={passwordRef}
        ></input>
        <label className="passwordConfirmLabel" htmlFor="">
          Confirm Password
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
        <Link className="blogLink" to="/blog">
          Check out the Blog
        </Link>
      </form>
    </div>
  );
}
