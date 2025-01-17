import React, { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DataContext } from "../Helpers/DataProvider";

import { doLoginRealm, doCheckIfEmailExists } from "../Helpers/Mongo";
import "./Login.css";
/**
 * need to figure out why it looks like Google might be catching the error before me on signup
 */
import { Alert, AlertTitle, Snackbar } from "@mui/material";
export default function Login() {
  const { handleSubmitTrigger } = useContext(DataContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    try {
      await doLoginRealm(); /*get access to realm data needed to run doStoreUserProfileData */
      setLoading(true);

      const emailExists = await doCheckIfEmailExists(emailRef.current.value);
      if (!emailExists) {
        throw new Error("user-not-found");
      }

      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
      handleSubmitTrigger();
    } catch (error) {
      switch (error.message) {
        case "user-not-found":
          setError("User Not Found");
          break;
        // case "auth/user-not-found":
        //   setError("User not found");
        //   break;
        // case "auth/invalid-email":
        //   setError("Not a valid email");
        //   break;
        // case "auth/missing-password":
        //   setError("Please enter your password");
        //   break;
        // case "auth/wrong-password":
        //   setError("Incorrect Password");
        //   break;
        default:
          setError("Incorrect Password");
      }
      setOpenSnackbar(true);
      // setError("Failed to sign in, please check your email or password");
    }
    setLoading(false);
  }

  async function DemoLogin(e) {
    e.preventDefault();
    setError("");
  
    try {
      await doLoginRealm();
      await login("demo@mail.com", "123456aA$$$$");
      navigate("/");
      console.log("Demo login successful");
    } catch (error) {
      console.error("DemoLogin Error:", error);
      setError("Demo login failed.");
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
          <AlertTitle>Login Error</AlertTitle>
          {error}
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit} className="loginForm">
        <h3 className="welcomeTitle">Welcome!</h3>
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

        <button className="loginButton" type="submit" disabled={loading}>
          Login
        </button>
        <Link className="signupLink" to="/signup">
          Signup
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
        <button className="loginButtonForDemo" type="button" onClick={DemoLogin}>Login with Demo Credentials</button>
    </div>
  );
}
