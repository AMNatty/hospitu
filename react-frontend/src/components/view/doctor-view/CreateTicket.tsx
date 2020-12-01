import React from "react";
import Axios from "axios";

import { Dispatch } from "redux";
import { IAPIResponse, ILoginData } from "../../../data/UserData";
import { FileData} from "../../../data/doctor-data/HFileData";
import { TicketData } from "../../../data/doctor-data/TicketData";
import { DoctorData } from "../../../data/doctor-data/DoctorData";
import { HFlow, HInput } from "../../HInput";
import { HForm, HFormComponent, HFieldInfo } from "../../HForm";
import { VBox } from "../../HCard";
import { HButton, HButtonStyle } from "../../HButton";

import "../../../style/healthFiles.less";
import "../../../style/p-profile.less"

export class CreateTicket extends HFormComponent<{
    dispatch: Dispatch,
    loginData: ILoginData 
}, {
    ticketList: TicketData[],
    doctorList: DoctorData[],
    fileList: FileData[],
    fields: {
        cr_name: string,
        cr_report: string,
        cr_price: string
    }
}> {
    constructor(props: never)
    {
        super(props);
        this.state = {
            ticketList:[],
            doctorList:[],
            fileList:[],
            fields: {
                cr_name: "",
                cr_report: "",
                cr_price: "",
            }
        };
    }

    componentDidMount() : void {
        Axios({
            url: "/tickets/info",
            headers: {
                Authorization: "Bearer " + this.props.loginData.token 
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
            // TODO
        });

        Axios({
            url: "/hFile/info",
            headers: {
                Authorization: "Bearer " + this.props.loginData.token 
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
            // TODO
        });

        Axios({
            url: "/doctors/files",
            headers: {
                Authorization: "Bearer " + this.props.loginData.token 
            },
            method: "GET"
        }).then((response) => {
            const apiResponse = response.data as IAPIResponse;

            switch (apiResponse.code)
            {
                case 200:
                {
                    this.setState(() => ({
                        doctorList : response.data.doctorListData as DoctorData[]
                    }));
                    break;
                }

                case 404:
                    break;

                default:
                    
            }
        }).catch(() => {
            // TODO
        });
    }

    test() : void {
        return;
    }

    render(): JSX.Element
    {
        return (
            <div className="main">
                <HForm onSubmit={this.test}>
                    <div className="h-file">
                        <h3 className="h-headline">Stanovit vyšetření</h3>
                        <div className="container-file">
                            <div className="left-side">
                                <VBox>
                                    <HInput fieldInfo={ this.managedField("cr_name")} label={"Název vyšetření"} type={"text"} readOnly={false} required={true}>
                                    </HInput>
                                    <HInput fieldInfo={ this.managedField("cr_report")} label={"Zpráva"} type={"text"} readOnly={false}>
                                    </HInput>
                                    <HInput fieldInfo={ this.managedField("cr_price")} label={"Cena"} type={"text"} readOnly={false} required={true}>
                                    </HInput>
                                </VBox>
                            </div>
                            <div className="right-side">
                                <div className="first-selector">
                                    <div className="selector-container">
                                        <label htmlFor="file-select">Přiřadit záznamu: </label>
                                        <select name="file-select" id="file-select" className="file-select">
                                            {
                                                this.state.fileList.map(fileo =>(
                                                    <option key={fileo.idFile} value={fileo.idFile}>{fileo.name}</option> 
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="second-selector">
                                    <div className="selector-container">
                                        <label htmlFor="doctor-select">Přiřadit lékaři: </label>
                                        <select name="doctor-select" id="doctor-select" className="doctor-select">
                                            {
                                                this.state.doctorList.map(doctor =>(
                                                    <option key={doctor.idDoctor} value={doctor.idDoctor}>{doctor.firstName} {doctor.lastName}</option> 
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-container">
                        <HButton action={ "submit" }>
                            Stanovit vyšetření
                        </HButton>
                    </div>
                </HForm>
            </div>
        );
    }
}