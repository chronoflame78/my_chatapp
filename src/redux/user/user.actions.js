import UserActionTypes from "./user.types";

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const facebookSignInStart = () => ({
    type: UserActionTypes.FACEBOOK_SIGN_IN_START
});

export const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = (error) => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
})


export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
})

export const signUpStart = (userData) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userData
});

export const signUpSuccess = (user) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: user
});

export const signUpFailure = (error) => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
})

export const openConversation = (chatId, userId) => ({
    type: UserActionTypes.OPEN_CONVERSATION,
    payload: {
        chatId,
        userId
    }
})

export const closeConversation = (id) => ({
    type: UserActionTypes.CLOSE_CONVERSATION,
    payload: id
})

export const setStatusSuccess = () => ({
    type: UserActionTypes.SET_STATUS_SUCCESS
});

export const setStatusFailure = () => ({
    type: UserActionTypes.SET_STATUS_FAILURE
});