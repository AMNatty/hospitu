import React from "react";
import { IApplicationState, LoginState } from "../data/AppState";

import { Dispatch } from "redux";
import { connect } from "react-redux";

import { LoginAction, LogoutAction } from "../data/AppAction";

class HospitalApp extends React.Component<{
    appState: IApplicationState,
    dispatch: Dispatch
}, unknown>
{
    toggleLogin()
    {
        if (this.props.appState.loginState != LoginState.LOGGED_OUT)
            this.props.dispatch(new LogoutAction());
        else
            this.props.dispatch(new LoginAction());
    }

    render()
    {
        switch (this.props.appState.loginState)
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

const mapStateToProps = (state: IApplicationState) => {
    return {
        appState: state
    };
};

export default connect(
    mapStateToProps
)(HospitalApp);