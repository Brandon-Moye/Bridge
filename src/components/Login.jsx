import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doLoginRealm, doCheckIfEmailExists } from "../Helpers/Mongo";
import "./Login.css";
/**
 * need to figure out why it looks like Google might be catching the error before me on signup
 */
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    try {
      await doLoginRealm(); /*get access to realm data needed to run doStoreUserProfileData */
      setLoading(true);

      if (!doCheckIfEmailExists(emailRef.current.value)) {
        console.log("not exist");
        throw new Error("email-doesn't-exist");
      }

      if (!validateEmailIsAnEmail(emailRef.current.value)) {
        throw new Error("invalid-email-format");
      }

      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      switch (error.message) {
        case "email-doesn't-exist":
          setError("Email not registered");
          console.log(error);
          break;
      }
      // setError("Failed to sign in, please check your email or password");
    }
    setLoading(false);
  }

  function validateEmailIsAnEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email.toLowerCase());
  }

  return (
    <div className="loginPageWrapper">
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
    </div>
  );
}
