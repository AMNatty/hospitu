import React, { ChangeEvent, ReactNode } from "react";
import {
    EnumRole,
    IAPIReadableResponse,
    IAPIResponse,
    IExtendedUserData,
    ILoginData,
    IUserSearchExtended,
    IUserSearchResult,
    IUserSearchResultExtended,
    RoleToNameMap
} from "../data/UserData";
import Axios from "axios";
import { HBox, VBox } from "./HCard";
import { HButton, HButtonStyle } from "./HButton";

import "../style/h-userbox.less";

export class HUserSearchBox extends React.Component<{
    chooseUserCallback: ((result: IUserSearchResult | null) => void),
    viewUserCallback: ((result: IUserSearchResult) => void),
    loginData: ILoginData,
    managedUser?: IExtendedUserData,
    searchRole: EnumRole
},
{
    searchKey: number,
    errorText?: string,
    searchTimeout?: number,
    userSearch?: IUserSearchResultExtended[],
    searchString?: string
}> {
    constructor(props: never)
    {
        super(props);

        this.state = {
            searchKey: 0
        };
    }

    performSearch = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;

        if (typeof this.state.searchTimeout !== "undefined")
        {
            clearTimeout(this.state.searchTimeout);
        }

        this.setState(() => ({
            errorText: "",
            searchString: value
        }));

        if (value === "")
        {
            this.setState(() => ({
                userSearch: []
            }));

            return;
        }

        const timeout = window.setTimeout(() => {
            Axios.get("/users/search-detail",
                {
                    params: {
                        name: value,
                        role: this.props.searchRole === EnumRole.ADMIN ? null : EnumRole.PATIENT
                    },
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": "Bearer " + this.props.loginData.token
                    }
                }
            ).then((response) => {
                const apiResponse = response.data as IAPIResponse;

                switch (apiResponse.code)
                {
                    case 200:
                    {
                        const results = apiResponse as IUserSearchExtended;
                        this.setState(() => ({
                            userSearch: results.searchResults
                        }));
                        break;
                    }

                    default:
                        this.setState(() => ({
                            errorText: `Chyba při vyhledávání: ${(apiResponse as IAPIReadableResponse).humanReadableMessage}`
                        }));
                }
            }).catch(() => {
                this.setState(() => ({
                    errorText: "Došlo k chybě při vyhledávání, prosím zkuste to znovu později."
                }));
            });
        }, 350);

        this.setState({
            searchTimeout: timeout
        });
    }

    render(): ReactNode
    {
        let displayName: string | null = null;

        if (typeof this.props.managedUser !== "undefined")
        {
            if (this.props.managedUser.birthDate !== null)
            {
                displayName = `${this.props.managedUser.name} ${this.props.managedUser.surname}, narozen(a) ${this.props.managedUser.birthDate}`;
            }
            else
            {
                displayName = `${this.props.managedUser.name} ${this.props.managedUser.surname}`;
            }
        }

        return (
            <div id={ "hs-userbox" }>
                <div className={ "hs-userbox-spacer "} />
                <div className={ "hs-userbox-center "}>
                    <VBox>
                        <HBox>
                            <input key={ this.state.searchKey } type={ "text" }
                                defaultValue={ this.state.searchString } onClick={ event => {
                                    if (displayName !== null)
                                    {
                                        (event.target as HTMLInputElement).value = "";
                                    }
                                } } onChange={ this.performSearch } placeholder={
                                    displayName ?? "Vyberte uživatele..."
                                } />
                        </HBox>
                        {
                            this.state.errorText ? (
                                <div className={ "hs-userbox-error" }>
                                    { this.state.errorText }
                                </div>
                            ) : null
                        }
                        {
                            this.state.searchString ? (
                                <table className={ "hs-userbox-table" }>
                                    <colgroup>
                                        <col span={ 1 } className={ "hs-userbox-col-name" } />
                                        <col span={ 1 } className={ "hs-userbox-col-role" } />
                                        <col span={ 1 } className={ "hs-userbox-col-controls" } />
                                    </colgroup>
                                    <tbody>
                                        {
                                            this.state.userSearch?.map(result => (
                                                <tr className={ "hs-userbox-result" } key={ result.id }>
                                                    <td className={ "hs-userbox-result-name" }>
                                                        { result.name } { result.surname }
                                                    </td>
                                                    <td className={ "hs-userbox-result-role" }>
                                                        { this.props.searchRole === EnumRole.ADMIN ? RoleToNameMap[result.role] : result.birthDate }
                                                    </td>
                                                    <td className={ "hs-userbox-controls" }>
                                                        <HButton buttonStyle={ HButtonStyle.BORDER } action={ () => {
                                                            this.setState(state => ({
                                                                searchString: "",
                                                                searchKey: state.searchKey + 1
                                                            }));
                                                            this.props.viewUserCallback(result);
                                                        } }>
                                                            Zobrazit informace
                                                        </HButton>
                                                        <HButton buttonStyle={ HButtonStyle.TEXT_INVERTED } action={ () => {
                                                            this.setState(state => ({
                                                                searchString: "",
                                                                searchKey: state.searchKey + 1
                                                            }));
                                                            this.props.chooseUserCallback(result);
                                                        } }>
                                                            Vybrat
                                                        </HButton>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            ) : null
                        }
                    </VBox>
                </div>
                <div className={ "hs-userbox-spacer "} />
            </div>
        );
    }
}