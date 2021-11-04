import React, { useState } from "react";
import { firestore } from "../../firebase/firebase.utils";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "../chat-message/chat-message.component";
import firebase from "firebase/compat/app";
import { connect } from "react-redux";
import { closeConversation } from "../../redux/user/user.actions";
import './chat-room.styles.scss';
import { orderBy } from "lodash";

const ChatRoom = ({ chatId, currentUser, closeConversation }) => {
  const messageRef = firestore.collection("messages");

  const fromQuery = messageRef
    .where("fromId", "==", currentUser.id)
    .where("toId", "==", chatId)
    .limit(25);
  
  const toQuery = messageRef
  .where("toId", "==", currentUser.id)
  .where("fromId", "==", chatId)
  .limit(25);

  const [messagesFrom] = useCollectionData(fromQuery, { idField: "id" });
  const [messagesTo] = useCollectionData(toQuery, { idField: "id" });

  let messages = [];
  if(!!messagesFrom && !messagesTo){
    messages = orderBy([...messagesFrom], 'createdAt', 'asc');
  }
  else if (!messagesFrom && !!messagesTo){
    messages = orderBy([...messagesTo], 'createdAt', 'asc');
  }
  else if (!!messagesFrom && !! messagesTo){
    messages = orderBy([...messagesFrom, ...messagesTo], 'createdAt', 'asc');
  }
  else{
    messages = [];
  }

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { id, avatarURL } = currentUser;
    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      fromId: id,
      toId: chatId,
      avatarURL,
    });

    setFormValue("");
  };

  return (
    <div className="chat-room-container">
      <div>
        <button type="button" className="close-button" onClick={() => closeConversation(currentUser.id)}>
          Close
        </button>
      </div>
      <div>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>
      <form className="chat-form" onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    chatId: state.user.chatId
  };
};

const mapDispatchToProps = (dispatch) => ({
  closeConversation: (userId) => dispatch(closeConversation(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
