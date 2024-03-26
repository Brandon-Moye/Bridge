import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  // create a useAuth hook to access the context throughout our app
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // create the auth wrapper component for our application
  // could optionally define a userData state and add to context
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function userUpdateEmail(email) {
    return updatePassword(auth.currentUser, password)
  }

  function userUpdatePassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // This is where you could fetch generic user data from firebase
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    logout,
    login,
    resetPassword,
    userUpdateEmail,
    userUpdatePassowrd,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
