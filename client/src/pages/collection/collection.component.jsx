import React from "react";
import { connect } from "react-redux";

import { selectCollection } from "../../redux/shop/shop.selectors";

import CollectionsItem from "../../components/collection-item/collection-item.component";

import {
	CollectionPageContainer,
	CollectionTitle,
	CollectionItemsContainer,
} from "./collection.styles";

const CollectionPage = ({ collection }) => {
	const { title, items } = collection;

	return (
		<CollectionPageContainer>
			<CollectionTitle>{title}</CollectionTitle>
			<CollectionItemsContainer>
				{items.map((item) => (
					<CollectionsItem key={item.id} item={item} />
				))}
			</CollectionItemsContainer>
		</CollectionPageContainer>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		collection: selectCollection(ownProps.match.params.collectionId)(state),
	};
};

export default connect(mapStateToProps)(CollectionPage);
