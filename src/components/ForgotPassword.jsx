import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { BlueButton } from "./MuiCustom";

import "./ForgotPassword.css";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth(); /*Firebase function */
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); /*prevent from refreshing */

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError(
        "Failed to reset password, the account you submitted is not in our records"
      );
    }
    setLoading(false);
  }
  return (
    <div className="forgotPasswordWrapper">
      <form onSubmit={handleSubmit} className="forgotPasswordForm">
        <h3 className="welcomeTitle">Let's get you that new password</h3>
        <label className="emailLabel" htmlFor="">
          email
        </label>
        <input
          className="emailInput"
          placeholder="Email"
          ref={emailRef}
        ></input>
        <div className="SubmitButtonContainer resetButton">
          <BlueButton className="loginButton" type="submit" disabled={loading}>
            Submit
          </BlueButton>
        </div>

        <Link to="/login" className="loginLink link">
          Login
        </Link>
        <Link to="/signup" className="signupLink link">
          Signup
        </Link>
        <Link className="blogLink link" to="/blog">
          Check out the Blog
        </Link>
      </form>
    </div>
  );
}
