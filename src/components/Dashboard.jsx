import { DataContext } from "../Helpers/DataProvider";
import { doUploadPost } from "../Helpers/Mongo";
import { useNavigate } from "react-router";
import { doc, increment, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../../firebase";
import { useState, useContext } from "react";
import { async } from "@firebase/util";

export default function Dashboard() {
  const { data, isLoadingData } = useContext(DataContext);
  const [error, setError] = useState();
  const [postContent, setPostContent] = useState(""); //state to hold post
  // const [currentUserWhoPosted, setCurrentUserWhoPosted] = useState("");
  const navigate = useNavigate();

  const { logout, currentUser } = useAuth();

  async function handleIncrement() {
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      { counter: increment(1), timestamp: serverTimestamp() },
      { merge: true }
    );
  }

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (!postContent.trim()) {
        throw new Error("Post content cannot be empty.");
      }

      await doUploadPost({ post: postContent, userWhoPosted: currentUser.uid }); // Pass an object with the 'post' property
      setPostContent(""); // Clear textarea content after successful submission
      // console.log(currentUser.uid);
    } catch (error) {
      console.error("Error uploading post:", error);
      setError(error.message);
    }
  }

  return (
    <div>
      <p>welcome to the dashboard</p>
      <p>{isLoadingData ? "loading..." : "loaded!"}</p>
      <p>{data ? "I got it!" : "I don't got it"}</p>
      {data.map((data) => {
        return (
          <p key={data._id}>
            {data.post} by: {data.userId}
          </p>
        );
      })}
      <form onSubmit={handleSubmit} action="">
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button type="sumbit">Post</button>
      </form>
      <button onClick={handleIncrement}>Increment database</button>
      <button onClick={handleLogout} type="link">
        Logout
      </button>
    </div>
  );
}
