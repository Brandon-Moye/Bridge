import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    <form
      onSubmit={handleSubmit}
      className="loginForm grid grid-cols-2 grid-rows-7"
    >
      <h3 className="col-span-2">Welcome</h3>
      <label className="col-span-2" htmlFor="">
        email
      </label>
      <input
        className="emailInput col-span-2"
        placeholder="Email"
        value={userCreds.email}
        onChange={(e) => {
          updateEmail(e);
        }}
      ></input>
      <label className="col-span-2" htmlFor="">
        password
      </label>
      <input
        className="col-span-2"
        placeholder="Password"
        type="password"
        value={userCreds.password}
        onChange={(e) => {
          updatePassword(e);
        }}
      ></input>
      <button className="col-span-2" type="submit">
        Login
      </button>
      <Link to="/blog">blooog</Link>
    </form>
  );
}
