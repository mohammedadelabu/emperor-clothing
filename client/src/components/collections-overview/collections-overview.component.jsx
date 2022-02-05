import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionsPreview from "../collection-preview/collection-preview.component";

import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";

import { CollectionsOverviewContainer } from "./collections-overview.styles";

const CollectionsOverview = ({ collections }) => {
	return (
		<CollectionsOverviewContainer>
			{collections.map(({ id, ...otherCollectionProps }) => (
				<CollectionsPreview key={id} {...otherCollectionProps} />
			))}
		</CollectionsOverviewContainer>
	);
};

const mapStateToProps = createStructuredSelector({
	collections: selectCollectionsForPreview
});
export default connect(mapStateToProps)(CollectionsOverview);
