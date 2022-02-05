import React, {useState} from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-buttom.component";

// Firebase utils
// import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import { googleSignInStart, emailSignInStart } from "../../redux/user/user.actions";

import {
	SignInContainer,
	SignInTitle,
	ButtonsBarContainer,
} from "./sign-in.styles";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
	const [userCredentials, setCredentials] = useState({ email: '', password: '' });
	
	const { email, password } = userCredentials;
	const handleSubmit = async (event) => {
		event.preventDefault();


		// try {
		// 	await auth.signInWithEmailAndPassword(email, password);
		// 	this.setState({
		// 		email: "",
		// 		password: "",
		// 	});
		// } catch (error) {
		// 	console.log(error);
		// }

		emailSignInStart(email, password)
	};

	const handleChange = (event) => {
		const { value, name } = event.target;

		setCredentials({
			...userCredentials,
			[name]: value,
		});
	};

	return (
		<SignInContainer>
			<SignInTitle>I already have an account</SignInTitle>
			<span className="title">Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput
					type="email"
					name="email"
					label="email"
					value={email}
					handleChange={handleChange}
					required
				/>
				<FormInput
					type="password"
					name="password"
					label="password"
					value={password}
					handleChange={handleChange}
					required
				/>

				<ButtonsBarContainer>
					<CustomButton type="submit">Sign in</CustomButton>
					<CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>
						{" "}
						Sign in wth Google{" "}
					</CustomButton>
				</ButtonsBarContainer>
			</form>
		</SignInContainer>
	);
}

const mapDispatchToProps = (dispatch) => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password})),
});

export default connect(null, mapDispatchToProps)(SignIn);
