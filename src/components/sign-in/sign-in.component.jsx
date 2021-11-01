import React from "react";
import { googleSignInStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const SignIn = ({googleSignInStart}) => {
  return <button onClick={googleSignInStart}>Sign in with Google</button>;
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
});

export default connect(null, mapDispatchToProps)(SignIn);
