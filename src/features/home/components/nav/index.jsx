import React from "react";
import classes from "./index.module.css";
import logout from "../../../../assets/images/logout.svg";
import button from "../../../../assets/images/button.svg";
import timetable from "../../../../assets/images/timetable.svg";
import settings from "../../../../assets/images/settings.svg";
import user from "../../../../assets/images/user.svg";
import inbox from "../../../../assets/images/inbox.svg";
import OutsideHandlerWrap from "../../../../hoc/OutsideHandlerWrap";
const ChatNav = ({ settingsPopup, setSettingsPopup, handleLogout }) => {
  return (
    <div className={classes.chat_nav}>
      <div className={classes.card_app}>
        <div className={classes.app_logo}>
          <img
            src="https://yesoffice.com.vn/wp-content/themes/zw-theme//assets/images/default.jpg"
            alt="logo"
          ></img>
          <div className={classes.user_status_activity}></div>
        </div>
      </div>
      <div className={classes.app_toolbar}>
        <ul>
          <li>
            <div className={classes.toolbar_item}>
              <div className={classes.toolbar_item_effect}></div>
              <img src={button} alt="plus" />
            </div>
          </li>
          <li>
            <div className={classes.toolbar_item}>
              <div className={classes.toolbar_item_effect}></div>
              <img src={timetable} alt="timetable" />
            </div>
          </li>
          <li>
            <div className={classes.toolbar_item}>
              <div className={classes.toolbar_item_effect}></div>
              <img src={inbox} alt="inbox" />
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
                  src={settings}
                  alt="settings"
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
                        <img src={user} alt="user" />
                        Account
                      </div>
                    </li>
                    <li>
                      <div>
                        <img src={settings} alt="settings" />
                        System
                      </div>
                    </li>
                    <li onClick={handleLogout}>
                      <div>
                        <img src={logout} alt="logout" />
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
