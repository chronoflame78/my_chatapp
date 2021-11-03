import React from "react";
import { auth } from "../../firebase/firebase.utils";

const ChatMessage = (props) => {
    const { text, fromId, avatarURL } = props.message;

    const messageClass = fromId === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <img src={avatarURL} alt="" />
            <p>{text}</p>
        </div>
    )
}

export default ChatMessage;