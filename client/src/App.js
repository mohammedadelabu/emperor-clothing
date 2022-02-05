import React, {useEffect, lazy, Suspense} from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import {GlobalStyle} from './global.styles'

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component.jsx"
// import Homepage from "./pages/homepage/homepage.component";
// import SignInAndSignUp from "./components/sign-in-and-sign-up/sign-in-and-sign-up.component";
// import ShopPage from "./pages/shop/shop.component";
// import CheckoutPage from "./pages/checkout/checkout.component";
// import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// import { setCurrentUser, checkUserSession } from "./redux/user/user.actions";
import { setCurrentUser, checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";

import ErrorBoundary from './components/error-boundary/error-boundary.component';

const Homepage = lazy(() => import("./pages/homepage/homepage.component"));
const SignInAndSignUp = lazy(() =>
	import("./components/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));

const App = ({ checkUserSession, currentUser }) => {
	// unsubscribeFromAuth = null;

	useEffect(() => {
		checkUserSession();
	}, [checkUserSession]);

	// componentDidMount() {
		// const { setCurrentUser } = this.props;

		// user authentication using firestore observable method
		// this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
		// 	if (userAuth) {
		// 		const userRef = await createUserProfileDocument(userAuth);

		// 		userRef.onSnapshot(snapShot => {
		// 			setCurrentUser({
		// 				id: snapShot.id,
		// 				...snapShot.data()
		// 			});
		// 		});
		// 	} else {
		// 		setCurrentUser(userAuth);
		// 	}
		// });

		// const { checkUserSession } = this.props;
		// checkUserSession();
	// }

	// componentWillUnmount() {
	// 	this.unsubscribeFromAuth();
	// }

	// render() {
	return (
		<div>
			<GlobalStyle />
			<Header />
			<Switch>
				<ErrorBoundary>
					<Suspense fallback={<Spinner />}>
						<Route exact path="/" component={Homepage} />
						<Route path="/shop" component={ShopPage} />
						<Route exact path="/checkout">
							<CheckoutPage />
						</Route>
						<Route
							exact
							path="/signin"
							render={() =>
								currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
							}
						/>
					</Suspense>
				</ErrorBoundary>
			</Switch>
		</div>
	);
	// }
}

const mapDispatchToProps = (dispatch) => ({
	checkUserSession: () => dispatch(checkUserSession()),
	// setCurrentUser: user => dispatch(setCurrentUser(user))
});

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
