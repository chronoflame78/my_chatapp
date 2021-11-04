import React from "react";
import { firestore } from "../../firebase/firebase.utils";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { connect } from "react-redux";
import UserItem from "../user-item/user-item.component";
import "./list-user.styles.scss";

const ListUser = ({ currentUser }) => {
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
          .map((user) => <UserItem user={user} key={user.id}/>)}
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser: currentUser,
});


export default connect(mapStateToProps)(ListUser);
