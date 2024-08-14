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
import {
  GreenButton,
  RedButton,
  YellowButton,
  NavButton,
  CustomBox,
} from "./MuiCustom";
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
    top: "25%",
    left: "22.5%",
    transform: "translate(-50%, -50%)",
    width: "20rem",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
      <nav className="navigation">
        <NavButton component={Link} to="/blog" size="small">
          Blog
        </NavButton>
        <NavButton component={Link} to="/profile" size="small">
          Profile
        </NavButton>
        <NavButton onClick={handleLogout} type="link" size="small">
          Logout
        </NavButton>
      </nav>
      <div className="mainPageContainer">
{/*        <img src="../img/architecture.svg" className="diagram"/> */}
        <div className="dashboardContainer">
          <p className="welcome">Track your gratitudes below</p>
          <GreenButton
            onClick={openPostModal}
            variant="contained"
            size="small"
            className="newButton"
          >
            New
          </GreenButton>
          <Modal
            open={postModalVisible}
            onClose={(event, reason) => {
              if (reason !== "backdropClick") {
                closePostModal();
              }
            }}
          >
            <CustomBox>
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                name=""
                id=""
                cols="30"
                rows="10"
                className="postTextArea"
              ></textarea>
              <GreenButton
                onClick={handleSubmit}
                variant="contained"
                size="small"
              >
                Post
              </GreenButton>
              <YellowButton
                onClick={closePostModal}
                variant="contained"
                size="small"
              >
                Discard
              </YellowButton>
            </CustomBox>
          </Modal>
          <Modal
            open={editModalVisible}
            onClose={(event, reason) => {
              if (reason !== "backdropClick") {
                closePostModal();
              }
            }}
          >
            <CustomBox>
              <textarea
                value={editPostText}
                onChange={(e) => setEditPostText(e.target.value)}
                name=""
                id=""
                cols="30"
                rows="10"
                className="postTextArea"
              ></textarea>
              <GreenButton onClick={handleUserUpdatePost} size="small">
                Update
              </GreenButton>
              <YellowButton
                onClick={closeEditModal}
                variant="contained"
                size="small"
              >
                Discard
              </YellowButton>
            </CustomBox>
          </Modal>

          <p>{isLoadingData ? "loading..." : ""}</p>
          {/* <p>{data ? "I got it!" : "I don't got it"}</p> */}
          <div className="gratitudeComponentContainer">{gratitudesFeed}</div>
        </div>
      </div>
    </div>
  );
}
