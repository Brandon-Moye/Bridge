import { DataContext } from "../Helpers/DataProvider";
import { doUploadPost, doUserEditsPost } from "../Helpers/Mongo";
import Gratitudes from "./Gratitudes";
import EditPost from "./EditPost";
import { useNavigate } from "react-router";
import { doc, increment, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../../firebase";
import { useState, useContext } from "react";
import { async } from "@firebase/util";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { data, isLoadingData, justYourData, handleSubmitTrigger } =
    useContext(DataContext);
  const [error, setError] = useState();
  const [postContent, setPostContent] = useState(""); //state to hold post
  const [editPostContent, setEditPostContent] = useState(""); //state to hold edit text
  // const [currentUserWhoPosted, setCurrentUserWhoPosted] = useState("");
  const navigate = useNavigate();

  const { logout, currentUser } = useAuth();
  // console.log(justYourData);
  async function handleIncrement() {
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      { counter: increment(1), timestamp: serverTimestamp() },
      { merge: true }
    );
  }
  // console.log(currentUser.uid);

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
      handleSubmitTrigger(); // trigger useEffect in DataProvider
      console.log(currentUser.uid);
    } catch (error) {
      console.error("Error uploading post:", error);
      setError(error.message);
    }
  }

  async function handleUserUpdatePost(postId) {
    // event.preventDefault();
    console.log(postId.toString());
    try {
      await doUserEditsPost(postId);
    } catch {}
  }

  async function loadUsersPostToEditField(postId) {
    console.log("in test");
  }

  const gratitudesFeed = justYourData.map((item) => {
    return (
      <Gratitudes
        key={item._id}
        item={item}
        onEdit={loadUsersPostToEditField}
      />
    );
  });

  return (
    <div>
      <p>welcome to the dashboard</p>
      <div className="blogLinkWrapper">
        <Link className="blogLink" to="/blog">
          Check out the Blog
        </Link>
      </div>
      <p>{isLoadingData ? "loading..." : "loaded!"}</p>
      <p>{data ? "I got it!" : "I don't got it"}</p>
      {/* {data.map((data) => {
        return (
          <p key={data._id}>
            {data.post} by: {data.userId}
          </p>
        );
      })} */}

      {/** this was the initial way of rendering conent on the page */}
      {/* {justYourData.map((justYourData) => {
        return (
          <p key={justYourData._id}>
            {justYourData.post}, Post id: {justYourData._id.toString()}
          </p>
        );
      })} */}

      {gratitudesFeed}
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
      <form onSubmit={handleUserUpdatePost} action="">
        <textarea
          value={editPostContent}
          onChange={(e) => setEditPostContent(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button type="sumbit">Edit</button>
      </form>
      <button onClick={handleIncrement}>Increment database</button>
      <button onClick={handleLogout} type="link">
        Logout
      </button>
    </div>
  );
}
