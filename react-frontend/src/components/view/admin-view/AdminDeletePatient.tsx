import { HView, ISectionProps } from "../HView";
import React, { ReactNode } from "react";
import { HForm, HFormComponent } from "../../HForm";
import { IUserData, RoleToNameMap } from "../../../data/UserData";
import { HFlow, HInput } from "../../HInput";

import { HCard, HGrid, HHeader, HSubHeader, VBox } from "../../HCard";
import { HButton, HButtonStyle } from "../../HButton";
import Axios from "axios";
import {IAPIResponse, ILoginData} from "../../../data/UserData";

class AdminDeletePatient extends HFormComponent<{
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
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <HInput fieldInfo={ this.managedField("us_id") } required={ true } label={ "Číslo uživatele" } type={ "Číslo pacienta" }/>
                                            <HInput fieldInfo={ this.managedField("us_name") } required={ true } label={ "Jméno" } type={ "Číslo praktického lékaře"} />
                                            <HInput fieldInfo={ this.managedField("us_surname") } required={ true } label={ "Příjmení" } type={ "Alergeny" }/>
                                            <HInput fieldInfo={ this.managedField("us_login") } required={ true } label={ "Login" } type={ "Stav"} />
                                            <HInput fieldInfo={ this.managedField("us_perms") } required={ true } label={ "Role" } type={ "Pohlaví" }/>
                                        </div>
                                        <div style={{ float: "right", padding: "10px" }}>
                                            <HButton action={ this.AdminChange } buttonStyle={ HButtonStyle.TEXT_INVERTED }>
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
        );
    }
}

export class adminekDeletePatient<T extends ISectionProps> extends HView<T> {
    constructor(props: T)
    {
        super(props);
    }

    render(): ReactNode
    {
        return (
            <AdminDeletePatient  loginData={this.props.loginData}/>
        );
    }
}
