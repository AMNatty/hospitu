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
        idPatient: string,
        idDoctor: string,
        description: string,
        name: string,
        from: string,
        to: string,
        finished: string,
    },
    doctorVal: string,
    patientVal: string
}> {
    constructor(props: never)
    {
        super(props);
        this.state = {
            fileList:[],
            doctorList:[],
            doctorVal: this.props.loginData.id.toString(),
            patientVal: "4",
            fields: {
                idPatient: "4",
                idDoctor: this.props.loginData.id.toString(),
                description: "",
                name: "",
                from: "",
                to: "",
                finished: "0"
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

    createFile = (): void => {
        setTimeout(() => {
            Axios({
                url: "/hFile/create",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.props.loginData.token
                },
                data: {
                    idPatient: this.state.patientVal,
                    idDoctor: this.state.doctorVal,
                    description: this.state.fields.description,
                    name: this.state.fields.name,
                    from: this.state.fields.from,
                    to: this.state.fields.to,
                    finished: "0"
                }
            }).then((response) => {
                const apiResponse = response.data as IAPIResponse;

                switch (apiResponse.code)
                {
                    case 200:
                    {
                        console.log("success")
                        break;
                    }

                    default:

                }
                alert("Dokončeno")
            }).catch((e) => {
                console.log(e)
                alert("Chyba")
            }).then(() => {
            });

        }, 500);
    }

    addPatient = (val : string) : void => {
        this.setState({
            patientVal: val.toString()
        })
    }

    addDoctor = (val : string) : void => {
        this.setState({
            doctorVal: val.toString()
        })
    }

    render(): JSX.Element
    {
        return (
            <div className="main">
                <HForm onSubmit={this.createFile}>
                    <div className="h-file">
                        <h3 className="h-headline">Vytvořit Záznam</h3>
                        <div className="container-file">
                            <div className="left-side">
                                <VBox>
                                    <HInput fieldInfo={ this.managedField("name")} label={"Název záznamu"} type={"text"} readOnly={false} required={true}>
                                    </HInput>
                                    <HInput fieldInfo={ this.managedField("description")} label={"Zpráva"} type={"text"} readOnly={false}>
                                    </HInput>
                                    <HInput fieldInfo={ this.managedField("from")} label={"Termín od"} type={"datetime-local"} readOnly={false}>
                                    </HInput>
                                    <HInput fieldInfo={ this.managedField("to")} label={"Termín do"} type={"datetime-local"} readOnly={false}>
                                    </HInput>
                                </VBox>
                            </div>
                            <div className="right-side">
                                <div className="first-selector">
                                    <div className="selector-container">
                                        <label htmlFor="patient-select">Přiřadit pacientovi: </label>
                                        <select name="patient-select" id="patient-select" className="patient-select" onChange={(e) => this.addPatient(e.target.value)}>
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
                                        <select name="doctor-select" id="doctor-select" className="doctor-select" onChange={(e) => this.addDoctor(e.target.value)}>
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