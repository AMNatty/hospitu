import React, { ReactNode } from "react";
import Axios from "axios";

import { Dispatch } from "redux";
import { IAPIResponse, ILoginData } from "../../../data/UserData";
import { UnPatientData } from "../../../data/doctor-data/UnPatientData";
import { HButton, HButtonStyle } from "../../HButton";
import { HForm } from "../../HForm";
import { PatientData } from "./PatientData";

import "../../../style/doctor-content.less";
import { HFlow } from "../../HInput";

enum HDisplayData
{
    HPatientTable,
    HPatient
}

export class PatientList extends React.Component<{
    dispatch: Dispatch,
    loginData: ILoginData 
},{
    unPatientList : UnPatientData[],
    screenState: HDisplayData,
    patientData: UnPatientData
}> {

    constructor(props:never){
        super(props);
        this.state = {
            unPatientList : [],
            screenState: HDisplayData.HPatientTable,
            patientData: {
                idPatient : 0,
                login : "",
                firstName : "",
                lastName : "",
                role : "",
                allergies : "",
                conditions : "",
                gender : "",
                idPractitioner : 0,
                practitionerName : "",
                practitionerSurname : ""
            }
        };
    }

    componentDidMount() : void {
        Axios({
            url: "/doctors/patients",
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
                        unPatientList : response.data.unPatientsResponseData as UnPatientData[]
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

    choosePatient = (patientD : UnPatientData) : void => {
        switch(this.state.screenState){
            case HDisplayData.HPatientTable:
                this.setState({
                    screenState: HDisplayData.HPatient,
                    patientData: patientD
                });
                break;
            default:
                break;
        }
    }

    render(): ReactNode
    {
        let content : ReactNode

        switch(this.state.screenState){
            case HDisplayData.HPatientTable:
                content = (
                    <div className="main">
                        <div className="table div-table">
                            <div className="th border-b">
                                <h3>Zařazení pacienti</h3>
                            </div>
                            <div className="table-body">
                                    <div className="table-value">
                                        <div className="table-value-flow">
                                            <div className="table-values">
                                                <h3 className="header-bold">Číslo pacienta</h3>
                                            </div>
                                            <div className="table-values">
                                                <h3 className="header-bold">Jméno</h3>
                                            </div>
                                            <div className="table-values">
                                                <h3 className="header-bold">Příjmení</h3>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.state.unPatientList.map(unPatient => (
                                            <div className="table-value table-patient" key={unPatient.idPatient} onClick={() => this.choosePatient(unPatient)}>
                                                <div className="table-value-flow">
                                                    <div className="table-values">
                                                        <h3>{unPatient.idPatient}</h3>
                                                    </div>
                                                    <div className="table-values">
                                                        <h3>{unPatient.firstName}</h3>
                                                    </div>
                                                    <div className="table-values">
                                                    <h3>{unPatient.lastName}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                            </div>
                            <div className="pagination border-t">
                                <nav>
                                    <ul className="pagination-ul">
                                        <li className="pagination-item">
                                            <a href="#" className="pagination-link">
                                                        1
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                );
                break;
            case HDisplayData.HPatient:
                content = (
                    <PatientData dispatch={this.props.dispatch} loginData={this.props.loginData} patientData={this.state.patientData}>
                    </PatientData>
                );
                break;
        }



        return (
            content
        )
    }
}