import React, { ReactNode } from "react";
import { LoginScreenSectionState } from "../data/AppState";
import { Dispatch } from "redux";
import { LoginAction } from "../data/AppAction";
import { HButton, HButtonStyle } from "./HButton";

import loginImg from "../img/login.svg";
import { HBox, HCard, HGrid, HHeader, VBox } from "./HCard";
import { HFlow, HInput } from "./HInput";
import Axios from "axios";
import { IAPIReadableResponse, IAPIResponse, ILoginData } from "../data/UserData";
import { HForm, HFormComponent } from "./HForm";

import "../style/login-screen.less";

enum EnumLoginScreenState
{
    LOGIN_DEFAULT,
    LOGIN_WAITING,
    REGISTER_DEFAULT,
    REGISTER_WAITING
}

export class LoginScreen extends HFormComponent<{
    dispatch: Dispatch,
    sectionState: LoginScreenSectionState
}, {
    errorText?: string,
    screenState: EnumLoginScreenState,
    fields: {
        username: string,
        password: string,

        passwordRepeat: string

        name: string
        surname: string
    }
}> {
    constructor(props: never)
    {
        super(props);

        this.state = {
            screenState: EnumLoginScreenState.LOGIN_DEFAULT,
            fields: {
                username: "",
                password: "",

                passwordRepeat: "",
                name: "",
                surname: ""
            }
        };
    }

    toggleRegister = (): void => {
        switch (this.state.screenState)
        {
            case EnumLoginScreenState.LOGIN_DEFAULT:
                this.setState({
                    screenState: EnumLoginScreenState.REGISTER_DEFAULT,
                    errorText: ""
                });
                break;

            case EnumLoginScreenState.REGISTER_DEFAULT:
                this.setState({
                    screenState: EnumLoginScreenState.LOGIN_DEFAULT,
                    errorText: ""
                });
                break;

            default:
                break;
        }
    }

    register = (): void => {
        const passwordsMatch: boolean = this.state.fields.password === this.state.fields.passwordRepeat;

        if (!passwordsMatch)
            return;

        this.setState({
            screenState: EnumLoginScreenState.REGISTER_WAITING,
            errorText: ""
        });

        let success = false;

        setTimeout(() => {
            Axios({
                url: "/users/register",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                data: {
                    username: this.state.fields.username,
                    password: this.state.fields.password,
                    name: this.state.fields.name,
                    surname: this.state.fields.surname
                }
            }).then((response) => {
                const apiResponse = response.data as IAPIResponse;

                switch (apiResponse.code)
                {
                    case 201:
                    {
                        success = true;
                        break;
                    }

                    default:
                        this.setState(() => ({
                            errorText: `Chyba: ${(apiResponse as IAPIReadableResponse).humanReadableMessage}`
                        }));
                }
            }).catch(() => {
                this.setState(() => ({
                    errorText: "Došlo k chybě při registraci, zkuste to prosím znovu později."
                }));
            }).then(() => {
                if (success)
                    this.login();
                else
                    this.setState({
                        screenState: EnumLoginScreenState.REGISTER_DEFAULT
                    });
            });
        }, 500);
    }

    login = (): void => {
        this.setState({
            screenState: EnumLoginScreenState.LOGIN_WAITING,
            errorText: ""
        });

        setTimeout(() => {
            let loggedIn = false;

            Axios({
                url: "/users/login",
                method: "POST",
                data: {
                    username: this.state.fields.username,
                    password: this.state.fields.password
                }
            }).then((response) => {
                const apiResponse = response.data as IAPIResponse;

                switch (apiResponse.code)
                {
                    case 200:
                    {
                        const responseData = apiResponse as ILoginData;
                        this.props.dispatch(new LoginAction(responseData));
                        loggedIn = true;

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
            }).then(() => {
                if (!loggedIn)
                {
                    this.setState({
                        screenState: EnumLoginScreenState.LOGIN_DEFAULT
                    });
                }
            });
        }, 500);
    }

    render(): ReactNode
    {
        let content: ReactNode;

        switch (this.state.screenState)
        {
            case EnumLoginScreenState.LOGIN_DEFAULT:
            case EnumLoginScreenState.LOGIN_WAITING:
            {
                const fieldsDisabled: boolean = this.state.screenState === EnumLoginScreenState.LOGIN_WAITING;

                content = (
                    <HForm onSubmit={ this.login }>
                        <HFlow>
                            <HBox>
                                <HInput readOnly={ fieldsDisabled } fieldInfo={ this.managedField("username") } required={ true } label={ "Uživatelské jméno" } type={ "text" }/>
                                <HInput readOnly={ fieldsDisabled } fieldInfo={ this.managedField("password") } required={ true } label={ "Heslo" } type={ "password" } />
                            </HBox>
                        </HFlow>
                        <div className={ "login-error-text-container" }>
                            <span style={{ visibility: this.state.errorText ? "visible" : "hidden" }} className={ "login-error-text" }>
                                { this.state.errorText }
                            </span>
                        </div>
                        <HFlow right={ true }>
                            <HButton action={ this.toggleRegister } buttonStyle={ HButtonStyle.TEXT } disabled={ this.state.screenState == EnumLoginScreenState.LOGIN_WAITING }>
                                Vytvořit účet
                            </HButton>
                            <HButton action={ "submit" } disabled={ this.state.screenState == EnumLoginScreenState.LOGIN_WAITING } buttonStyle={ HButtonStyle.TEXT_INVERTED }>
                                Přihlásit
                            </HButton>
                        </HFlow>
                    </HForm>
                );
                break;
            }

            case EnumLoginScreenState.REGISTER_DEFAULT:
            case EnumLoginScreenState.REGISTER_WAITING:
            {
                const passwordsMatch: boolean = this.state.fields.password === this.state.fields.passwordRepeat || !this.state.fields.passwordRepeat;
                const fieldsDisabled: boolean = this.state.screenState === EnumLoginScreenState.REGISTER_WAITING;

                content = (
                    <HForm onSubmit={ this.register }>
                        <HFlow>
                            <VBox>
                                <HHeader>
                                    Registrace
                                </HHeader>
                                <HInput readOnly={ fieldsDisabled } pattern={ "[a-zA-Z0-9]+[a-zA-Z0-9-.]+[a-zA-Z0-9]+" } minLength={ 3 } maxLength={ 24 } fieldInfo={ this.managedField("username") } required={ true } label={ "Uživatelské jméno" } type={ "text" }/>
                                <HGrid>
                                    <HInput readOnly={ fieldsDisabled } minLength={ 6 } maxLength={ 64 } fieldInfo={ this.managedField("password") } required={ true } label={ "Heslo" } type={ "password" } />
                                    <HInput readOnly={ fieldsDisabled } minLength={ 6 } maxLength={ 64 } fieldInfo={ this.managedField("passwordRepeat") } required={ true } label={ "Zopakujte  heslo" } type={ "password" } />
                                    <HInput readOnly={ fieldsDisabled } pattern={ "[^@#<>\"\\\\/]+" } maxLength={ 40 } fieldInfo={ this.managedField("name") } required={ true } label={ "Jméno" } type={ "text" } />
                                    <HInput readOnly={ fieldsDisabled } pattern={ "[^@#<>\"\\\\/]+" } maxLength={ 40 } fieldInfo={ this.managedField("surname") } required={ true } label={ "Příjmení" } type={ "text" } />
                                </HGrid>
                            </VBox>
                        </HFlow>
                        <div className={ "login-error-text-container" }>
                            <span style={{ visibility: !passwordsMatch || this.state.errorText ? "visible" : "hidden" }} className={ "login-error-text" }>
                                { passwordsMatch ? this.state.errorText : "Zadaná hesla neodpovídají." }
                            </span>
                        </div>
                        <HFlow right={ true }>
                            <HButton action={ this.toggleRegister } buttonStyle={ HButtonStyle.TEXT } disabled={ fieldsDisabled }>
                                Místo toho se přihlásit
                            </HButton>
                            <HButton action={ "submit" } disabled={ fieldsDisabled } buttonStyle={ HButtonStyle.TEXT_INVERTED }>
                                Registrovat
                            </HButton>
                        </HFlow>
                    </HForm>
                );
                break;
            }
        }


        return (
            <div id={ "login-screen-wrapper" }>
                <HCard>
                    <div id={ "login-card-content" }>
                        <img src={ loginImg } alt={ "Informační systém HospITU" } />
                        { content }
                    </div>
                </HCard>
            </div>
        );
    }
}