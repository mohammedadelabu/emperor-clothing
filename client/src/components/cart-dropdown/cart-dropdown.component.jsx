import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CustomButton from "../custom-button/custom-buttom.component";
import CartItem from "../cart-item/cart-item.component";


import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCurrentUser } from "../../redux/user/user.selector";

import {
	CartDropdownContainer,
	CartDropdownButton,
	EmptyMessageContainer,
	CartItemsContainer,
} from "./cart-dropdown.styles";

const CartDropdown = ({ cartItems, dispatch, currentUser }) => {
	const history = useHistory();
	return (
		<CartDropdownContainer>
			<CartItemsContainer>
				{cartItems.length ? (
					cartItems.map((cartItem) => <CartItem key={cartItem.id} item={cartItem} />)
				) : (
					<EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
				)}
			</CartItemsContainer>
			<CartDropdownButton
				onClick={() => {
					if (currentUser) {
						history.push("/checkout");
						dispatch(toggleCartHidden());
					} else {
						history.push("/signin");
					}
				}}
			>
				GO TO CHECKOUT
			</CartDropdownButton>
		</CartDropdownContainer>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	cartItems: selectCartItems,
});

export default connect(mapStateToProps)(CartDropdown);
