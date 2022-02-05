import {
	FETCH_COLLECTIONS_START,
	FETCH_COLLECTIONS_SUCCESS,
	FETCH_COLLECTIONS_FAILURE,
} from "./shop.types";

import {
	firestore,
	convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

// export const updateCollections = (collectionMap) => {
// 	return {
// 		type: UPDATE_COLLECTION,
// 		payload: collectionMap,
// 	};
// };

export const fetchCollectionsStart = () => ({
	type: FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
	type: FETCH_COLLECTIONS_SUCCESS,
	payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
	type: FETCH_COLLECTIONS_FAILURE,
	payload: errorMessage,
});

// redux thunk
export const fetchCollectionsStartAsync = () => {
	return (dispatch) => {
		dispatch(fetchCollectionsStart());
		const collectionRef = firestore.collection("collections");

		collectionRef
			.get()
			.then((snapshot) => {
				const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
				// updateCollections(collectionMap);
				dispatch(fetchCollectionsSuccess(collectionsMap));
			})
			.catch((error) => dispatch(fetchCollectionsFailure(error.message)));
	};
};
