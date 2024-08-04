import React from "react";
import { Button, Modal, Box } from "@mui/material";
import "./Gratitudes.css";
import { RedButton, BlueButton, YellowButton } from "./MuiCustom";

export default function Gratitudes({
  item,
  onEdit,
  onDelete,
  onOpenEditModal,
}) {
  if (!item || !item.post) {
    return null;
  }

  const hanldeOpenEditModalClick = () => {
    onEdit(item._id.toString());
    onOpenEditModal();
  };

  const handleEditClick = () => {
    onEdit(item._id.toString());
  };

  const handleDeleteClick = () => {
    onDelete(item._id.toString());
  };
  const date = new Date(item.timestamp);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: "true",
  });
  return (
    <div className="gratitudesWrapper">
      <div className="postContent">{item.post}</div>
      <div className="userName">{item.name}</div>
      <div className="postTime">
        {formattedDate} {formattedTime}
      </div>
      <BlueButton
        onClick={hanldeOpenEditModalClick}
        variant="contained"
        size="small"
      >
        Edit
      </BlueButton>
      <RedButton
        onClick={handleDeleteClick}
        className="deleteDiscardButton"
        variant="contained"
        size="small"
      >
        Delete
      </RedButton>
    </div>
  );
}
