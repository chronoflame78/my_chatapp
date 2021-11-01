import React from "react";
import { firestore, auth } from "../../firebase/firebase.utils";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatRoom from "./../chat-room/chat-room.component";
import { connect } from "react-redux";

const ListUser = ({currentUser}) => {
  const userRef = firestore.collection("users");
  const query = userRef.orderBy("displayName");

  const [users] = useCollectionData(query, { idField: "id" });

  return (
    <div>
      {users &&
        users
          .filter((item) => {
            console.log(item);
            console.log(currentUser);
            return item.id !== currentUser.id;
          })
          .map((user) => (
            <div className="user-container" key={user.id}>
              {user.displayName}
              <ChatRoom id={user.id} />
            </div>
          ))}
    </div>
  );
};

const mapStateToProps = ({user: {currentUser}}) => ({
    currentUser: currentUser,
});

export default connect(mapStateToProps)(ListUser);
