import React from "react";
import ReactDOM from "react-dom";

import "./style/index.less";

import "core-js";

import { Provider } from "react-redux";

import HospitalApp from "./components/HospitalApp";

import store from "./data/RootStore";

import Axios from "axios";
import { config } from "./config/config";

Axios.defaults.baseURL = config.apiBaseURI;
Axios.defaults.validateStatus = status => {
    return status >= 200 && status < 300 || status >= 400 && status <= 404 || status == 500;
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HospitalApp />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
