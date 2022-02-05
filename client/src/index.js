import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

// redux-persist
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import App from "./App";

import { store, persistor } from "./redux/root-reducer";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<PersistGate persistor={persistor}>
				<App />
			</PersistGate>
		</Router>
	</Provider>,
	document.getElementById("root")
);

serviceWorker.register();