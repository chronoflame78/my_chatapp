import React from 'react';
import { signOutStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import Avatar from '../avatar/avatar.component';

const Header = ({signOutStart, currentUser}) => {
    return (
        <header>
          {
            currentUser && currentUser.avatarURL && (<Avatar imageUrl={currentUser.avatarURL} size={40}/>)
          }
          {
            currentUser && currentUser.displayName && (<p>{currentUser.displayName}</p>)
          }
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