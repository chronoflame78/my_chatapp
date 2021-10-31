import React from "react";
import "./App.css";

import SignIn from "./components/sign-in/sign-in.components";
import ChatRoom from "./components/chat-room/chat-room.components";



import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./firebase/firebase.utils";






function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <SignOut/>
      </header>

      <section>
        {user ? <ChatRoom/> : <SignIn/>}
      </section>
    </div>
  );
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;
