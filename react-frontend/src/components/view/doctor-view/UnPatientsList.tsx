import React, { ReactNode } from "react";
import Axios from "axios";

import { Dispatch } from "redux";
import { IAPIResponse, ILoginData } from "../../../data/UserData";
import { UnPatientData } from "../../../data/doctor-data/UnPatientData";
import { HButton, HButtonStyle } from "../../HButton";
import { HForm } from "../../HForm";

import "../../../style/doctor-content.less";
import { HFlow } from "../../HInput";

export class UnPatientsList extends React.Component<{
    dispatch: Dispatch,
    loginData: ILoginData 
},{
    unPatientList : UnPatientData[],
}> {

    constructor(props:never){
        super(props);
        this.state = {
            unPatientList : [],
        };
    }

    componentDidMount() : void {
        Axios({
            url: "/doctors/un-patients",
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

    categorize = (patientId : number) : void => {
        Axios({
            url: `/doctors/${ patientId }/move-patient`,
            method: "PUT",
            data: {
                "idPatient": patientId
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
                        var index : number = 1;
                        for (var i = 0; i < this.state.unPatientList.length; i++) {
                            if(this.state.unPatientList[i].idPatient == patientId){
                                index = i;
                            }
                        }
                        this.state.unPatientList.splice(index, 1);
                        this.setState(() => ({
                            unPatientList : this.state.unPatientList
                        }));
                        break;
                    }

                    default:
                    {
                        alert("Chyba")
                        break;
                    }

                }
        }).catch((e) => {
        });
    }

    render(): JSX.Element
    {
        return (
            <div className="main">
                <div className="table div-table">
                    <div className="th border-b">
                        <h3>Nezařazení pacienti</h3>
                    </div>
                    <div className="table-body">
                            <div className="table-value">
                                <div className="table-value-flow">
                                    <div className="table-values">
                                        <h3 className="header-bold">Login</h3>
                                    </div>
                                    <div className="table-values">
                                        <h3 className="header-bold">Jméno</h3>
                                    </div>
                                    <div className="table-values">
                                        <div className="button-flow">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.unPatientList.map(unPatient => (
                                    <HForm key={unPatient.idPatient} onSubmit={() => this.categorize(unPatient.idPatient)}>
                                        <div className="table-value">
                                            <div className="table-value-flow">
                                                <div className="table-values">
                                                    <h3>{unPatient.login}</h3>
                                                </div>
                                                <div className="table-values">
                                                    <h3>{unPatient.firstName} {unPatient.lastName}</h3>
                                                </div>
                                                <div className="table-values">
                                                    <div className="button-flow">
                                                            <HButton action={ "submit" } >
                                                            Zařadit
                                                        </HButton>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </HForm>
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
        )
    }
}