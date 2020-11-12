import React from "react";
import ReactDOM from "react-dom";

import "./style/index.less";

import { ApplicationState, LoginState } from "./data/AppState";

class HospitalApp extends React.Component<unknown, {
    applicationData: ApplicationState
}>
{
    constructor(props: unknown)
    {
        super(props);

        this.state = {
            applicationData: {
                loginState: LoginState.LOGGED_OUT
            }
        };
    }

    toggleLogin()
    {
        this.setState({
            applicationData: {
                ...this.state.applicationData,
                loginState: this.state.applicationData.loginState == LoginState.LOGGED_OUT ? LoginState.LOGGED_IN : LoginState.LOGGED_OUT
            }
        });
    }

    render()
    {
        switch (this.state.applicationData.loginState)
        {
            case LoginState.LOGGED_IN:
                return (
                    <div>
                        <span>
                            Hello world!
                        </span>
                        <button onClick={this.toggleLogin.bind(this)}>
                            Log out
                        </button>
                    </div>
                );

            case LoginState.LOGGED_OUT:
                return (
                    <div>
                        <span>
                            Goodbye world!
                        </span>
                        <button onClick={this.toggleLogin.bind(this)}>
                            Log in
                        </button>
                    </div>
                );

        }
    }
}

ReactDOM.render(
    <React.StrictMode>
        <HospitalApp />
    </React.StrictMode>,
    document.getElementById("root")
);
