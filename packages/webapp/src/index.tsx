import React from "react";
import App from "./components/App";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { initClient } from "./helpers/client";

const client = initClient();

ReactDOM.render(<App client={client} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
