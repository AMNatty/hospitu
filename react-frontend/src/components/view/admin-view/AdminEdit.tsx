import { HView, ISectionProps } from "../HView";
import React, { ReactNode } from "react";
import { HForm, HFormComponent } from "../../HForm";
import { IUserData, RoleToNameMap } from "../../../data/UserData";
import { HFlow, HInput } from "../../HInput";

import { HCard, HGrid, HHeader, HSubHeader, VBox } from "../../HCard";
import { HButton, HButtonStyle } from "../../HButton";
import Axios from "axios";
import {IAPIResponse, ILoginData} from "../../../data/UserData";

class AdminEdit extends HFormComponent<{
    loginData: ILoginData
}, {
    editMode: boolean,
    fields: {
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
                us_id: "",
                us_name: "",
                us_surname: "",
                us_login: "",
                us_perms: ""
            }
        };
    }

    AdminChange = (): boolean => {

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
            <HCard>
                <HForm key={ this.state.editMode ? 1 : 0 } onSubmit={ this.updateProfile }>
                    <VBox>
                        <VBox>
                            <HHeader>
                                <HFlow>
                                    Váš profil
                                </HFlow>
                            </HHeader>
                            <HFlow>
                                <VBox>
                                    <HSubHeader>
                                        Základní údaje
                                    </HSubHeader>
                                    <HGrid shrink={ true }>
                                        <HInput label={ "Číslo uživatele" } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("us_id") } />
                                        <HInput label={ "Jméno" } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("us_name") } />
                                        <HInput label={ "Příjmení" } required={ true } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("us_surname") } />
                                        <HInput label={ "Uživatelské jméno" } required={ true } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("us_login") } />
                                        <HInput label={ "Typ účtu" } required={ true } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("us_perms") } />
                                    </HGrid>
                                </VBox>
                            </HFlow>
                        </VBox>
                        <HFlow right={ true }>
                            <span style={{ visibility: (this.state.editMode ? "visible" : "hidden") }}>
                                <HButton buttonStyle={ HButtonStyle.TEXT } action={ "reset" } action2={ this.toggleProfileEdit }>
                                    Zrušit změny
                                </HButton>
                            </span>
                            <HButton buttonStyle={ HButtonStyle.TEXT_INVERTED } action={ this.state.editMode ? "submit" : this.toggleProfileEdit }>
                                { this.state.editMode ? "Uložit změny" : "Upravit profil" }
                            </HButton>
                        </HFlow>
                    </VBox>
                </HForm>
            </HCard>
        );
    }
}

export class AdminekAdd<T extends ISectionProps> extends HView<T> {
    constructor(props: T)
    {
        super(props);
    }

    render(): ReactNode
    {
        return (
            <AdminEdit  loginData={this.props.loginData}/>
        );
    }
}
