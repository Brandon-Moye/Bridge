import React from "react";
import { Button, Modal, Box } from "@mui/material";
import "./Gratitudes.css";
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
      <div>{item.post}</div>
      <div>{item.name}</div>
      <div>
        {formattedDate} {formattedTime}
      </div>
      <Button onClick={hanldeOpenEditModalClick}>Edit</Button>
      <Button onClick={handleDeleteClick} className="deleteDiscardButton">
        Delete
      </Button>
    </div>
  );
}
