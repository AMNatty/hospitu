import React, { ChangeEvent } from "react";
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
    loginData: ILoginData,
    ticketData: TicketData,
    fileListData: FileData[],
}, {
    ticketList: TicketData[],
    fileList: FileData[],
    editMode: boolean,
    editModeReport: boolean,
    myTicketData: TicketData,
    loaded: number,
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
    },
    errorText?: string,
    errorTextReport? : string
}> {
    constructor(props: never)
    {
        super(props);
        this.state = {
            ticketList:[],
            fileList: [],
            editMode: false,
            editModeReport: false,
            myTicketData: {
                idTicket : 0,
                idDoctor : 0,
                idFile : 0,
                name : "",
                performed : "",
                report : "",
                price : ""
            },
            loaded: 0,
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
                    const myTicketListData = response.data.ticketListData as TicketData[];
                    const myFileListData = this.props.fileListData
                    for(let i = 0; i < myTicketListData.length; i++){
                        if(this.props.ticketData.idTicket === myTicketListData[i].idTicket){
                            for(let j = 0; j < myFileListData.length; j++){
                                if(this.props.ticketData.idFile === myFileListData[j].idFile){
                                    this.setState(() => ({
                                        ticketList : myTicketListData,
                                        myTicketData : myTicketListData[i],
                                        fields : {
                                            cr_id: myTicketListData[i].idTicket.toString(),
                                            cr_name: myTicketListData[i].name,
                                            cr_performed: (myTicketListData[i].performed) ? "Čekající" : "Vyřízený",
                                            cr_report: myTicketListData[i].report,
                                            cr_price: myTicketListData[i].price + " kč",
                                            ptch_name: myFileListData[j].name,
                                            us_name: myFileListData[j].patientFirstName,
                                            us_surname: myFileListData[j].patientLastName,
                                            pt_allergies: myFileListData[j].patientAllergies,
                                            pt_condition: myFileListData[j].patientCondition
                                        },
                                        loaded : this.state.loaded + 1
                                    }));
                                }
                            }
                        }
                    }
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
        this.setState({
            errorText: ""
        });

        const crId = parseInt(this.state.fields.cr_id);
        const crPerformed = this.state.fields.cr_performed === "Čekající" ? 0 : 1;
        let crPriceUP = this.state.fields.cr_price.toUpperCase();
        let crPrice = "";
        if(crPriceUP.includes("KČ") || crPriceUP.includes("KC")){
            crPrice = this.state.fields.cr_price.substr(0, this.state.fields.cr_price.length-2);
        }else{
            crPrice = crPriceUP;
        }

        Axios({
            url: `/tickets/${ crId }/ticket-update`,
            method: "PATCH",
            data: {
                "performed": crPerformed,
                "price": crPrice,
            },
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: "Bearer " + this.props.loginData.token
            }
        }).then((response) => {
            const apiResponse = response.data as IAPIResponse;

                switch (apiResponse.code)
                {
                    case 200:
                    {
                        alert("Aktualizováno")
                        this.setState(() => ({
                            loaded: this.state.loaded + 1
                        }));
                        break;
                    }

                    default:
                    {
                        this.setState(() => ({
                            errorText: "Došlo k chybě při ukládání vyšetření."
                        }));
                    }

                }
        }).catch((e) => {
            this.setState(() => ({
                errorText: "Došlo k chybě při ukládání vyšetření."
            }));
        });
        
        if (!this.state.errorText)
            this.setState({
                editMode: false
            });
    }

    updateReport = (): void => {
        this.setState({
            errorTextReport: ""
        });

        const crId = parseInt(this.state.fields.cr_id);
        const crReport = this.state.fields.cr_report;

        Axios({
            url: `/tickets/${ crId }/ticket-report-update`,
            method: "PATCH",
            data: {
                "report": crReport
            },
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: "Bearer " + this.props.loginData.token
            }
        }).then((response) => {
            const apiResponse = response.data as IAPIResponse;

                switch (apiResponse.code)
                {
                    case 200:
                    {
                        alert("Aktualizováno")
                        break;
                    }

                    default:
                    {
                        this.setState(() => ({
                            errorTextReport: "Došlo k chybě při ukládání vyšetření."
                        }));
                    }

                }
        }).catch((e) => {
            this.setState(() => ({
                errorTextReport: "Došlo k chybě při ukládání vyšetření."
            }));
        });
        
        if (!this.state.errorTextReport)
            this.setState({
                editModeReport: false
            });
    }

    updateTextArea = (crRep : string): void => {
        this.setState({
            fields: {
                ...this.state.fields,
                cr_report : crRep
            }
        })
    }

    render(): JSX.Element
    {
        return (
            <div className="main-i">
                <HCard>
                    <HForm key={ this.state.loaded + (this.state.editMode ? 1 : 0) } onSubmit={ this.updateTicket }>
                        <VBox>
                            <VBox>
                                <HHeader>
                                    <HFlow>
                                        {this.state.fields.cr_name}
                                    </HFlow>
                                </HHeader>
                                <HFlow>
                                    <VBox>
                                        <HSubHeader>
                                            Základní údaje
                                        </HSubHeader>
                                        <HGrid shrink={ true }>
                                            <HInput label={ "Příslušná zpráva" } required={ true } readOnly={ true } fieldInfo={ this.managedField("ptch_name") } type={ "text" } />
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
                                <HFlow>
                                    <span style={{ color: "red" }}>
                                        { this.state.errorText }
                                    </span>
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
                    <HForm key={ this.state.editModeReport ? 1 : 0 } onSubmit = {this.updateReport}>
                        <h3 className="report-h">Lékařská zpráva</h3>
                        <div className="textarea-container">
                            <textarea onChange={(e) => this.updateTextArea(e.target.value)} name="med-description" id="med-description" defaultValue={this.state.fields.cr_report} readOnly={ !this.state.editModeReport }>
                            </textarea>
                        </div>
                        <HFlow>
                            <span style={{ color: "red" }}>
                                { this.state.errorTextReport }
                            </span>
                        </HFlow>
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