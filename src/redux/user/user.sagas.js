import { takeLatest, put, all, call } from "@redux-saga/core/effects";

import UserActionTypes from "./user.types";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
  registerNewChatProfile,
  setUserUnavailable,
  setUserAvailable
} from "../../firebase/firebase.utils";
import {
  signInFailure,
  signInSuccess,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
  setStatusSuccess,
  setStatusFailure
} from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();
    const data = userSnapshot.data();
    yield put(signInSuccess({ id: userSnapshot.id, ...data }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: userData }) {
  try {
    const userRef = yield registerNewChatProfile(userData);
    const userSnapshot = yield userRef.get();
    const data = userSnapshot.data();
    yield put(signUpSuccess({id: userSnapshot.id, ...data}));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* setUnavailable({payload: {chatId, userId}}) {
  console.log(userId)
  try {
    yield call(setUserUnavailable, chatId, userId);
    yield put(setStatusSuccess());
  } catch (error) {
    yield put(setStatusFailure(error));
  }
}

export function* setAvailable({payload: userId}) {
  try {
    yield call(setUserAvailable, userId);
    yield put(setStatusSuccess());
  } catch (error) {
    yield put(setStatusFailure(error));
  }
}


export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}


export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onOpenConversation() {
  yield takeLatest(UserActionTypes.OPEN_CONVERSATION, setUnavailable);
}

export function* onCloseConversation() {
  yield takeLatest(UserActionTypes.CLOSE_CONVERSATION, setAvailable);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onOpenConversation),
    call(onCloseConversation)
  ]);
}
