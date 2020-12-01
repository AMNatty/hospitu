import { HView, ISectionProps } from "../HView";
import React, { ReactNode } from "react";
import { HForm, HFormComponent } from "../../HForm";
import { IUserData, RoleToNameMap } from "../../../data/UserData";
import { HFlow, HInput } from "../../HInput";

import { HCard, HGrid, HHeader, HSubHeader, VBox } from "../../HCard";
import { HButton, HButtonStyle } from "../../HButton";
import Axios from "axios";
import {IAPIResponse, ILoginData} from "../../../data/UserData";

class AdminDeleteDoctor extends HFormComponent<{
    loginData: ILoginData
}, {
    editMode: boolean,
    fields: {
        ptch_id: string,
        ptch_dr_id: string
        nahradni_dr_id: string

        us_id: string,
        us_name: string,
        us_surname: string,
        us_login: string,
        us_perms: string
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
                ptch_dr_id: "",
                nahradni_dr_id: "",
                us_id: "",
                us_name: "",
                us_surname: "",
                us_login: "",
                us_perms: ""
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
                    <HCard>
                        <HForm key={ this.state.editMode ? 1 : 0 } onSubmit={ this.updateProfile }>
                            <VBox>
                                <VBox>
                                    <HHeader>
                                        <HFlow>

                                        </HFlow>
                                    </HHeader>
                                    <HFlow>
                                        <VBox>
                                            <HSubHeader>
                                                Aktualizovat uživatele
                                            </HSubHeader>
                                            <HGrid shrink={ true }>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <HInput fieldInfo={ this.managedField("us_id") } required={ true } label={ "Číslo uživatele" } type={ "Číslo spisu" }/>
                                                    <HInput fieldInfo={ this.managedField("us_name") } required={ true } label={ "Jméno" } type={ "Číslo doktora"} />
                                                    <HInput fieldInfo={ this.managedField("us_surname") } required={ true } label={ "Příjmení" } type={ "Číslo nahrady"} />
                                                    <HInput fieldInfo={ this.managedField("us_login") } required={ true } label={ "Uživatelské jméno" } type={ "Číslo spisu" }/>
                                                    <HInput fieldInfo={ this.managedField("us_perms") } required={ true } label={ "Typ účtu" } type={ "Číslo doktora"} />
                                                </div>
                                                <div style={{ float: "right", padding: "10px" }}>
                                                    <HButton action={ this.AdminChange3 } buttonStyle={ HButtonStyle.TEXT_INVERTED }>
                                                        Aktualizovat
                                                    </HButton>
                                                </div>
                                            </HGrid>
                                        </VBox>
                                    </HFlow>
                                </VBox>
                            </VBox>
                        </HForm>
                    </HCard>
                </div>
                <div>
                    <HCard>
                        <HForm key={ this.state.editMode ? 1 : 0 } onSubmit={ this.updateProfile }>
                            <VBox>
                                <VBox>
                                    <HHeader>
                                        <HFlow>

                                        </HFlow>
                                    </HHeader>
                                    <HFlow>
                                        <VBox>
                                            <HSubHeader>
                                                Odstranit Doktora
                                            </HSubHeader>
                                            <HGrid shrink={ true }>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <HInput fieldInfo={ this.managedField("ptch_id") } required={ true } label={ "Číslo spisu" } type={ "Číslo spisu" }/>
                                                    <HInput fieldInfo={ this.managedField("ptch_dr_id") } required={ true } label={ "Číslo doktora" } type={ "Číslo doktora"} />
                                                    <HInput fieldInfo={ this.managedField("nahradni_dr_id") } required={ true } label={ "Číslo nahrady" } type={ "Číslo nahrady"} />
                                                </div>
                                                <div style={{ float: "right", padding: "10px" }}>
                                                    <HButton action={ this.AdminChange1 } buttonStyle={ HButtonStyle.TEXT_INVERTED }>
                                                        Smazat
                                                    </HButton>
                                                </div>
                                            </HGrid>
                                        </VBox>
                                    </HFlow>
                                </VBox>
                            </VBox>
                        </HForm>
                    </HCard>
                </div>
                <div>
                    <HCard>
                        <HForm key={ this.state.editMode ? 1 : 0 } onSubmit={ this.updateProfile }>
                            <VBox>
                                <VBox>
                                    <HHeader>
                                        <HFlow>

                                        </HFlow>
                                    </HHeader>
                                    <HFlow>
                                        <VBox>
                                            <HSubHeader>
                                                Odstranit pacienta
                                            </HSubHeader>
                                            <HGrid shrink={ true }>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <HInput fieldInfo={ this.managedField("us_id") } required={ true } label={ "Číslo uživatele" } type={ "Číslo pacienta" }/>
                                                    <HInput fieldInfo={ this.managedField("us_name") } required={ true } label={ "Jméno" } type={ "Číslo praktického lékaře"} />
                                                    <HInput fieldInfo={ this.managedField("us_surname") } required={ true } label={ "Příjmení" } type={ "Alergeny" }/>
                                                    <HInput fieldInfo={ this.managedField("us_login") } required={ true } label={ "Login" } type={ "Stav"} />
                                                    <HInput fieldInfo={ this.managedField("us_perms") } required={ true } label={ "Role" } type={ "Pohlaví" }/>
                                                </div>
                                                <div style={{ float: "right", padding: "10px" }}>
                                                    <HButton action={ this.AdminChange2 } buttonStyle={ HButtonStyle.TEXT_INVERTED }>
                                                        Smazat
                                                    </HButton>
                                                </div>
                                            </HGrid>
                                        </VBox>
                                    </HFlow>
                                </VBox>
                            </VBox>
                        </HForm>
                    </HCard>
                </div>
            </div>

        );
    }
}

export class adminekDeleteDoctor<T extends ISectionProps> extends HView<T> {
    constructor(props: T)
    {
        super(props);
    }

    render(): ReactNode
    {
        return (
            <AdminDeleteDoctor  loginData={this.props.loginData}/>
        );
    }
}
