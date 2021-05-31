import React from "react";
import classes from "./index.module.css";

import assets from "/media/troutrous/Work/Reactjs/ESchool/src/assets/index.js";
import OutsideHandlerWrap from "../../../../hoc/OutsideHandlerWrap";
const ChatNav = ({
  settingsPopup,
  setSettingsPopup,
  handleLogout,
  userAvatar,
}) => {
  return (
    <div className={classes.chat_nav}>
      <div className={classes.card_app}>
        <div className={classes.app_logo}>
          {(userAvatar && (
            <img src={userAvatar?.src} alt={userAvatar?.alt} />
          )) || (
            <img
              src="https://yesoffice.com.vn/wp-content/themes/zw-theme//assets/images/default.jpg"
              alt="logo"
            />
          )}

          <div className={classes.user_status_activity}></div>
        </div>
      </div>
      <div className={classes.app_toolbar}>
        <ul>
          <li>
            <div className={classes.toolbar_item}>
              <div className={classes.toolbar_item_effect}></div>
              <img src={assets.button_svg} alt="plus" />
            </div>
          </li>
          <li>
            <div className={classes.toolbar_item}>
              <div className={classes.toolbar_item_effect}></div>
              <img src={assets.timetable_svg} alt="timetable" />
            </div>
          </li>
          <li>
            <div className={classes.toolbar_item}>
              <div className={classes.toolbar_item_effect}></div>
              <img src={assets.inbox_svg} alt="inbox" />
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <OutsideHandlerWrap
              handleClickOutside={() =>
                settingsPopup ? setSettingsPopup(!settingsPopup) : null
              }
            >
              <div className={classes.toolbar_item}>
                <img
                  src={assets.settings_svg}
                  alt="settings_svg"
                  onClick={() => setSettingsPopup(!settingsPopup)}
                />
                <div
                  className={[
                    classes.setting_popup,
                    settingsPopup ? classes.show : null,
                  ].join(" ")}
                >
                  <ul>
                    <li>
                      <div>
                        <img src={assets.user_svg} alt="user" />
                        Account
                      </div>
                    </li>
                    <li>
                      <div>
                        <img src={assets.settings_svg} alt="settings" />
                        System
                      </div>
                    </li>
                    <li onClick={handleLogout}>
                      <div>
                        <img src={assets.logout_svg} alt="logout" />
                        Logout
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </OutsideHandlerWrap>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatNav;
