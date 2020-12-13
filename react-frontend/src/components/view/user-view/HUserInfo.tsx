import { HView, ISectionProps } from "../HView";
import React, { ReactNode } from "react";
import { HForm, HFormComponent } from "../../HForm";
import {
    IAPIReadableResponse,
    IAPIResponse,
    IExtendedUserData,
    ILoginData,
    IUserData,
    RoleToNameMap
} from "../../../data/UserData";
import { HFlow, HInput } from "../../HInput";
import { HCard, HGrid, HHeader, HSubHeader, VBox } from "../../HCard";
import { HButton, HButtonStyle } from "../../HButton";
import { Dispatch } from "redux";
import Axios from "axios";
import { EnumInternalState } from "../../../data/AppState";
import { UpdateManagedUserAction, UpdateSelfUserAction } from "../../../data/AppAction";

interface HUserProfileProps
{
    user?: IUserData;
    userData?: IExtendedUserData;
    editor: ILoginData;
    editAllowed?: boolean;
    dispatch: Dispatch;
}

class HUserProfile extends HFormComponent<HUserProfileProps, {
    yourProfile: boolean,
    loaded: number,
    editMode: boolean,
    fields: {
        id: string,
        login: string,
        name: string,
        surname: string,
        role: string,

        birthDate: string,
        birthID: string,
        email: string,
        phone: string
    },
    errorText?: string
}>
{
    constructor(props: HUserProfileProps)
    {
        super(props);

        if (this.props.userData)
        {
            this.state = {
                yourProfile: this.props.userData.id === this.props.editor.id,
                loaded: 0,
                editMode: false,
                fields: {
                    ...this.props.userData,
                    role: RoleToNameMap[this.props.userData.role],
                    id: this.props.userData.id.toString()
                }
            };
        }
        else
        {
            this.state = {
                yourProfile: this.props.user ? (this.props.user.id === this.props.editor.id) : true,
                loaded: 0,
                editMode: false,
                fields: {
                    id: "",
                    login: "",
                    name: "",
                    surname: "",
                    role: "",

                    birthDate: "",
                    birthID: "",
                    email: "",
                    phone: ""
                }
            };
        }
    }

    componentDidMount()
    {
        if (!this.props.userData)
        {
            this.retrieveData(this.props.user ? this.props.user : this.props.editor);
        }
    }

    retrieveData = (user: IUserData): void => {
        this.setState({
            errorText: ""
        });

        const uid = user.id === this.props.editor.id ? "@self" : user.id;

        Axios.get(`/users/${uid}/profile-detail`,
            {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer " + this.props.editor.token
                }
            }
        ).then((response) => {
            const apiResponse = response.data as IAPIResponse;

            switch (apiResponse.code)
            {
                case 200:
                {
                    const results = apiResponse as IExtendedUserData;
                    this.setState(state => ({
                        loaded: state.loaded + 1,
                        fields: {
                            ...results,
                            role: RoleToNameMap[results.role],
                            id: results.id.toString()
                        }
                    }));
                    break;
                }

                default:
                    if ((apiResponse as IAPIReadableResponse).humanReadableMessage)
                        this.setState(() => ({
                            errorText: `Chyba při vyhledávání: ${(apiResponse as IAPIReadableResponse).humanReadableMessage}`
                        }));
                    else
                        this.setState(() => ({
                            errorText: "Došlo k chybě při vyhledávání, prosím zkuste to znovu později."
                        }));
            }
        }).catch(() => {
            this.setState(() => ({
                errorText: "Došlo k chybě při vyhledávání, prosím zkuste to znovu později."
            }));
        });
    }

    toggleProfileEdit = (): void => {
        this.setState(state => ({
            editMode: !state.editMode
        }));
    }

    updateProfile = (): void => {
        this.setState({
            errorText: ""
        });

        const inputID = parseInt(this.state.fields.id);
        const uid = inputID === this.props.editor.id ? "@self" : inputID;

        Axios({
            url: `/users/${ uid }/profile-update`,
            method: "PATCH",
            data: {
                "name": this.state.fields.name,
                "surname": this.state.fields.surname,
                "birthDate": this.state.fields.birthDate,
                "birthID": this.state.fields.birthID,
                "email": this.state.fields.email,
                "phone": this.state.fields.phone,
            },
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + this.props.editor.token
            }
        }).then((response) => {
            const apiResponse = response.data as IAPIResponse;

            switch (apiResponse.code)
            {
                case 200:
                    this.setState({
                        editMode: false
                    });

                    if (this.state.yourProfile)
                    {
                        this.props.dispatch(new UpdateSelfUserAction({
                            ...this.state.fields,
                            id: this.props.editor.id,
                            role: this.props.editor.role
                        }));
                    }
                    else
                    {
                        const userData = this.props.userData ?? (this.props.user as IUserData);
                        this.props.dispatch(new UpdateManagedUserAction({
                            ...this.state.fields,
                            id: userData.id,
                            role: userData.role
                        }));
                    }
                    break;

                default:
                    if ((apiResponse as IAPIReadableResponse).humanReadableMessage)
                        this.setState(() => ({
                            errorText: `Chyba při vyhledávání: ${(apiResponse as IAPIReadableResponse).humanReadableMessage}`
                        }));
                    else
                        this.setState(() => ({
                            errorText: "Došlo k chybě při ukládání profilu, prosím zkuste to znovu později."
                        }));
            }
        }).catch(() => {
            this.setState(() => ({
                errorText: "Došlo k chybě při ukládání profilu, prosím zkuste to znovu později."
            }));
        });
    }

    render()
    {
        return (
            <HCard>
                <HForm key={ this.state.loaded + (this.state.editMode ? 1 : 0) } onSubmit={ this.updateProfile }>
                    <VBox>
                        <VBox>
                            <HHeader>
                                <HFlow>
                                    { this.state.yourProfile ? "Váš profil" : `Profil uživatele ${ this.state.fields.name } ${ this.state.fields.surname }` }
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
                                        <HInput label={ "Datum narození" } required={ true } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("birthDate") } type={ "date" } />
                                        <HInput label={ "Rodné číslo" } required={ true } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("birthID") } />
                                    </HGrid>
                                </VBox>
                            </HFlow>
                            <HFlow>
                                <span style={{ color: "red" }}>
                                    { this.state.errorText }
                                </span>
                            </HFlow>
                        </VBox>
                        {
                            this.props.editAllowed ? (
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
                            ) : null
                        }
                    </VBox>
                </HForm>
            </HCard>
        );
    }
}

export class HSelfProfileView<T extends ISectionProps> extends HView<T> {
    constructor(props: T)
    {
        super(props);
    }

    render(): ReactNode
    {
        return (
            <HUserProfile user={ this.props.loginData } dispatch={ this.props.dispatch } editor={ this.props.loginData } editAllowed={ true } />
        );
    }
}

export class HOtherProfileView<T extends ISectionProps> extends HView<T> {
    constructor(props: T)
    {
        super(props);
    }

    requiresUserManagement = (): boolean => true;

    render(): ReactNode
    {
        if (this.props.managedUser)
        {
            const allowEdits = (this.props.sectionState.internalState === EnumInternalState.ADMIN_PANEL) || (this.props.loginData.id === this.props.managedUser?.id);
            return (
                <HUserProfile userData={ this.props.managedUser } dispatch={ this.props.dispatch }
                    editor={ this.props.loginData } editAllowed={ allowEdits } />
            );
        }
        else
        {
            return (
                <HHeader>
                    Pro zobrazení informací prosím nejdříve vyberte uživatele.
                </HHeader>
            );
        }
    }
}
