import React from "react";
import Axios from "axios";

import { Dispatch } from "redux";
import { IAPIResponse, ILoginData } from "../../../data/UserData";
import { HForm, HFormComponent } from "../../HForm";
import { PractitionerData } from "../../../data/doctor-data/PractitionerData";
import { HBox, HCard, HGrid, HHeader, HSubHeader, VBox } from "../../HCard";

import "../../../style/p-profile.less";
import "../../../style/healthFiles.less";
import { HFlow, HInput } from "../../HInput";
import { HButton } from "../../HButton";

export class CreatePatient extends HFormComponent<{
    dispatch: Dispatch,
    loginData: ILoginData 
}, {
    practitionerList : PractitionerData[],
    practitionerNumber : string,
    fields: {
        patientLogin: string,
        patientPassword: string,
        patientFirstName: string,
        patientLastName: string,
        phone : string,
        email : string,
        birthDate : string,
        birthId : string,
        allergies: string,
        conditions : string,
        gender : string
    }
}> {
    constructor(props: never)
    {
        super(props);
        this.state = {
            practitionerList: [],
            practitionerNumber: "1",
            fields: {
                patientLogin: "",
                patientPassword: "",
                patientFirstName: "",
                patientLastName: "",
                phone : "",
                email : "",
                birthDate : "1970-01-01",
                birthId : "",
                allergies: "",
                conditions : "",
                gender : "Muž"
            }
        };
    }

    componentDidMount() : void {
        Axios({
            url: "/doctors/practitioners",
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
                        practitionerList : response.data.practitionersList as PractitionerData[]
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

    createPatient = (): void => {
        setTimeout(() => {

            let genderNumber;
            const genderString = this.state.fields.gender.toUpperCase();
            if(genderString.startsWith("M")){
                genderNumber = 1;
            }else if (genderString.startsWith("Ž")){
                genderNumber = 2;
            }else {
                genderNumber = 3;
            }
            
            Axios({
                url: "/doctors/create-patient",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.props.loginData.token
                },
                data: {
                    username : this.state.fields.patientLogin,
                    password : this.state.fields.patientPassword,
                    name : this.state.fields.patientFirstName,
                    surname : this.state.fields.patientLastName,
                    phone : this.state.fields.phone,
                    email : this.state.fields.email,
                    birthDate : this.state.fields.birthDate,
                    birthId : this.state.fields.birthId,
                    practitionerId : this.state.practitionerNumber,
                    allergies : this.state.fields.allergies,
                    conditions : this.state.fields.conditions,
                    gender : genderNumber
                }
            }).then((response) => {
                const apiResponse = response.data as IAPIResponse;

                switch (apiResponse.code)
                {
                    case 200:
                    {
                        alert("Vytvořeno")
                        break;
                    }

                    default:
                    {
                        alert("Chyba")
                        break;
                    }

                }
            }).catch((e) => {
                console.log(e)
                alert("Chyba")
            }).then(() => {
            });

        }, 500);
    }

    selectPractitioner = (practitioner : string): void => {
        this.setState({
            practitionerNumber : practitioner.toString()
        })
    }


    render(): JSX.Element
    {
        return (
            <div className="main">
                <HCard>
                    <HForm onSubmit={ this.createPatient }>
                        <VBox>
                            <VBox>
                                <HHeader>
                                    <HFlow>
                                        Tvorba pacienta
                                    </HFlow>
                                </HHeader>
                                <HFlow>
                                    <HBox>
                                        <VBox>
                                            <HSubHeader>
                                                Základní údaje
                                            </HSubHeader>
                                            <HGrid shrink={ true }>
                                                <HInput label={ "Uživatelské jméno" } required={ true } readOnly={ false } fieldInfo={ this.managedField("patientLogin") } type={ "text" } />
                                                <HInput label={ "Heslo" } required={ true } readOnly={ false } fieldInfo={ this.managedField("patientPassword") } type={ "password" } />
                                                <HInput label={ "Křestní jméno" } required={ true } readOnly={ false } fieldInfo={ this.managedField("patientFirstName") } type={ "text" } />
                                                <HInput label={ "Příjmení" } required={ true } readOnly={ false } fieldInfo={ this.managedField("patientLastName") } type={ "text" } />
                                            </HGrid>
                                        </VBox>
                                    </HBox>
                                    <HBox>
                                        <VBox>
                                            <HSubHeader>
                                                Osobní údaje
                                            </HSubHeader>
                                            <HGrid shrink={ true }>
                                                <HInput label={ "Telefon" } required={ true } readOnly={ false } fieldInfo={ this.managedField("phone") } type={ "phone" } />
                                                <HInput label={ "Email" } required={ true } readOnly={ false } fieldInfo={ this.managedField("email") } type={ "email" } />
                                                <HInput label={ "Datum narození" } required={ true } readOnly={ false } fieldInfo={ this.managedField("birthDate") } type={ "date" } />
                                                <HInput label={ "Rodné číslo" } required={ true } readOnly={ false } fieldInfo={ this.managedField("birthId") } type={ "text" } />
                                            </HGrid>
                                        </VBox>
                                        <VBox>
                                            <HSubHeader>
                                                Pacientovi údaje
                                            </HSubHeader>
                                            <HGrid shrink={ true }>
                                                <HInput label={ "Alergie" } required={ false } readOnly={ false } fieldInfo={ this.managedField("allergies") } type={ "text" } />
                                                <HInput label={ "Dlouhodobý zdravotní stav" } required={ false } readOnly={ false } fieldInfo={ this.managedField("conditions") } type={ "text" } />
                                                <HInput label={ "Pohlaví" } required={ false } readOnly={ false } fieldInfo={ this.managedField("gender") } type={ "text" } />
                                                <div id="choose-practitioner">
                                                    <label htmlFor="patient-select">Praktický lékař: </label>
                                                    <select name="practitioner-select" id="practitioner-select" className="practitioner-select" onChange={(e) => this.selectPractitioner(e.target.value)}>
                                                        {
                                                            this.state.practitionerList.map(practitioners =>(
                                                                <option key={practitioners.idPractitioners} value={practitioners.idPractitioners}>{practitioners.firstName} {practitioners.lastName}</option> 
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </HGrid>
                                        </VBox>
                                    </HBox>
                                </HFlow>
                            </VBox>
                            <HFlow right={ true }>
                                <HButton action={ "submit" } >
                                    Vytvořit pacienta
                                </HButton>
                            </HFlow>
                        </VBox>
                    </HForm>
                </HCard>
            </div>
        );
    }
}