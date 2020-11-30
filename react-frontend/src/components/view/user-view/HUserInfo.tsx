import { HView, ISectionProps } from "../HView";
import React, { ReactNode } from "react";
import { HForm, HFormComponent } from "../../HForm";
import { IUserData, RoleToNameMap } from "../../../data/UserData";
import { HFlow, HInput } from "../../HInput";
import { HCard, HGrid, HHeader, HSubHeader, VBox } from "../../HCard";
import { HButton, HButtonStyle } from "../../HButton";

class HUserProfile extends HFormComponent<{
    userData: IUserData
}, {
    editMode: boolean,
    fields: {
        id: string,
        login: string,
        name: string,
        surname: string,
        role: string,

        phone: string,
        email: string,
        birthdate: string,
        birthID: string
    }
}>
{
    constructor(props: { userData: IUserData })
    {
        super(props);

        this.state = {
            editMode: false,
            fields: {
                ...props.userData,
                role: RoleToNameMap[props.userData.role],
                id: props.userData.id.toString(),

                phone: "",
                email: "",
                birthdate: "",
                birthID: ""
            }
        };
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
                                        <HInput label={ "Přihlašovací jméno" } readOnly={ true } fieldInfo={ this.managedField("login") } />
                                        <HInput label={ "Číslo uživatele" } readOnly={ true } fieldInfo={ this.managedField("id") } />
                                        <HInput label={ "Jméno" } required={ true } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("name") } />
                                        <HInput label={ "Příjmení" } required={ true } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("surname") } />
                                        <HInput label={ "Typ účtu" } required={ true } readOnly={ true } fieldInfo={ this.managedField("role") } />
                                    </HGrid>
                                </VBox>
                                <VBox>
                                    <HSubHeader>
                                        Osobní údaje
                                    </HSubHeader>
                                    <HGrid shrink={ true }>
                                        <HInput label={ "Telefon" } required={ true } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("phone") } type={ "phone" } />
                                        <HInput label={ "E-mail" } required={ true } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("email") } type={ "email" } />
                                        <HInput label={ "Datum narození" } required={ true } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("birthdate") } type={ "date" } />
                                        <HInput label={ "Rodné číslo" } required={ true } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("birthID") } />
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

export class HProfileView<T extends ISectionProps> extends HView<T> {
    constructor(props: T)
    {
        super(props);
    }

    render(): ReactNode
    {
        return (
            <HUserProfile userData={ this.props.loginData } />
        );
    }
}
