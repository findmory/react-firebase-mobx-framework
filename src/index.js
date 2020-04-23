import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "mobx-react";
import RootStore from "./stores";

// Provide instantiated RootStore as stores
// now we can inject 'stores' to any component
// and they have access to all/any stores on this.props.stores.<storename>
ReactDOM.render(
  <Provider stores={new RootStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
