import React, {lazy, Suspense} from "react";
import { Route } from "react-router-dom";
// import { createStructuredSelector } from 'reselect'
import { connect } from "react-redux";

// import WithSpinner from "../../components/with-spinner/with-spinner.component";
import Spinner from "../../components/spinner/spinner.component";

// import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
// import CollectionsOverviewContiner from "../../components/collections-overview/collections-overview.container";
// import CollectionPage from "../collection/collection.component";
// import CollectionPageContainer from "../collection/collection.container";



// import {
// 	firestore,
// 	convertCollectionsSnapshotToMap,
// } from "../../firebase/firebase.utils";

// import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const CollectionsOverviewContiner = lazy(() =>
	import("../../components/collections-overview/collections-overview.container")
);
const CollectionPageContainer = lazy(() =>
	import("../collection/collection.container")
);

class ShopPage extends React.Component {
	// constructor(props) {
	// 	super();
	// 	this.state = {
	// 		loading: true,
	// 	};
	// }

	// unsubscribeFromSnapshot = null;

	componentDidMount() {
		// const { updateCollections } = this.props;

		// const collectionRef = firestore.collection("collections");

		// observable/observer pattern of interfacing with firestore library which constantly update us with live data
		// this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
		// 	const collectionMap = convertCollectionsSnapshotToMap(snapshot);
		// 	updateCollections(collectionMap);
		// 	this.setState({ loading: false });
		// });

		// Promise base pattern by leveraging the firestore collectionRef that we get back from firestore library
		// collectionRef.get().then(snapshot => {
		// 	const collectionMap = convertCollectionsSnapshotToMap(snapshot);
		// 	updateCollections(collectionMap);
		// 	this.setState({ loading: false });
		// });

		// Using the fetch pattern which is very deeply nested before we can access our desired data
		// fetch('https://firestore.googleapis.com/v1/projects/five-clothing-db/databases/(default)/documents/collections')
		// .then(response => response.json())
		// .then(collections => console.log('collections:', collections))


		// const {fetchCollectionsStartAsync} = this.props
		const {fetchCollectionsStart} = this.props
		fetchCollectionsStart()
		// fetchCollectionsStartAsync()

	}

	render() {
		const { match, isCollectionFetching, isCollectionLoaded } = this.props;
		// const {loading} = this.state
		return (
			<div className="shop-page">
				<Suspense fallback={<Spinner />}>
					<Route
						exact
						path={`${match.path}`}
						component={CollectionsOverviewContiner}
					/>
					<Route
						path={`${match.path}/:collectionId`}
						component={CollectionPageContainer}
					/>
				</Suspense>
			</div>
		);
	}
}

// const mapStateToProps = createStructuredSelector({
// 	isCollectionFetching: selectIsCollectionFetching,
// 	isCollectionLoaded: selectIsCollectionsLoaded,
// });

const mapDispatchToProps = (dispatch) => ({
	fetchCollectionsStart: () =>
		dispatch(fetchCollectionsStart()),
	// fetchCollectionsStartAsync: () =>
	// 	dispatch(fetchCollectionsStartAsync()),
});
// const mapDispatchToProps = (dispatch) => ({
// 	updateCollections: (collectionMap) =>
// 		dispatch(updateCollections(collectionMap)),
// });

export default connect(null, mapDispatchToProps)(ShopPage);
