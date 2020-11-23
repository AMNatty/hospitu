import React, { ReactNode } from "react";
import { LoginScreenSectionState } from "../data/AppState";
import { Dispatch } from "redux";
import { LoginAction } from "../data/AppAction";
import { HButton, HButtonStyle } from "./HButton";

import loginImg from "../img/login.svg";
import { HCard } from "./HCard";
import { HInput } from "./HInput";
import Axios from "axios";
import { IAPIResponse, ILoginData } from "../data/UserData";
import { HForm, HFormComponent } from "./HForm";

export class LoginScreen extends HFormComponent<{
    dispatch: Dispatch,
    sectionState: LoginScreenSectionState
}, {
    errorText?: string,
    fields: {
        username: string,
        password: string
    }
}> {
    constructor(props: never)
    {
        super(props);

        this.state = {
            fields: {
                username: "",
                password: ""
            }
        };
    }

    login = (): boolean => {
        this.setState({
            errorText: ""
        });

        Axios({
            url: "/users/login",
            method: "POST",
            data: {
                ...this.state.fields
            }
        }).then((response) => {
            const apiResponse = response.data as IAPIResponse;

            switch (apiResponse.code)
            {
                case 200:
                {
                    const responseData = apiResponse as ILoginData;
                    this.props.dispatch(new LoginAction(responseData));

                    break;
                }

                case 404:
                    this.setState(() => ({
                        errorText: "Účet s těmito přihlašovacími údaji nebyl nalezen."
                    }));
                    break;

                default:
                    this.setState(() => ({
                        errorText: "Došlo k chybě při přihlašování, zkuste to prosím znovu později."
                    }));
            }
        }).catch(() => {
            this.setState(() => ({
                errorText: "Došlo k chybě při přihlašování, zkuste to prosím znovu později."
            }));
        });

        return false;
    }

    render(): ReactNode
    {
        return (
            <div style={{ height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#87c4c4" }}>
                <HCard>
                    <div style={{ maxWidth: "600px" }}>
                        <img src={ loginImg } alt={ "Informační systém HospITU" } />
                        <HForm onSubmit={ this.login }>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <HInput fieldInfo={ this.managedField("username") } required={ true } label={ "Uživatelské jméno" } type={ "text" }/>
                                <HInput fieldInfo={ this.managedField("password") } required={ true } label={ "Heslo" } type={ "password" } />
                            </div>
                        </HForm>
                        <div style={{ visibility: this.state.errorText ? "visible" : "hidden", color: "red", paddingLeft: "10px", paddingRight: "10px" }}>
                            { this.state.errorText }
                        </div>
                        <div style={{ float: "right", padding: "10px" }}>
                            <HButton buttonStyle={ HButtonStyle.TEXT }>
                                Vytvořit účet
                            </HButton>
                            <HButton action={ this.login } buttonStyle={ HButtonStyle.TEXT_INVERTED }>
                                Přihlásit
                            </HButton>
                        </div>
                    </div>
                </HCard>
            </div>
        );
    }
}