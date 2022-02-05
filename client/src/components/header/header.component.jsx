import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { ReactComponent as Logo } from "../../assets/4.3 crown.svg.svg";

// import "./header.styles.scss";
import {
	HeaderComponent,
	LogoContainer,
	OptionsContainer,
	OptionDiv,
	OptionLink,
} from "./header.styled";

// import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.compnent";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { signOutStart } from "../../redux/user/user.actions";

const Header = ({ currentUser, hidden, signOutStart }) => {
	return (
		<HeaderComponent>
			<LogoContainer to="/">
				<Logo className="logo" />
			</LogoContainer>

			<OptionsContainer>
				<OptionLink to="/shop">SHOP</OptionLink>
				<OptionLink to="/contact">CONTACT</OptionLink>
				{currentUser ? (
					<OptionDiv onClick={signOutStart}>SIGN OUT</OptionDiv>
				) : (
					<OptionLink to="/signin">SIGN IN</OptionLink>
				)}
				<CartIcon />
			</OptionsContainer>
			{hidden ? <CartDropdown /> : null}
		</HeaderComponent>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
	signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
