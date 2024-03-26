import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [userCreds, setUserCreds] = useState({ email: "", password: "" });
  const { signup, login } = useAuth();
  const navigate = useNavigate();

  function updateEmail(e) {
    setUserCreds({ ...userCreds, email: e.target.value });
  }

  function updatePassword(e) {
    setUserCreds({ ...userCreds, password: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // prevents signup if form not completed
    if (!userCreds.email || !userCreds.password) {
      return;
    }

    try {
      setError("");
      setLoading(true);
      await login(userCreds.email, userCreds.password);
      navigate("/");
    } catch {
      setError("Failed to sign in, please check your email or password");
    }
    setLoading(false);
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
          value={userCreds.email}
          onChange={(e) => {
            updateEmail(e);
          }}
        ></input>
        <label className="passwordLabel" htmlFor="">
          password
        </label>
        <input
          className="passwordInput"
          placeholder="Password"
          type="password"
          value={userCreds.password}
          onChange={(e) => {
            updatePassword(e);
          }}
        ></input>

        <button className="loginButton" type="submit">
          Login
        </button>
        <Link className="signupLink" to="/signup">Signup</Link>
        <Link className="forgotPasswordLink">Forgot Password?</Link>
      </form>
      <div className="blogLinkWrapper">
        <Link className="blogLink" to="/blog">
          Check out the Blog
        </Link>
      </div>
    </div>
  );
}
