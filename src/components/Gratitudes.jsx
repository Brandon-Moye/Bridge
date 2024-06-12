import React from "react";

export default function Gratitudes({ item, onEdit, onDelete }) {
  if (!item || !item.post) {
    return null;
  }

  const handleEditClick = () => {
    onEdit(item._id.toString());
  };

  const handleDeleteClick = () => {
    onDelete(item._id.toString());
  };
  // console.log(props.item);
  return (
    <div className="gratitudesWrapper">
      <div className="postTextContent">{item.post}</div>
      <div className="postUsername">{item.userId}</div>
      <button className="postEditButton" onClick={handleEditClick}>Edit</button>
      <button className="postDeleteButton" onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}
