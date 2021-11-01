import React, { useState } from "react";
import { firestore, auth } from "../../firebase/firebase.utils";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "../chat-message/chat-message.component";
import firebase from "firebase/compat/app";
import { connect } from "react-redux";

const ChatRoom = ({id, currentUser}) => {
  const messageRef = firestore.collection("messages");
  
  //const messageRef = firestore.collection("users").doc(id).collection("messages");
  // console.log(currentUser.id);
  // console.log(id);
  const query = messageRef.where("fromId","==",currentUser.id).where("toId","==",id).orderBy("createdAt").limit(25);
  //const query = messageRef.where("toId","==",id).orderBy("createdAt").limit(25);
  //console.log(query);

  const [messages] = useCollectionData(query, { idField: "id" });
  //console.log(messages);

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      fromId: uid,
      toId: id,
      photoURL,
    });

    setFormValue("");
  };

  return (
    <div>
      <div>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit" disabled={!formValue}>Send</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
      currentUser: state.user.currentUser,
  }
} 

export default connect(mapStateToProps)(ChatRoom);
