import React from "react";
import classes from "./index.module.css";
import assets from "/media/troutrous/Work/Reactjs/ESchool/src/assets/index.js";

const ChatList = ({ listRoom }) => {
  return (
    <div className={classes.chat_list}>
      <div className={classes.conversation_header}>
        <div className={classes.search_box}>
          <img src={assets.search_svg} alt="search_icon" />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className={classes.list_room}>
        <ul>
          {listRoom.map((room) => (
            <li key={room._id}>
              <div className={[classes.card_room].join(" ")}>
                <div className={classes.room_avatar}>
                  <img src={room.avatar} alt={room.name} />
                </div>
                <div className={classes.room_information}>
                  <h6>
                    {room?.name?.length > 35
                      ? `${room?.name?.substring(0, 35)}...`
                      : room?.name}
                  </h6>
                  <p>Tin nhan gan nhat</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatList;
