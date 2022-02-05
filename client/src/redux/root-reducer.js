import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

// import {fetchCollectionsStart} from './shop/shop.sagas'
import rootSaga from './root-saga';

// Redux-persist for local storage setup
import { persistStore } from "redux-persist";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import user from "./user/user.reducer";
import cart from "./cart/cart.reducer";
import directory from "./directory/directory.reducer";
import shop from "./shop/shop.reducer";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["cart"]
};

const rootReducer = combineReducers({
	user,
	cart,
	directory,
	shop
});

const rootPersistReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger);
}

const store = createStore(rootPersistReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
