import React, { useState } from "react";
import { firestore, auth } from "../../firebase/firebase.utils";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "../chat-message/chat-message.components";
import firebase from "firebase/compat/app";

const ChatRoom = () => {
  const messageRef = firestore.collection("messages");
  const query = messageRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
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

export default ChatRoom;
