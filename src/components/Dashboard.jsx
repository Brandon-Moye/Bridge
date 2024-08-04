import { DataContext } from "../Helpers/DataProvider";
import {
  doUploadPost,
  doUserDeletesPost,
  doUserEditsPost,
} from "../Helpers/Mongo";
import Gratitudes from "./Gratitudes";
import { useNavigate } from "react-router";
import { doc, increment, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../../firebase";
import { useState, useContext } from "react";
import { async } from "@firebase/util";
import { Link } from "react-router-dom";
import { Button, Modal, Box, styled } from "@mui/material";
import { GreenButton } from "./MuiCustom";
import "./Dashboard.css";

export default function Dashboard() {
  const { data, isLoadingData, justYourData, handleSubmitTrigger } =
    useContext(DataContext);
  const [error, setError] = useState();
  const [postContent, setPostContent] = useState(""); //state to hold post
  const [editPostContent, setEditPostContent] = useState(""); //state to hold edit text
  const [editPostText, setEditPostText] = useState("");
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const navigate = useNavigate();

  const { logout, currentUser } = useAuth();

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
      const datePostedRaw = new Date();
      const datePostedFormatted = datePostedRaw.toISOString();
      await doUploadPost({
        post: postContent,
        userWhoPosted: currentUser.uid,
        postTimestamp: datePostedFormatted,
      }); // Pass an object with the 'post' property
      setPostContent(""); // Clear textarea content after successful submission
      handleSubmitTrigger(); // trigger useEffect in DataProvider
      closePostModal();
    } catch (error) {
      console.error("Error uploading post to site:", error);
      setError(error.message);
    }
  }

  async function handleUserUpdatePost(event) {
    event.preventDefault();
    const updatersId = editPostContent._id.toString();
    try {
      await doUserEditsPost({
        postId: updatersId,
        newPostContent: editPostText,
      });
      setEditPostText("");
      handleSubmitTrigger(); // trigger useEffect in DataProvider
      closeEditModal();
    } catch (error) {
      console.log(error);
    }
  }

  async function loadUsersPostToEditField(postId) {
    const findPostToEdit = justYourData.find(
      (item) => item._id.toString() === postId
    );
    setEditPostContent(findPostToEdit);
    setEditPostText(findPostToEdit.post);
  }

  async function deleteUsersPost(postId) {
    try {
      await doUserDeletesPost(postId);
      handleSubmitTrigger(); // trigger useEffect in DataProvider
    } catch (error) {
      console.log(error);
    }
  }

  const closePostModal = () => {
    setPostContent("");
    return setPostModalVisible(false);
  };

  const openPostModal = () => {
    return setPostModalVisible(true);
  };
  const closeEditModal = () => {
    return setEditModalVisible(false);
  };

  const openEditModal = () => {
    return setEditModalVisible(true);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // const GreenButton = styled(Button)(({ theme }) => ({
  //   backgroundColor: "#48a684",
  //   color: "#fff",
  // }));

  const gratitudesFeed = justYourData.map((item) => {
    return (
      <Gratitudes
        key={item._id}
        item={item}
        onEdit={loadUsersPostToEditField}
        onDelete={deleteUsersPost}
        onOpenEditModal={openEditModal}
      />
    );
  });
  return (
    <div>
      <p className="welcome">welcome to the dashboard</p>
      <div className="blogLinkWrapper">
        <Link className="blogLink" to="/blog">
          Check out the Blog
        </Link>
      </div>
      <GreenButton
        onClick={openPostModal}
        // className="postGratitudeButton"
        variant="contained"
        color="inherit"
      >
        Gratitude
      </GreenButton>
      <Modal
        open={postModalVisible}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            closePostModal();
          }
        }}
      >
        <Box sx={style}>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <Button onClick={handleSubmit}>Post Gratitude</Button>
          <Button onClick={closePostModal} className="deleteDiscardButton">
            Discard
          </Button>
        </Box>
      </Modal>
      <Modal
        open={editModalVisible}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            closePostModal();
          }
        }}
      >
        <Box sx={style}>
          <textarea
            value={editPostText}
            onChange={(e) => setEditPostText(e.target.value)}
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <Button onClick={handleUserUpdatePost}>Update</Button>
          <Button onClick={closeEditModal} className="deleteDiscardButton">
            Discard
          </Button>
        </Box>
      </Modal>
      <Button onClick={handleLogout} type="link">
        Logout
      </Button>
      <Link to="/profile">Profile</Link>
      <p>{isLoadingData ? "loading..." : "loaded!"}</p>
      <p>{data ? "I got it!" : "I don't got it"}</p>
      {gratitudesFeed}
    </div>
  );
}
