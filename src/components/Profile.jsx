import React, { useContext } from "react";
import { DataContext } from "../Helpers/DataProvider";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Button, Modal, Box } from "@mui/material";
import "./Profile.css";

export default function Profile() {
  const { userProfileData } = useContext(DataContext);
  return (
    <div>
      <div>Name: {userProfileData.name}</div>
      <div>Email: {userProfileData.email}</div>
      <Link to="/">Home</Link>
      <Button className="test">Test</Button>
    </div>
  );
}
