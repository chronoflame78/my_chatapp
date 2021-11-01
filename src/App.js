import React from "react";
import "./App.css";

import SignIn from "./components/sign-in/sign-in.component";

import Header from "./components/header/header.component";
import ListUser from "./components/list-user/list-user.component";

import { connect } from "react-redux";
import { checkUserSession } from "./redux/user/user.actions";

function App({currentUser}) {

  return (
    <div className="App">
      <Header />
      <section>{currentUser ? <ListUser /> : <SignIn />}</section>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { currentUser: state.user.currentUser };
};

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
