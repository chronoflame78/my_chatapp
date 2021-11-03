import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isOpen: false,
    chatId: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            }
        case UserActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case UserActionTypes.OPEN_CONVERSATION:{
            return {
                ...state,
                chatId: action.payload,
                isOpen: true
            }
        }
        case UserActionTypes.CLOSE_CONVERSATION:{
            return {
                ...state,
                chatId: null,
                isOpen: false
            }
        }
        default:
            return state;
    }
}

export default userReducer;