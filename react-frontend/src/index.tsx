import React from "react";
import ReactDOM from "react-dom";

import "./style/index.less";

import { ApplicationState, LoginState } from "./data/AppState";


class HospitalApp extends React.Component<ApplicationState, never>
{
    render()
    {
        switch (this.props.loginState)
        {
            case LoginState.LOGGED_IN:
                return ( "Hello world!" );

            case LoginState.LOGGED_OUT:
                return ( "Goodbye world!" );
        }
    }
}

ReactDOM.render(
    <React.StrictMode>
        <HospitalApp  loginState={ LoginState.LOGGED_OUT } />
    </React.StrictMode>,
    document.getElementById("root")
);
