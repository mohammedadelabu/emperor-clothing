import React, {useState} from "react";
import {connect} from 'react-redux'

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-buttom.component";

// import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import {signUpStart} from '../../redux/user/user.actions'

import "./sign-up.styles.scss";

const SignUp = ({signUpStart}) => {

	const [userCredentials, setUserCredentials] = useState({
		displayName: "",
		email: "",
		password: "",
		confirmPassword: ""
	});

	const { displayName, email, password, confirmPassword } = userCredentials;

	const handleSubmit = async event => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert("passwords don't match");
			return;
		}

		// try {
		// 	const newUser = await auth.createUserWithEmailAndPassword(email, password);

		// 	const { user } = newUser;

		// 	await createUserProfileDocument(user, { displayName });

		// 	this.state = {
		// 		displayName: "",
		// 		email: "",
		// 		password: "",
		// 		confirmPassword: ""
		// 	};
		// } catch (error) {
		// 	console.error(error);
		// }
		signUpStart({ displayName, email, password });
	};

	const handleChange = event => {
		const { name, value } = event.target;

		setUserCredentials({...userCredentials, [name]: value });
	};

		return (
			<div className="sign-up">
				<h2 className="title">I do not have an account</h2>
				<span>Sign up with your email and password</span>
				<form className="sign-up-form" onSubmit={handleSubmit}>
					<FormInput
						type="text"
						name="displayName"
						onChange={handleChange}
						value={displayName}
						label="Display Name"
						required
					/>
					<FormInput
						type="email"
						name="email"
						onChange={handleChange}
						value={email}
						label="Email"
						required
					/>
					<FormInput
						type="password"
						name="password"
						onChange={handleChange}
						value={password}
						label="Password"
						required
					/>
					<FormInput
						type="password"
						name="confirmPassword"
						onChange={handleChange}
						value={confirmPassword}
						label="Confirm Password"
						required
					/>
					<CustomButton type="submit">SIGN UP</CustomButton>
				</form>
			</div>
		);
}

const mapDispatchToProps = (dispatch) => ({
	signUpStart: (details) => dispatch(signUpStart(details)),
});

export default connect(null, mapDispatchToProps)(SignUp);
