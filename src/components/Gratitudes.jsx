import React from "react";

export default function Gratitudes({ item, onEdit }) {
  if (!item || !item.post) {
    return null;
  }

  const handleEditClick = () => {
    onEdit(item._id.toString());
  };
  // console.log(props.item);
  return (
    <div className="gratitudesWrapper">
      <div>{item.post}</div>
      <div>{item.userId}</div>
      <button onClick={handleEditClick}>Edit</button>
      <button>Delete</button>
    </div>
  );
}
