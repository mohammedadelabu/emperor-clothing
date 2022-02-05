import React from "react";
import { withRouter } from "react-router-dom";


import CollectionItem from "../collection-item/collection-item.component";

import {
	CollectionPreviewContainer,
	TitleContainer,
	PreviewContainer,
} from "./collection-preview.styles";

const CollectionsPreview = ({ title, items, history, match, routeName }) => (
	<CollectionPreviewContainer>
		<TitleContainer onClick={() => history.push(`${match.path}/${routeName}`)}>
			{title.toUpperCase()}
		</TitleContainer>
		<PreviewContainer>
			{items
				.filter((item, index) => index < 4)
				.map((item, index) => (
					<CollectionItem key={index} item={item} />
				))}
		</PreviewContainer>
	</CollectionPreviewContainer>
);

export default withRouter(CollectionsPreview);
