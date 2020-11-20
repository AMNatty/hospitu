import React from "react";
import { IApplicationState, InternalScreenSectionState, LoginScreenSectionState, LoginState } from "../data/AppState";

import { Dispatch } from "redux";
import { connect } from "react-redux";

import { LoginScreen } from "./LoginScreen";
import { InternalAppScreen } from "./InternalAppScreen";

class HospitalApp extends React.Component<{
    appState: IApplicationState,
    dispatch: Dispatch
}>
{
    render()
    {
        switch (this.props.appState.loginState)
        {
            case LoginState.LOGGED_IN:
                return (
                    <InternalAppScreen dispatch={this.props.dispatch} sectionState={this.props.appState.currentSection as InternalScreenSectionState}>
                        <span>
                            Filler text
                        </span>
                    </InternalAppScreen>
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