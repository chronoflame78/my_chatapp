import React, { useState } from "react";
import { connect } from "react-redux";
import { openConversation } from "../../redux/user/user.actions";
import Avatar from "../avatar/avatar.component";

const UserItem = ({ user, currentUser, openConversation }) => {
  let status = user.isAvailable ? "Available" : "Not available";
  if (user.isTalkingTo === currentUser.id) status = "Sending ...";

  const [isDetailOpen, setOpen] = useState(false);

  const toggleDetail = (e) => {
    e.stopPropagation();
    setOpen(!isDetailOpen);
  };

  return (
    <div>
      <div
        className={
          "user-container" +
          (user.isAvailable || user.isTalkingTo === currentUser.id
            ? ""
            : " not-available")
        }
        onClick={() => {
          if (!user.isAvailable && user.isTalkingTo !== currentUser.id) return;
          openConversation(user.id, currentUser.id);
        }}
      >
        <Avatar imageUrl={user.avatarURL} size={35} />
        <div className="name-and-status">
          <div className="name-text">{user.displayName}</div>
          <div className="user-status">
            <div
              className={
                "status-icon" +
                (user.isAvailable ? " green" : " red") +
                (user.isTalkingTo === currentUser.id ? " blue" : "")
              }
            />
            <div
              className={
                "status-text" +
                (user.isAvailable ? " green-text" : " red-text") +
                (user.isTalkingTo === currentUser.id ? " blue-text" : "")
              }
            >
              {status}
            </div>
          </div>
        </div>
        <div className="button-detail-container">
          <button
            type="button"
            className="button-detail"
            onClick={toggleDetail}
          >
            Detail &#11167;
          </button>
        </div>
      </div>
      {isDetailOpen && (
        <div
          className={
            "user-detail-container" +
            (user.isAvailable || user.isTalkingTo === currentUser.id
              ? ""
              : " not-available")
          }
        >
          <label>Email:</label>
          <span>{user.email}</span>
          <label>Birth Day:</label>
          <span>{user.birthday}</span>
          <label>Gender:</label>
          <span>{user.gender}</span>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser: currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  openConversation: (chatId, userId) =>
    dispatch(openConversation(chatId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserItem);
