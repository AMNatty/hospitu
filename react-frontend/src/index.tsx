import React from "react";
import ReactDOM from "react-dom";

import "./style/index.less";

import "core-js";

import { Provider } from "react-redux";

import HospitalApp from "./components/HospitalApp";

import store from "./data/RootStore";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HospitalApp />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
