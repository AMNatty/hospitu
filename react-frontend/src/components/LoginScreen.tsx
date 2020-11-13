import React from "react";
import { LoginScreenSectionState } from "../data/AppState";
import { Dispatch } from "redux";
import { LoginAction } from "../data/AppAction";

export class LoginScreen extends React.Component<{
    dispatch: Dispatch,
    sectionState: LoginScreenSectionState
}, unknown> {
    login()
    {
        this.props.dispatch(new LoginAction());
    }

    render()
    {
        return (
            <div>
                <span>
                    Hello!
                </span>
                <button onClick={this.login.bind(this)}>
                    Log in
                </button>
            </div>
        );
    }
}