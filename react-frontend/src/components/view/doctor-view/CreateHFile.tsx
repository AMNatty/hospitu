import React from "react";
import Axios from "axios";

import { Dispatch } from "redux";
import { IAPIResponse, ILoginData } from "../../../data/UserData";
import { FileData} from "../../../data/doctor-data/HFileData";
import { DoctorData } from "../../../data/doctor-data/DoctorData";
import { HFlow, HInput } from "../../HInput";
import { HForm, HFormComponent, HFieldInfo } from "../../HForm";
import { VBox } from "../../HCard";
import { HButton, HButtonStyle } from "../../HButton";

import "../../../style/healthFiles.less";
import "../../../style/p-profile.less"

export class CreateHFile extends HFormComponent<{
    dispatch: Dispatch,
    loginData: ILoginData 
}, {
    fileList: FileData[],
    doctorList: DoctorData[],
    fields: {
        ptch_name: string,
        ptch_description: string,
        ptch_from: string,
        ptch_to: string
    }
}> {
    constructor(props: never)
    {
        super(props);
        this.state = {
            fileList:[],
            doctorList:[],
            fields: {
                ptch_name: "",
                ptch_description: "",
                ptch_from: "",
                ptch_to: ""
            }
        };
    }

    componentDidMount() : void {
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
                        <h3 className="h-headline">Vytvořit Záznam</h3>
                        <div className="container-file">
                            <div className="left-side">
                                <VBox>
                                    <HInput fieldInfo={ this.managedField("ptch_name")} label={"Název záznamu"} type={"text"} readOnly={false} required={true}>
                                    </HInput>
                                    <HInput fieldInfo={ this.managedField("ptch_description")} label={"Zpráva"} type={"text"} readOnly={false}>
                                    </HInput>
                                    <HInput fieldInfo={ this.managedField("ptch_from")} label={"Termín od"} type={"datetime-local"} readOnly={false}>
                                    </HInput>
                                    <HInput fieldInfo={ this.managedField("ptch_to")} label={"Termín do"} type={"datetime-local"} readOnly={false}>
                                    </HInput>
                                </VBox>
                            </div>
                            <div className="right-side">
                                <div className="first-selector">
                                    <div className="selector-container">
                                        <label htmlFor="patient-select">Přiřadit pacientovi: </label>
                                        <select name="patient-select" id="patient-select" className="patient-select">
                                            {
                                                this.state.fileList.map(fileo =>(
                                                    <option key={fileo.idPatient} value={fileo.idPatient}>{fileo.patientFirstName} {fileo.patientLastName}</option> 
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
                            Vytvořit zprávu
                        </HButton>
                    </div>
                </HForm>
            </div>
        );
    }
}