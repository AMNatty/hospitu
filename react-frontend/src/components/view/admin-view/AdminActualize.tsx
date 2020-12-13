import { HView, ISectionProps } from "../HView";
import React, { ReactNode } from "react";
import { HForm, HFormComponent } from "../../HForm";
import { IUserData, RoleToNameMap } from "../../../data/UserData";
import { HFlow, HInput } from "../../HInput";

import { HCard, HGrid, HHeader, HSubHeader, VBox } from "../../HCard";
import { HButton, HButtonStyle } from "../../HButton";
import Axios from "axios";
import {IAPIResponse, ILoginData} from "../../../data/UserData";
import "../../../style/adminActualize.less";

class AdminActualize extends HFormComponent<{
    loginData: ILoginData
}, {
    editMode: boolean,
    fields: {
        zacatek_sluzby: string,
        konec_sluzby: string,
        us_id: string,
        us_name: string,
        us_surname: string,
        us_login: string,
        pojistovna: string,
        cislo_agenta: string,
        oddeleni: string,
        us_perms: string
    },
    errorText?: string,
    error1Text?: string
}>
{
    constructor(props: never)
    {
        super(props);

        this.state = {
            editMode: false,
            fields: {
                zacatek_sluzby: "",
                konec_sluzby: "",
                oddeleni: "",
                us_id: "",
                us_name: "",
                pojistovna: "",
                cislo_agenta: "",
                us_surname: "",
                us_login: "",
                us_perms: ""
            }
        };
    }

    AdminChange3 = (): boolean => {

        Axios({
            url: "/admin/change",
            headers: {
                Authorization: "Bearer " + this.props.loginData.token
            },
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
                    const responseData = apiResponse;
                    break;
                }

                case 404: {
                    this.setState(() => ({
                        error1Text: "Doslo k chybe pri editu, doktor nenalezen"
                    }));
                    break;
                }
                case 500: {
                    this.setState(() => ({
                        error1Text: "Doslo k chybe, nalezeno nevyplnene pole nebo uzivatel s touto roli jiz existuje"
                    }));
                    break;
                }


                default:

            }
        }).catch((e) => {
            console.log(e);
        });

        return false;
    }

    AdminChange2 = (): boolean => {
        this.setState({
            errorText: ""
        });
        Axios({
            url: "/admin/changep",
            headers: {
                Authorization: "Bearer " + this.props.loginData.token
            },
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
                    const responseData = apiResponse;
                    break;
                }

                case 404: {
                    this.setState(() => ({
                        errorText: "Doslo k chybe pri editu, pojistovak nenalezen"
                    }));
                    break;
                }
                case 500: {
                    this.setState(() => ({
                        errorText: "Doslo k chybe, nalezeno nevyplnene pole nebo uzivatel s touto roli jiz existuje"
                    }));
                    break;
                }


                default:

            }
        }).catch((e) => {
            console.log(e);
            this.setState(() => ({
                errorText: "Doslo k chybe pri editu pojistovaka"
            }));
        });

        return false;
    }


    toggleProfileEdit = (): void => {
        this.setState(state => ({
            editMode: !state.editMode
        }));
    }

    updateProfile = (): void => {
        // TODO

        this.setState({
            editMode: false
        });
    }

    render()
    {
        return (
            <div>
                <div>
                    <div>
                        <div key={ this.state.editMode ? 1 : 0 } onSubmit={ this.updateProfile }>
                            <div>
                                <div>
                                    <div>
                                        <table id="tab">
                                            <header id="header">
                                                Aktualizovat roli Doktora
                                            </header>
                                            <HGrid shrink={ true }>
                                                <div>
                                                    <HInput fieldInfo={ this.managedField("us_id") } required={ true } label={ "Číslo uživatele" } type={ "Číslo spisu" }/>
                                                    <HInput fieldInfo={ this.managedField("us_name") } required={ true } label={ "Jméno" } type={ "Číslo doktora"} />
                                                    <HInput fieldInfo={ this.managedField("us_surname") } required={ true } label={ "Příjmení" } type={ "Číslo nahrady"} />
                                                    <br/>
                                                    <HInput fieldInfo={ this.managedField("us_login") } required={ true } label={ "Uživatelské jméno" } type={ "Číslo spisu" }/>
                                                    <HInput fieldInfo={ this.managedField("us_perms") } required={ true } label={ "Typ účtu" } type={ "Číslo doktora"} />
                                                    <HInput fieldInfo={ this.managedField("zacatek_sluzby") } required={ true } label={ "Začátek služby" } type={ "Číslo nahrady"} />
                                                    <br/>
                                                    <HInput fieldInfo={ this.managedField("konec_sluzby") } required={ true } label={ "Konec služby" } type={ "Číslo nahrady"} />
                                                    <HInput fieldInfo={ this.managedField("oddeleni") } required={ true } label={ "Oddělení" } type={ "Číslo nahrady"} />
                                                    <div className={ "login-error-text-container" }>
                                                        <span style={{ visibility: this.state.error1Text ? "visible" : "hidden" }} className={ "login-error-text" }>
                                                            { this.state.error1Text }
                                                        </span>
                                                    </div>
                                                    <div id="tlacitko1">
                                                        <HButton action={ this.AdminChange3 } buttonStyle={ HButtonStyle.TEXT_INVERTED }>
                                                            Aktualizovat roli
                                                        </HButton>
                                                    </div>
                                                </div>
                                            </HGrid>
                                        </table>
                                    </div>
                                    <div>
                                        <table id="tab">
                                            <header id="header">
                                                Aktualizovat roli Pojišťováka
                                            </header>
                                            <HGrid shrink={ true }>
                                                <div>
                                                    <HInput fieldInfo={ this.managedField("us_name") } required={ true } label={ "Jméno" } type={ "Číslo doktora"} />
                                                    <HInput fieldInfo={ this.managedField("us_surname") } required={ true } label={ "Příjmení" } type={ "Číslo nahrady"} />
                                                    <HInput fieldInfo={ this.managedField("us_login") } required={ true } label={ "Uživatelské jméno" } type={ "Číslo spisu" }/>
                                                    <br/>
                                                    <HInput fieldInfo={ this.managedField("us_perms") } required={ true } label={ "Typ účtu" } type={ "Číslo doktora"} />
                                                    <HInput fieldInfo={ this.managedField("pojistovna") } required={ true } label={ "Pojisťovna" } type={ "Číslo doktora"} />
                                                    <HInput fieldInfo={ this.managedField("cislo_agenta") } required={ true } label={ "Číslo agenta" } type={ "Číslo doktora"} />
                                                    <div className={ "login-error-text-container" }>
                                                        <span style={{ visibility: this.state.errorText ? "visible" : "hidden" }} className={ "login-error-text" }>
                                                            { this.state.errorText }
                                                        </span>
                                                    </div>
                                                    <div id="tlacitko2">
                                                        <HButton action={ this.AdminChange2 } buttonStyle={ HButtonStyle.TEXT_INVERTED }>
                                                            Aktualizovat roli
                                                        </HButton>
                                                    </div>
                                                </div>
                                            </HGrid>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export class adminekActualize<T extends ISectionProps> extends HView<T> {
    constructor(props: T)
    {
        super(props);
    }

    render(): ReactNode
    {
        return (
            <AdminActualize loginData={this.props.loginData}/>
        );
    }
}
