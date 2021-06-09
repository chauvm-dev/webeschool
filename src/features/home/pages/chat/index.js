import React, { useEffect, useState } from "react";
import classes from "./index.module.css";

import ChatNav from "../../components/nav/index";

import Modal from "../../../../UI/modal";
import { useDispatch, useSelector } from "react-redux";
import { signout, socketConnect } from "../../../../store/actions";
import ChatList from "../../components/ChatList";
import Assets from "/media/troutrous/Work/Reactjs/ESchool/src/assets/index.js";
import { io } from "socket.io-client";
import Conversation from "../../components/conversation";
import CreateRoomModal from "../../components/CreateRoomModal";
import EditRoomModal from "../../components/EditRoomModal";

const fake_list_room = [
  {
    _id: "123",
    name: "Class 01 Class 01 Class 01 Class 01 Class 01",
    avatar: "https://thispersondoesnotexist.com/image",
  },
  {
    _id: "234",
    name: "Class 02",
    avatar: "https://thispersondoesnotexist.com/image",
  },
  {
    _id: "345",
    name: "Class 03",
    avatar: "https://thispersondoesnotexist.com/image",
  },
  {
    _id: "456",
    name: "Class 01 Class 01 Class 01 Class 01 Class 01",
    avatar: "https://thispersondoesnotexist.com/image",
  },
  {
    _id: "567",
    name: "Class 02",
    avatar: "https://thispersondoesnotexist.com/image",
  },
  {
    _id: "789",
    name: "Class 03",
    avatar: "https://thispersondoesnotexist.com/image",
  },
  {
    _id: "987",
    name: "Class 01 Class 01 Class 01 Class 01 Class 01",
    avatar: "https://thispersondoesnotexist.com/image",
  },
  {
    _id: "876",
    name: "Class 02",
    avatar: "https://thispersondoesnotexist.com/image",
  },
  {
    _id: "654",
    name: "Class 03",
    avatar: "https://thispersondoesnotexist.com/image",
  },
  {
    _id: "543",
    name: "Class 01 Class 01 Class 01 Class 01 Class 01",
    avatar: "https://thispersondoesnotexist.com/image",
  },
  {
    _id: "432",
    name: "Class 02",
    avatar: "https://thispersondoesnotexist.com/image",
  },
  {
    _id: "321",
    name: "Class 03",
    avatar: "https://thispersondoesnotexist.com/image",
  },
];

const fake_list_messages = [
  {
    _id: "111",
    type: "text",
    content: "Day la noi dung cua tin nhan",
    user: {
      avatar:
        "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX2578170.jpg",
    },
  },
  {
    _id: "222",
    type: "text",
    content: `Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan`,
    user: {
      avatar:
        "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX2578170.jpg",
    },
  },
  {
    _id: "333",
    type: "text",
    content: "Day la noi dung cua tin nhan",
    user: {
      avatar:
        "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX2578170.jpg",
    },
  },
  {
    _id: "444",
    type: "text",
    content: `Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan`,
    user: {
      avatar:
        "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX2578170.jpg",
    },
  },
  {
    _id: "555",
    type: "text",
    content: "Day la noi dung cua tin nhan",
    user: {
      avatar:
        "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX2578170.jpg",
    },
  },
  {
    _id: "666",
    type: "text",
    content: `Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan`,
    user: {
      avatar:
        "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX2578170.jpg",
    },
  },
  {
    _id: "777",
    type: "text",
    content: `Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan`,
    user: {
      avatar:
        "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX2578170.jpg",
    },
  },
  {
    _id: "888",
    type: "text",
    content: `Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan`,
    user: {
      avatar:
        "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX2578170.jpg",
    },
  },
  {
    _id: "999",
    type: "text",
    content: `Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan`,
    user: {
      avatar:
        "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX2578170.jpg",
    },
  },
  {
    _id: "1010",
    type: "text",
    content: `Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan Day la noi dung cua tin nhan`,
    user: {
      avatar:
        "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX2578170.jpg",
    },
  },
];

const Chat = () => {
  //init
  const dispatch = useDispatch();
  //state

  const [settingsPopup, setSettingsPopup] = useState(false);
  const [showConverInfo, setShowConverInfo] = useState(false);
  const [createModalShow, setCreateModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

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
  // const handleSendMessage = (e) => {
  //   e.preventDefault();
  //   socket.emit("client_send_sessage", () => {
  //     console.log("client_send_sessage");
  //   });
  // };

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
  return (
    <div className={classes.chat_container}>
      <ChatNav
        settingsPopup={settingsPopup}
        setSettingsPopup={setSettingsPopup}
        handleLogout={handleLogout}
        userAvatar={userProfileState?._avatar}
        showCreateRoomModal={() => setCreateModalShow(true)}
      />
      <ChatList listRoom={fake_list_room} />
      <Conversation
        messages={fake_list_messages}
        showConverInfo={showConverInfo}
        setShowConverInfo={setShowConverInfo}
        showEditRoomModal={() => setEditModalShow(true)}
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
