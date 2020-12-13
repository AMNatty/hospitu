import { HView, ISectionProps } from "../HView";
import React, { ReactNode } from "react";
import { HForm, HFormComponent } from "../../HForm";
import { IUserData, RoleToNameMap } from "../../../data/UserData";
import { HFlow, HInput } from "../../HInput";

import { HCard, HGrid, HHeader, HSubHeader, VBox } from "../../HCard";
import { HButton, HButtonStyle } from "../../HButton";
import Axios from "axios";
import {IAPIResponse, ILoginData} from "../../../data/UserData";
import "../../../style/adminDelete.less";

class AdminDelete extends HFormComponent<{
    loginData: ILoginData
}, {
    editMode: boolean,
    fields: {
        ptch_id: string,
        ptch_dr_id: string,
        nahradni_dr_id: string,
        dr_name: string,
        dr_surname: string,
        pohlavi: string,
        pojistovna: string,

        us_id: string,
        us_login: string,
        us_perms: string,
        us_surname: string
    }
}>
{
    constructor(props: never)
    {
        super(props);

        this.state = {
            editMode: false,
            fields: {
                ptch_id: "",
                pohlavi: "",
                pojistovna: "",
                ptch_dr_id: "",
                nahradni_dr_id: "",
                dr_name: "",
                dr_surname: "",
                us_id: "",
                us_login: "",
                us_perms: "",
                us_surname: ""
            }
        };
    }

    AdminChange1 = (): boolean => {

        Axios({
            url: "/admin/deleted",
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

                case 404:
                    break;

                default:

            }
        }).catch((e) => {
            console.log(e);
        });

        return false;
    }

    AdminChange2 = (): boolean => {

        Axios({
            url: "/admin/deletep",
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

                case 404:
                    break;

                default:

            }
        }).catch((e) => {
            console.log(e);
        });

        return false;
    }

    AdminChange3 = (): boolean => {

        Axios({
            url: "/admin/deletepac",
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

                case 404:
                    break;

                default:

            }
        }).catch((e) => {
            console.log(e);
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
                                    <table id="tab1">
                                        <header id="header1">
                                            Odstranit doktora
                                        </header>
                                        <HGrid shrink={ true }>
                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                <div>
                                                    <HInput fieldInfo={ this.managedField("ptch_id") } required={ true } label={ "Číslo spisu" } type={ "Číslo spisu" }/>
                                                    <HInput fieldInfo={ this.managedField("ptch_dr_id") } required={ true } label={ "Číslo doktora" } type={ "Číslo doktora"} />
                                                    <HInput fieldInfo={ this.managedField("dr_name") } required={ true } label={ "Jméno doktora" } type={ "Číslo doktora"} />
                                                    <HInput fieldInfo={ this.managedField("dr_surname") } required={ true } label={ "Příjmení doktora" } type={ "Číslo doktora"} />
                                                    <HInput fieldInfo={ this.managedField("nahradni_dr_id") } required={ true } label={ "Číslo nahrady" } type={ "Číslo nahrady"} />

                                                </div>
                                            </div>
                                            <div style={{ float: "right", padding: "10px" }}>
                                                <HButton action={ this.AdminChange1 } buttonStyle={ HButtonStyle.TEXT_INVERTED }>
                                                    Smazat
                                                </HButton>
                                            </div>
                                        </HGrid>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div key={ this.state.editMode ? 1 : 0 } onSubmit={ this.updateProfile }>
                            <div>
                                <div>
                                    <HFlow>
                                        <table id="tab2">
                                            <header id="header2">
                                                Odstranit pojišťováka
                                            </header>
                                            <HGrid shrink={ true }>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <HInput fieldInfo={ this.managedField("us_id") } required={ true } label={ "Číslo agenta" } type={ "Číslo pacienta" }/>
                                                    <HInput fieldInfo={ this.managedField("us_login") } required={ true } label={ "Login" } type={ "Stav"} />
                                                    <HInput fieldInfo={ this.managedField("us_surname") } required={ true } label={ "Příjmení" } type={ "Pohlaví" }/>
                                                    <HInput fieldInfo={ this.managedField("pojistovna") } required={ true } label={ "Číslo pojišťovny" } type={ "Pohlaví" }/>
                                                </div>
                                                <div style={{ float: "right", padding: "10px" }}>
                                                    <HButton action={ this.AdminChange2 } buttonStyle={ HButtonStyle.TEXT_INVERTED }>
                                                        Smazat
                                                    </HButton>
                                                </div>
                                            </HGrid>
                                        </table>
                                    </HFlow>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div key={ this.state.editMode ? 1 : 0 } onSubmit={ this.updateProfile }>
                            <div>
                                <div>
                                    <HFlow>
                                        <table id="tab2">
                                            <header id="header2">
                                                Odstranit pacienta
                                            </header>
                                            <HGrid shrink={ true }>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <HInput fieldInfo={ this.managedField("us_id") } required={ true } label={ "Číslo agenta" } type={ "Číslo pacienta" }/>
                                                    <HInput fieldInfo={ this.managedField("us_login") } required={ true } label={ "Login" } type={ "Stav"} />
                                                    <HInput fieldInfo={ this.managedField("us_surname") } required={ true } label={ "Příjmení" } type={ "Pohlaví" }/>
                                                    <HInput fieldInfo={ this.managedField("pohlavi") } required={ true } label={ "Pohlavi" } type={ "Pohlaví" }/>
                                                </div>
                                                <div style={{ float: "right", padding: "10px" }}>
                                                    <HButton action={ this.AdminChange3 } buttonStyle={ HButtonStyle.TEXT_INVERTED }>
                                                        Smazat
                                                    </HButton>
                                                </div>
                                            </HGrid>
                                        </table>
                                    </HFlow>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export class adminekDeleteDocPat<T extends ISectionProps> extends HView<T> {
    constructor(props: T)
    {
        super(props);
    }

    render(): ReactNode
    {
        return (
            <AdminDelete loginData={this.props.loginData}/>
        );
    }
}
