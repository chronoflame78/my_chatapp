import React from 'react';
import { signOutStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

const Header = ({signOutStart, currentUser}) => {
    return (
        <header>
        {
          currentUser && (
            <button onClick={signOutStart}>Sign Out</button>
          )
        }
      </header>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
    }
} 

const mapDispatchToProps = dispatch =>({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);