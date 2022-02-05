import React from "react";
import { connect } from "react-redux";

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

// import { ReactComponent as ShoppingIcon } from "../../assets/11.2 shopping-bag.svg.svg";

import {
	CartContainer,
	ShoppingIcon,
	ItemCountContainer,
} from "./cart-icon.styles";

const CartIcon = ({ toggleCartHidden, itemsCount }) => (
	<CartContainer onClick={toggleCartHidden}>
		<ShoppingIcon />
		<ItemCountContainer>{itemsCount}</ItemCountContainer>
	</CartContainer>
);

const mapDispatchToProps = {
	toggleCartHidden
};

const mapStateToProps = state => ({
	itemsCount: selectCartItemsCount(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
