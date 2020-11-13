import React from "react";
import { IApplicationState, LoginScreenSectionState, LoginState } from "../data/AppState";

import { Dispatch } from "redux";
import { connect } from "react-redux";

import { LogoutAction } from "../data/AppAction";
import { LoginScreen } from "./LoginScreen";

class HospitalApp extends React.Component<{
    appState: IApplicationState,
    dispatch: Dispatch
}, unknown>
{
    logout()
    {
        if (this.props.appState.loginState != LoginState.LOGGED_OUT)
            this.props.dispatch(new LogoutAction());
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
                        <button onClick={this.logout.bind(this)}>
                            Log out
                        </button>
                    </div>
                );

            case LoginState.LOGGED_OUT:
                return (
                    <LoginScreen dispatch={this.props.dispatch} sectionState={this.props.appState.currentSection as LoginScreenSectionState} />
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