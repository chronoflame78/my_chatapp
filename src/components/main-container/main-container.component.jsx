import React from "react";
import { connect } from "react-redux";
import ChatRoom from "./../chat-room/chat-room.component";
import ListUser from "./../list-user/list-user.component";
import SignUp from "./../sign-up/sign-up.component";

const MainContainer = ({ isOpen, currentUser }) => {
  if (!currentUser.isRegistered) {
    return <SignUp />;
  }

  if (isOpen) {
    return <ChatRoom />;
  } else {
    return <ListUser />;
  }
};

const mapStateToProps = ({ user: { isOpen, currentUser } }) => ({
  isOpen,
  currentUser,
});

export default connect(mapStateToProps)(MainContainer);
