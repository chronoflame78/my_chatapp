import React from "react";
import { auth } from "../../firebase/firebase.utils";
import Linkify from 'react-linkify';
import {emojify} from 'react-emojione';

const ChatMessage = (props) => {
    const { text, fromId, avatarURL } = props.message;

    const messageClass = fromId === auth.currentUser.uid ? 'sent' : 'received';

    const options = {
        style: {
            height: 20
        },
    };

    return (
        <div className={`message ${messageClass}`}>
            <img src={avatarURL} alt="" />
            <div className="text-message"><Linkify>{emojify(text, options)}</Linkify></div>
        </div>
    )
}

export default ChatMessage;