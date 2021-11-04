import React from "react";
import { googleSignInStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import './sign-in.styles.scss';

const SignIn = ({ googleSignInStart }) => {
  return (
    <div className="sign-in-container">
      <div className="google-sign-in" onClick={googleSignInStart}>
      <img src="./images/Google.jpg" width={40} alt=""/>
      <div className="google-text">Sign in with Google</div>
      </div>

      <div className="facebook-sign-in">
      <img src="./images/Facebook.png" width={40} alt=""/>
      <div className="google-text">Sign in with Facebook</div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
});

export default connect(null, mapDispatchToProps)(SignIn);
