import React, { ReactNode } from "react";
import Axios from "axios";

import { Dispatch } from "redux";
import { IAPIResponse, ILoginData } from "../../../data/UserData";
import { UnPatientData } from "../../../data/doctor-data/UnPatientData";
import { HButton, HButtonStyle } from "../../HButton";
import { HForm, HFormComponent } from "../../HForm";
import { PractitionerData } from "../../../data/doctor-data/PractitionerData";
import { HBox, HCard, HGrid, HHeader, HSubHeader, VBox } from "../../HCard";
import { HFlow, HInput } from "../../HInput";

import "../../../style/p-profile.less";
import "../../../style/healthFiles.less";

export class PatientData extends HFormComponent<{
    dispatch: Dispatch,
    loginData: ILoginData,
    patientData: UnPatientData 
}, {
    practitionerList : PractitionerData[],
    practitionerNumber : string,
    loaded : number,
    editMode: boolean,
    errorText?: string,
    fields: {
        patientId: string,
        patientFirstName: string,
        patientLastName: string,
        practitionerFirstName: string,
        practitionerLastName: string,
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
            loaded: 0,
            editMode: false,
            fields: {
                patientId: "",
                patientFirstName: "",
                patientLastName: "",
                practitionerFirstName: "",
                practitionerLastName: "",
                allergies: "",
                conditions : "",
                gender : ""
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
                    const myPatientListData = response.data.unPatientsResponseData as UnPatientData[];
                    for (let i = 0; i < myPatientListData.length; i++) {
                        if(this.props.patientData.idPatient == myPatientListData[i].idPatient){
                            let genderFinal = "Nespecifikováno";
                            try {
                                let genderString = myPatientListData[i].gender.toUpperCase();
                                if(genderString.startsWith("M")){
                                    genderFinal = "Muž";
                                }else if (genderString.startsWith("F")){
                                    genderFinal = "Žena";
                                }else {
                                    genderFinal = "";
                                }
                            }catch(e){

                            }
                            this.setState(()=> ({
                                fields: {
                                    patientId: myPatientListData[i].idPatient.toString(),
                                    patientFirstName: myPatientListData[i].firstName,
                                    patientLastName: myPatientListData[i].lastName,
                                    practitionerFirstName: myPatientListData[i].practitionerName,
                                    practitionerLastName: myPatientListData[i].practitionerSurname,
                                    allergies: myPatientListData[i].allergies,
                                    conditions: myPatientListData[i].conditions,
                                    gender: genderFinal
                                },
                                loaded: this.state.loaded + 1,
                                practitionerNumber: myPatientListData[i].idPractitioner.toString()
                            }));
                        }
                    }
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
                    console.log(response)
                    this.setState(() => ({
                        practitionerList : response.data.practitionersList as PractitionerData[],
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

    updatePatient = (): void => {
        setTimeout(() => {

            const pid = parseInt(this.state.fields.patientId)
            console.log(this.state.practitionerNumber)

            let genderNumber;
            const genderString = this.state.fields.gender.toUpperCase();
            if(genderString.startsWith("M")){
                genderNumber = 1;
            }else if (genderString.startsWith("Ž")){
                genderNumber = 2;
            }else {
                genderNumber = 3;
            }
            let pracNum = "1";
            if(this.state.practitionerNumber === "0"){
                pracNum = "1"
            }else{
                pracNum = this.state.practitionerNumber
            }
            Axios({
                url: `/doctors/${pid}/update-patient`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.props.loginData.token
                },
                data: {
                    "idPractitioner" : pracNum,
                    "allergies" : this.state.fields.allergies,
                    "conditions" : this.state.fields.conditions,
                    "gender" : genderNumber
                }
            }).then((response) => {
                const apiResponse = response.data as IAPIResponse;

                switch (apiResponse.code)
                {
                    case 200:
                    {
                        this.setState(() => ({
                            loaded: this.state.loaded + 1
                        }));
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

    selectPractitioner = (practitioner : string): void => {
        console.log(practitioner)
        this.setState({
            practitionerNumber : practitioner.toString()
        })
    }

    togglePatientEdit = (): void => {
        this.setState(state => ({
            editMode: !state.editMode
        }));
    }


    render(): JSX.Element
    {
        return (
            <div className="main-i">
                <HCard>
                    <HForm key={ this.state.loaded + (this.state.editMode ? 1 : 0) } onSubmit={ this.updatePatient }>
                        <VBox>
                            <VBox>
                                <HHeader>
                                    <HFlow>
                                        Pacient
                                    </HFlow>
                                </HHeader>
                                <HFlow>
                                    <VBox>
                                        <HSubHeader>
                                            Základní údaje
                                        </HSubHeader>
                                        <HGrid shrink={ true }>
                                            <HInput label={ "Jméno" } required={ true } readOnly={ true } fieldInfo={ this.managedField("patientFirstName") } type={ "text" } />
                                            <HInput label={ "Příjmení" } required={ true } readOnly={ true } fieldInfo={ this.managedField("patientLastName") } type={ "text" } />
                                            <HInput label={ "Číslo pacienta" } required={ true } readOnly={ true } fieldInfo={ this.managedField("patientId") } type={ "text" } />
                                        </HGrid>
                                    </VBox>
                                    <VBox>
                                        <HSubHeader>
                                            Pacientovi údaje
                                        </HSubHeader>
                                        <HGrid shrink={ true }>
                                            <HInput label={ "Alergeny" } required={ false } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("allergies") } type={ "text" } />
                                            <HInput label={ "Potíže" } required={ false } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("conditions") } type={ "text" } />
                                            <HInput label={ "Pohlaví" } required={ false } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("gender") } type={ "text" } />
                                        </HGrid>
                                    </VBox>
                                </HFlow>
                                <HFlow>
                                    <VBox>
                                        <HSubHeader>
                                            Praktický lékař
                                        </HSubHeader>
                                        <HGrid shrink={ true }>
                                            <HInput label={ "Jméno" } required={ false } readOnly={ true } fieldInfo={ this.managedField("practitionerFirstName") } type={ "text" } />
                                            <HInput label={ "Příjmení" } required={ false } readOnly={ true } fieldInfo={ this.managedField("practitionerLastName") } type={ "text" } />
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
                                </HFlow>
                                <HFlow>
                                    <span style={{ color: "red" }}>
                                        { this.state.errorText }
                                    </span>
                                </HFlow>
                            </VBox>
                            <HFlow right={ true }>
                                <span style={{ visibility: (this.state.editMode ? "visible" : "hidden") }}>
                                    <HButton buttonStyle={ HButtonStyle.TEXT } action={ "reset" } action2={ this.togglePatientEdit }>
                                        Zrušit změny
                                    </HButton>
                                </span>
                                <HButton buttonStyle={ HButtonStyle.TEXT_INVERTED } action={ this.state.editMode ? "submit" : this.togglePatientEdit }>
                                    { this.state.editMode ? "Uložit změny" : "Upravit pacienta" }
                                </HButton>
                            </HFlow>
                        </VBox>
                    </HForm>
                </HCard>
            </div>
        );
    }
}