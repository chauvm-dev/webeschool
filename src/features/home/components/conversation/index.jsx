import classes from "./index.module.css";
import React from "react";
import Assets from "../../../../assets";

const Conversation = ({
  showConverInfo,
  setShowConverInfo,
  showEditRoomModal,
  handleEmitMessage,
  messageInput,
  handleMessageInputChange,
  conversationActivity,
}) => {
  return (
    <div className={classes.chat_conversation}>
      <div className={classes.conversation_content}>
        <div className={classes.conversation_header}>
          <div className={classes.conversation_card}>
            <div className={classes.conversation_avatar}>
              <img src={process.env.REACT_APP_THUMBNAIL_DEFAULT} alt="room" />
            </div>
            <div className={classes.conversation_text}>
              <p>Ten phong</p>
            </div>
          </div>
          <div className={classes.header_nav}>
            <div
              className={[classes.nav_icon, classes.padding_right_8].join(" ")}
            >
              <img
                src={Assets.editbutton_svg}
                alt="edit_room"
                onClick={showEditRoomModal}
              />
            </div>
            <div className={classes.nav_icon}>
              <img
                src={Assets.layout_svg}
                alt="layout_svg"
                onClick={() => {
                  setShowConverInfo(!showConverInfo);
                }}
              />
            </div>
          </div>
        </div>
        <div className={classes.conversation_messages}>
          <ul>
            {conversationActivity &&
              conversationActivity.messages &&
              conversationActivity.messages.map((message) => (
                <li key={message._id}>
                  <div
                    className={[classes.message, classes.message_reverse].join(
                      " "
                    )}
                  >
                    <div className={classes.message_avatar}>
                      {(message.avatar && (
                        <img
                          src={message.avatar}
                          alt={`avatar ${message._sender}`}
                        />
                      )) || (
                        <img
                          src={process.env.REACT_APP_THUMBNAIL_DEFAULT}
                          alt={`avatar`}
                        />
                      )}
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
              <img src={Assets.image_svg} alt="images" />
            </div>
            <div
              className={[classes.nav_icon, classes.padding_left_8].join(" ")}
            >
              <img src={Assets.attachments_svg} alt="attachments" />
            </div>
          </div>

          <form
            className={classes.input_text}
            onSubmit={handleEmitMessage}
            autoComplete="off"
          >
            <input
              type="text"
              name="message"
              onChange={handleMessageInputChange}
              value={messageInput}
              autoComplete="off"
            />
          </form>
          <div className={classes.input_toolbar}>
            <div className={classes.nav_icon}>
              <img
                src={Assets.send_svg}
                alt="send_svg"
                onClick={handleEmitMessage}
              />
            </div>
          </div>
        </div>
      </div>
      {showConverInfo && (
        <div className={classes.conversation_information}>
          <div className={classes.conversation_header}>
            <p>Conversation Information</p>
          </div>
          <div className={classes.information_content}>
            <div className={classes.information_member}>
              <div className={classes.infor_item_header}>
                <p>Members</p>
                <img
                  src={Assets.arrow_pointing_downwards_svg}
                  alt={"arrow_pointing_downwards_svg"}
                />
              </div>
              <div className={classes.infor_item_content}>
                <ul>
                  <li>
                    <div>Name</div>
                  </li>
                  <li>
                    <div>Name</div>
                  </li>
                  <li>
                    <div>Name</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversation;
