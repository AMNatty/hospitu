import React from "react";
import { LoginScreenSectionState } from "../data/AppState";
import { Dispatch } from "redux";
import { LoginAction } from "../data/AppAction";
import { HButton, HButtonStyle } from "./HButton";

import loginImg from "../img/login.svg";
import { HCard } from "./HCard";
import { HInput } from "./HInput";

export class LoginScreen extends React.Component<{
    dispatch: Dispatch,
    sectionState: LoginScreenSectionState
}> {
    login = (): void => {
        this.props.dispatch(new LoginAction());
    }

    render(): JSX.Element
    {
        return (
            <div style={{ height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#87c4c4" }}>
                <HCard>
                    <div style={{ maxWidth: "600px" }}>
                        <img src={ loginImg } alt={ "Informační systém HospITU" } />
                        <div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <HInput label={ "Uživatelské jméno" } type={ "text" } name={ "login" } />
                                <HInput label={ "Heslo" } type={ "password" } name={ "password" } />
                            </div>
                        </div>
                        <div style={{ float: "right", padding: "10px" }}>
                            <HButton style={ HButtonStyle.TEXT }>
                                Vytvořit účet
                            </HButton>
                            <HButton action={ this.login } style={ HButtonStyle.TEXT_INVERTED }>
                                Přihlásit
                            </HButton>
                        </div>
                    </div>
                </HCard>
            </div>
        );
    }
}