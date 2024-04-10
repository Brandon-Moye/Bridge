import React from "react";

export default function Gratitudes({ item }) {
  if (!item || !item.post) {
    return null;
  }
  // console.log(props.item);
  return (
    <div className="gratitudesWrapper">
      <div>{item.post}</div>
      <div>{item.userId}</div>
      <button>Edit</button>
    </div>
  );
}
