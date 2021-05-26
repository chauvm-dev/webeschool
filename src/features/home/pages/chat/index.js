import React, { useState } from "react";
import classes from "./index.module.css";
import logo from "../../../../assets/images/unnamed_auto_x2.png";
import cameraICon from "../../../../assets/images/video-camera .svg";
import listIcon from "../../../../assets/images/sidebar.svg";
import image from "../../../../assets/images/image.svg";
import attachments from "../../../../assets/images/attachments.svg";
import send from "../../../../assets/images/send.svg";
import ChatNav from "../../components/nav/index";
import live from "../../../../assets/images/live.svg";

import Modal from "../../../../UI/modal";
import { useDispatch } from "react-redux";
import { signout } from "../../../../store/actions";
import ChatList from "../../components/ChatList";

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
  const dispatch = useDispatch();
  const [settingsPopup, setSettingsPopup] = useState(false);

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
  return (
    <div className={classes.chat_container}>
      <ChatNav
        settingsPopup={settingsPopup}
        setSettingsPopup={setSettingsPopup}
        handleLogout={handleLogout}
      />
      <ChatList listRoom={fake_list_room} />
      {/* <Modal>
        <p>Hahaha</p>
      </Modal> */}

      <div className={classes.chat_conversation}>
        <div className={classes.conversation_content}>
          <div className={classes.conversation_header}>
            <div className={classes.conversation_card}>
              <div className={classes.conversation_avatar}>
                <img
                  src="https://yesoffice.com.vn/wp-content/themes/zw-theme//assets/images/default.jpg"
                  alt="room"
                />
              </div>
              <div className={classes.conversation_text}>
                <p>Ten phong</p>
              </div>
            </div>
            <div className={classes.header_nav}>
              <div
                className={[classes.nav_icon, classes.padding_right_8].join(
                  " "
                )}
              >
                <img src={cameraICon} alt="video_call" />
              </div>
              <div className={classes.nav_icon}>
                <img src={listIcon} alt="list" />
              </div>
            </div>
          </div>
          <div className={classes.conversation_messages}>
            <ul>
              {fake_list_messages.map((message) => (
                <li key={message._id}>
                  <div
                    className={[classes.message, classes.message_reverse].join(
                      " "
                    )}
                  >
                    <div className={classes.message_avatar}>
                      <img src={message.user.avatar} alt="message" />
                    </div>
                    <div className={classes.message_content}>
                      <p>{message.content}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.conversation_input}>
            <div className={classes.input_toolbar}>
              <div className={classes.nav_icon}>
                <img src={image} alt="images" />
              </div>
              <div
                className={[classes.nav_icon, classes.padding_left_8].join(" ")}
              >
                <img src={attachments} alt="attachments" />
              </div>
            </div>
            <div className={classes.input_text}>
              <input type="text" />
            </div>
            <div className={classes.input_toolbar}>
              <div className={classes.nav_icon}>
                <img src={send} alt="video_call" />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.conversation_information}>
          <div className={classes.conversation_header}>
            <p>Conversation Information</p>
          </div>
          <div className={classes.information_content}></div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
