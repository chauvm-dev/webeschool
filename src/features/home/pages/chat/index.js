import React, { useEffect, useState } from "react";
import classes from "./index.module.css";

import ChatNav from "../../components/nav/index";

import Modal from "../../../../UI/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  emitMessage,
  loadDetail,
  signout,
  socketConnect,
} from "../../../../store/actions";
import ChatList from "../../components/ChatList";
import Assets from "/media/troutrous/Work/Reactjs/ESchool/src/assets/index.js";
import { io } from "socket.io-client";
import Conversation from "../../components/conversation";
import CreateRoomModal from "../../components/CreateRoomModal";
import EditRoomModal from "../../components/EditRoomModal";

const Chat = () => {
  //init
  const dispatch = useDispatch();
  //state

  const [settingsPopup, setSettingsPopup] = useState(false);
  const [showConverInfo, setShowConverInfo] = useState(false);
  const [createModalShow, setCreateModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  const [roomActivity, setRoomActivity] = useState(null);

  const conversations = useSelector(
    (state) => state.conversation.conversations
  );

  //redux state
  const userProfileState = useSelector((state) => state.user.profile);

  //handle

  useEffect(() => {
    dispatch(socketConnect());
  }, [dispatch]);

  const handleLogout = () => {
    try {
      const user = window.gapi.auth2.getAuthInstance().currentUser.get();
      if (user) {
        window.gapi.auth2.getAuthInstance().signOut();
      }
      window.FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
          window.FB.logout(function (response) {
            console.log(response);
          });
        }
      }, true);
      dispatch(signout());
    } catch (error) {
      console.log(error);
    }
  };

  const [messageInput, setMessageInput] = useState("");

  const [filesUpload, setFilesUpload] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null);

  const [filesUploadEditRoom, setFilesUploadEditRoom] = useState(null);
  const [selectedFilesEditRoom, setSelectedFilesEditRoom] = useState(null);

  const handleImageChange = (e) => {
    // console.log(e.target.files[])
    if (e.target.files) {
      const filesObject = URL.createObjectURL(e.target.files[0]);

      setFilesUpload(e.target.files[0]);

      // console.log("filesArray: ", filesArray);

      setSelectedFiles(filesObject);
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const handleImageChangeEditRoom = (e) => {
    if (e.target.files) {
      const filesObject = URL.createObjectURL(e.target.files[0]);

      setFilesUploadEditRoom(e.target.files[0]);

      // console.log("filesArray: ", filesArray);

      setSelectedFilesEditRoom(filesObject);
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const handleEmitMessage = (e) => {
    e.preventDefault();
    console.log(roomActivity);
    dispatch(emitMessage(roomActivity, messageInput));
  };

  const handleRoomChange = (id) => {
    setRoomActivity(id);
    dispatch(loadDetail(id));
  };
  return (
    <div className={classes.chat_container}>
      <ChatNav
        settingsPopup={settingsPopup}
        setSettingsPopup={setSettingsPopup}
        handleLogout={handleLogout}
        userAvatar={userProfileState?._avatar}
        showCreateRoomModal={() => setCreateModalShow(true)}
      />
      <ChatList
        roomActivity={roomActivity}
        handleRoomChange={handleRoomChange}
      />
      <Conversation
        conversationActivity={conversations.find(
          (conversation) => conversation._id === roomActivity
        )}
        showConverInfo={showConverInfo}
        setShowConverInfo={setShowConverInfo}
        showEditRoomModal={() => setEditModalShow(true)}
        handleEmitMessage={handleEmitMessage}
        messageInput={messageInput}
        handleMessageInputChange={(e) => setMessageInput(e.target.value)}
      />
      {editModalShow && (
        <EditRoomModal
          show={editModalShow}
          onHide={() => setEditModalShow(false)}
          handleImageChange={handleImageChangeEditRoom}
          selectedFiles={selectedFilesEditRoom}
        />
      )}
      {createModalShow && (
        <CreateRoomModal
          show={createModalShow}
          onHide={() => setCreateModalShow(false)}
          handleImageChange={handleImageChange}
          selectedFiles={selectedFiles}
        />
      )}
    </div>
  );
};

export default Chat;
