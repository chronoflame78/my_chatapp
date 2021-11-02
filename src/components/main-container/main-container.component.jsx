import React from "react";
import { connect } from "react-redux";
import ChatRoom from "./../chat-room/chat-room.component";
import ListUser from "./../list-user/list-user.component";

const MainContainer = ({ isOpen }) => {
  if (isOpen) {
    return <ChatRoom />;
  } else {
    return <ListUser />;
  }
};

const mapStateToProps = ({ user: { isOpen } }) => ({
  isOpen: isOpen,
});

export default connect(mapStateToProps)(MainContainer);
