import React, { useState } from "react";
import { connect } from "react-redux";
import { signUpStart } from "../../redux/user/user.actions";
import moment from "moment";
import "./sign-up.styles.scss";

const SignUp = ({ signUpStart, currentUser }) => {
    const [userData, setUserData] = useState({
        displayName: '',
        birthday: moment(new Date()).format("YYYY-MM-DD"),
        gender: 'male'
    });

    const {displayName, birthday, gender} = userData;

    console.log(userData);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!displayName || displayName.trim() === '') {
        alert("Please enter a display name");
        return;
      }

    signUpStart({ displayName, birthday, gender, userAuth: currentUser.userAuth });
  };

  const handleChange = event => {
      const {name, value} = event.target;
      setUserData({...userData, [name]: value})
  }

  

  return (
    <div>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label>Nick Name:</label>
        <input type="text" name="displayName" value={displayName} onChange={handleChange} required/>
        <label>Birth Day:</label>
        <input type="date" name="birthday" value={birthday} onChange={handleChange} />
        <label>Gender:</label>
        <select name="gender" value={gender} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        </select>
        <button className="next-button" type="submit">Next</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userData) => dispatch(signUpStart(userData)),
});

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser: currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
