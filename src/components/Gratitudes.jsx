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
      <div>{item.userId}</div>
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}
