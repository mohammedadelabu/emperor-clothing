import { takeLatest, put, all, call } from "redux-saga/effects";

import {
	GOOGLE_SIGN_IN_START,
	EMAIL_SIGN_IN_START,
	CHECK_USER_SESSION,
	SIGN_OUT_START,
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
} from "./user.types";

import {
	auth,
	googleProvider,
	createUserProfileDocument,
	getCurrentUser,
} from "../../firebase/firebase.utils";

import {
	signInSuccess,
	signInFailure,
	signOutSuccess,
	signOutFailure,
    emailSignInStart,
    signUpFailure,
    signUpSuccess,
} from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
	const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
	const userSnapshot = yield userRef.get();
	yield put(signInSuccess({ id: userRef.id, ...userSnapshot.data() }));
}

// Signing in with google
export function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		// const userRef = yield call(createUserProfileDocument, user);
		// const userSnapshot = yield userRef.get();
		// yield put(signInSuccess({ id: userRef.id, ...userSnapshot.data() }));
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

// Signin with email and password
export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		// const userRef = yield call(createUserProfileDocument, user);
		// const userSnapshot = yield userRef.get();
		// yield put(signInSuccess({ id: userRef.id, ...userSnapshot.data() }));
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

// Sign out generator
export function* signOut() {
	try {
		yield auth.signOut();
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailure(error));
	}
}

// Sign up generator
export function* signUp({ payload: { displayName, email, password } }) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password)
    
        // yield call(createUserProfileDocument, user, { displayName });
        yield put(signUpSuccess({user, additionalData: {displayName}}))
    
        // yield put(emailSignInStart(email, password))
        
    
        // const userSnapshot = yield userRef.get();
        // console.log("newUser: ", userSnapshot.data());
        
    } catch (error) {
        yield put(signUpFailure(error))
    }
}

// Sign in after sign up
export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData)
}

// check user authentication
export function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) return;
		yield getSnapshotFromUserAuth(userAuth);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
	yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
	yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
	yield takeLatest(SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
	yield all([
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(isUserAuthenticated),
		call(onSignOutStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
	]);
}
