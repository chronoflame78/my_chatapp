import React, { useState } from "react";
import { firestore, auth } from "../../firebase/firebase.utils";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "../chat-message/chat-message.component";
import firebase from "firebase/compat/app";
import { connect } from "react-redux";
import { closeConversation } from "../../redux/user/user.actions";

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
  debugger;
  let messages = [];
  if(!!messagesFrom && !messagesTo){
    messages = [...messagesFrom];
  }
  else if (!messagesFrom && !!messagesTo){
    messages = [...messagesTo];
  }
  else if (!!messagesFrom && !! messagesTo){
    messages = [...messagesFrom, ...messagesTo];
  }
  else{
    messages = [];
  }

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      fromId: uid,
      toId: chatId,
      photoURL,
    });

    setFormValue("");
  };

  return (
    <div>
      <div>
        <button type="button" onClick={closeConversation}>
          Close
        </button>
      </div>
      <div>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>
      <form onSubmit={sendMessage}>
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
  closeConversation: () => dispatch(closeConversation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
