import React from "react";
import { signOutStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import Avatar from "../avatar/avatar.component";
import "./header.styles.scss";

const Header = ({ signOutStart, currentUser }) => {
  return (
    <header>
      {!currentUser && <div className="chat-app-header">My Chat App</div>}
      {currentUser && currentUser.avatarURL && (
        <div className="avatar-container">
          <Avatar imageUrl={currentUser.avatarURL} size={45} />
        </div>
      )}
      {currentUser && currentUser.displayName && (
        <div className="display-name">{currentUser.displayName}</div>
      )}
      {currentUser && (
        <button className="sign-out-button" onClick={signOutStart}>
          Sign Out
        </button>
      )}
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
