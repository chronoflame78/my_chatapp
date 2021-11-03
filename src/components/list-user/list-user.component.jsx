import React from "react";
import { firestore } from "../../firebase/firebase.utils";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { connect } from "react-redux";
import { openConversation } from "../../redux/user/user.actions";
import Avatar from "../avatar/avatar.component";
import './list-user.styles.scss';

const ListUser = ({ currentUser, openConversation }) => {
  const userRef = firestore.collection("users");
  const query = userRef.orderBy("displayName");

  const [users] = useCollectionData(query, { idField: "id" });

  console.log(users);

  return (
    <div className="list-user-container">
      <div className="user-list-heading">Active Users</div>
      {users &&
        users
          .filter((item) => {
            return item.id !== currentUser.id;
          })
          .map((user) => (
            <div
              className="user-container"
              key={user.id}
              onClick={() => openConversation(user.id)}
            >
              <Avatar imageUrl={user.avatarURL} size={30}/>
              {user.displayName}
            </div>
          ))}
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser: currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  openConversation: (id) => dispatch(openConversation(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);
