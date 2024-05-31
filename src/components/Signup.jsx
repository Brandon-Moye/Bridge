import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { doStoreUserProfileData } from "../Helpers/Mongo";
import { updateCurrentUser } from "firebase/auth";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser } = useAuth();
  const { signup } = useAuth(); /*from Firebase functions */
  const navigate = useNavigate(); /*react-router-dom function */

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); /*preventing from refreshing */

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      /**
       Start code for signup store after the firebase function
       */
      await doStoreUserProfileData({
        // userWhoSignedUp: currentUser.uid,
        email: emailRef.current.value,
      });
      navigate("/");
    } catch {
      setError("Failed to create an account, veryify passwords match");
    }
    setLoading(false);
  }
  return (
    <div className="loginPageWrapper">
      <form onSubmit={handleSubmit} className="signupForm">
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
