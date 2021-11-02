import React from "react";
import { firestore } from "../../firebase/firebase.utils";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { connect } from "react-redux";
import { openConversation } from "../../redux/user/user.actions";

const ListUser = ({ currentUser, openConversation }) => {
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
            <div
              className="user-container"
              key={user.id}
              onClick={() => openConversation(user.id)}
            >
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
