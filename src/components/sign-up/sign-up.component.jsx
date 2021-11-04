import React, { useState } from "react";
import { connect } from "react-redux";
import { signUpStart } from "../../redux/user/user.actions";
import moment from "moment";
import "./sign-up.styles.scss";

const SignUp = ({ signUpStart, currentUser }) => {
  const [userData, setUserData] = useState({
    displayName: "",
    birthday: moment(new Date()).format("YYYY-MM-DD"),
    gender: "male",
  });

  const { displayName, birthday, gender } = userData;

  console.log(userData);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!displayName || displayName.trim() === "") {
      alert("Please enter a display name");
      return;
    }

    if (moment(birthday).isAfter(new Date())) {
      alert("Birthday must not exceed today.");
      return;
    }
    

    signUpStart({ displayName, birthday, gender, userId: currentUser.id });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div>
      <div className="sign-up-text">Register new account</div>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label>Nick Name:</label>
        <input
          className="input-margin"
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          placeholder="Please enter a nick name ..."
          required
        />
        <label>Birth Day:</label>
        <input
          className="input-margin"
          type="date"
          name="birthday"
          value={birthday}
          onChange={handleChange}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
        <label>Gender:</label>
        <select
          className="input-margin"
          name="gender"
          value={gender}
          onChange={handleChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button className="next-button" type="submit">
          Next
        </button>
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
