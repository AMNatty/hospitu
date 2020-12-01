import React from "react";
import Axios from "axios";

import { Dispatch } from "redux";
import { IAPIResponse, ILoginData } from "../../../data/UserData";
import { TicketData } from "../../../data/doctor-data/TicketData";
import { FileData} from "../../../data/doctor-data/HFileData";
import { HFlow, HInput } from "../../HInput";
import { HForm, HFormComponent, HFieldInfo } from "../../HForm";
import { HCard, HGrid, HHeader, HSubHeader, VBox } from "../../HCard";
import { HButton, HButtonStyle } from "../../HButton";

import "../../../style/p-profile.less";
import "../../../style/healthFiles.less";

export class Ticket extends HFormComponent<{
    dispatch: Dispatch,
    loginData: ILoginData 
}, {
    ticketList: TicketData[],
    fileList: FileData[],
    editMode: boolean,
    editModeReport: boolean,
    fields: {
        cr_id: string,
        cr_name: string,
        cr_performed: string,
        cr_report: string,
        cr_price: string,
        ptch_name: string,
        us_name: string,
        us_surname: string,
        pt_allergies: string,
        pt_condition: string
    }
}> {
    constructor(props: never)
    {
        super(props);
        this.state = {
            ticketList:[],
            fileList: [],
            editMode: false,
            editModeReport: false,
            fields: {
                cr_id: "",
                cr_name: "",
                cr_performed: "",
                cr_report: "",
                cr_price: "",
                ptch_name: "",
                us_name: "",
                us_surname: "",
                pt_allergies: "",
                pt_condition: ""
            }
        };
    }

    componentDidMount() : void {
        Axios({
            url: "/hFile/info",
            headers: {
                Authorization: 'Bearer ' + this.props.loginData.token 
            },
            method: "GET"
        }).then((response) => {
            const apiResponse = response.data as IAPIResponse;

            switch (apiResponse.code)
            {
                case 200:
                {
                    this.setState(() => ({
                        fileList : response.data.fileListData as FileData[]
                    }));
                    break;
                }

                case 404:
                    break;

                default:
                    
            }
        }).catch(() => {
            //TODO
        });

        Axios({
            url: "/tickets/info",
            headers: {
                Authorization: 'Bearer ' + this.props.loginData.token 
            },
            method: "GET"
        }).then((response) => {
            const apiResponse = response.data as IAPIResponse;

            switch (apiResponse.code)
            {
                case 200:
                {
                    this.setState(() => ({
                        ticketList : response.data.ticketListData as TicketData[]
                    }));
                    break;
                }

                case 404:
                    break;

                default:
                    
            }
        }).catch(() => {
            //TODO
        });
    }

    toggleTicketEdit = (): void => {
        this.setState(state => ({
            editMode: !state.editMode
        }));
    }

    toggleReportEdit = (): void => {
        this.setState(state => ({
            editModeReport: !state.editModeReport
        }));
    }

    updateTicket = (): void => {
        // TODO

        this.setState({
            editMode: false
        });
    }

    render(): JSX.Element
    {
        return (
            <div className="main-i">
                <HCard>
                    <HForm key={ this.state.editMode ? 1 : 0 } onSubmit={ this.updateTicket }>
                        <VBox>
                            <VBox>
                                <HHeader>
                                    <HFlow>
                                        Název vyšetření
                                    </HFlow>
                                </HHeader>
                                <HFlow>
                                    <VBox>
                                        <HSubHeader>
                                            Základní údaje
                                        </HSubHeader>
                                        <HGrid shrink={ true }>
                                            <HInput label={ "Příslušná zpráva" } required={ false } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("ptch_name") } type={ "text" } />
                                            <HInput label={ "Stav" } required={ false } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("cr_performed") } type={ "text" } />
                                            <HInput label={ "Cena vyšetření" } required={ false } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("cr_price") } type={ "text" } />
                                        </HGrid>
                                    </VBox>
                                    <VBox>
                                        <HSubHeader>
                                            Pacientovi údaje
                                        </HSubHeader>
                                        <HGrid shrink={ true }>
                                            <HInput label={ "Jméno" } required={ true } readOnly={ true } fieldInfo={ this.managedField("us_name") } type={ "text" } />
                                            <HInput label={ "Příjmení" } required={ true } readOnly={ true } fieldInfo={ this.managedField("us_surname") } type={ "text" } />
                                            <HInput label={ "Alergeny" } required={ true } readOnly={ true } fieldInfo={ this.managedField("pt_allergies") } type={ "text" } />
                                            <HInput label={ "Potíže" } required={ true } readOnly={ true } fieldInfo={ this.managedField("pt_condition") } type={ "text" } />
                                        </HGrid>
                                    </VBox>
                                </HFlow>
                            </VBox>
                            <HFlow right={ true }>
                                <span style={{ visibility: (this.state.editMode ? "visible" : "hidden") }}>
                                    <HButton buttonStyle={ HButtonStyle.TEXT } action={ "reset" } action2={ this.toggleTicketEdit }>
                                        Zrušit změny
                                    </HButton>
                                </span>
                                <HButton buttonStyle={ HButtonStyle.TEXT_INVERTED } action={ this.state.editMode ? "submit" : this.toggleTicketEdit }>
                                    { this.state.editMode ? "Uložit změny" : "Upravit vyšetření" }
                                </HButton>
                            </HFlow>
                        </VBox>
                    </HForm>
                </HCard>
                <div className="reports">
                    <HForm key={ this.state.editModeReport ? 1 : 0 } onSubmit = {this.updateTicket}>
                        <h3 className="report-h">Lékařská zpráva</h3>
                        <div className="textarea-container">
                            <textarea name="med-description" id="med-description" >

                            </textarea>
                        </div>
                        <HFlow right={ true }>
                                <span style={{ visibility: (this.state.editModeReport ? "visible" : "hidden") }}>
                                    <HButton buttonStyle={ HButtonStyle.TEXT } action={ "reset" } action2={ this.toggleReportEdit }>
                                        Zrušit změny
                                    </HButton>
                                </span>
                                <HButton buttonStyle={ HButtonStyle.TEXT_INVERTED } action={ this.state.editModeReport ? "submit" : this.toggleReportEdit }>
                                    { this.state.editModeReport ? "Uložit změny" : "Přidat do lékařské zprávy" }
                                </HButton>
                            </HFlow>
                    </HForm>
                </div>
            </div>
        )
    }
}