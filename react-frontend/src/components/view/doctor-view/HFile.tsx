import React from "react";
import Axios from "axios";

import { Dispatch } from "redux";
import { IAPIResponse, ILoginData } from "../../../data/UserData";
import { FileData} from "../../../data/doctor-data/HFileData";
import { DoctorData } from "../../../data/doctor-data/DoctorData";
import { HFlow, HInput } from "../../HInput";
import { HForm, HFormComponent, HFieldInfo } from "../../HForm";
import { HCard, HGrid, HHeader, HSubHeader, VBox } from "../../HCard";
import { HButton, HButtonStyle } from "../../HButton";

import "../../../style/p-profile.less";
import "../../../style/healthFiles.less";

export class HFile extends HFormComponent<{
    dispatch: Dispatch,
    loginData: ILoginData,
    fileData: FileData 
}, {
    fileList: FileData[],
    editMode: boolean,
    editModeReport: boolean,
    myFileData: FileData,
    fields: {
        ptch_id: string,
        ptch_name: string,
        ptch_description: string,
        ptch_from: string,
        ptch_to: string,
        ptch_finished: string,
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
            fileList:[],
            editMode: false,
            editModeReport: false,
            myFileData: {
                idFile : 0,
                idDoctor : 0,
                idPatient : 0,
                name : "",
                description : "",
                finished : "",
                from : "",
                to : "",
                patientFirstName : "",
                patientLastName : "",
                patientAllergies : "",
                patientCondition : "",
                patientGender : ""
            },
            fields: {
                ptch_id: "",
                ptch_name: "",
                ptch_description: "",
                ptch_from: "",
                ptch_to: "",
                ptch_finished: "",
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
                    //kdyby se upravovali data
                    const myFileListData = response.data.fileListData as FileData[]
                    for (let i = 0; i < myFileListData.length; i++) {
                        if(this.props.fileData.idFile === myFileListData[i].idFile){
                            this.setState(() => ({
                                myFileData : myFileListData[i],
                                fileList : myFileListData,
                                fields: {
                                    ptch_id: myFileListData[i].idFile.toString(),
                                    ptch_name: myFileListData[i].name,
                                    ptch_description: myFileListData[i].description,
                                    ptch_from: myFileListData[i].from,
                                    ptch_to: myFileListData[i].to,
                                    ptch_finished: (myFileListData[i].finished)? "Čeká na vyšetření" : "Ukončen",
                                    us_name: myFileListData[i].patientFirstName,
                                    us_surname: myFileListData[i].patientLastName,
                                    pt_allergies: myFileListData[i].patientAllergies,
                                    pt_condition: myFileListData[i].patientCondition
                                }
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
            
        });

    }

    toggleFileEdit = (): void => {
        this.setState(state => ({
            editMode: !state.editMode
        }));
    }

    toggleReportEdit = (): void => {
        this.setState(state => ({
            editModeReport: !state.editModeReport
        }));
    }

    updateFile = (): void => {
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
                    <HForm key={ this.state.editMode ? 1 : 0 } onSubmit={ this.updateFile }>
                        <VBox>
                            <VBox>
                                <HHeader>
                                    <HFlow>
                                        {this.state.fields.ptch_name}
                                    </HFlow>
                                </HHeader>
                                <HFlow>
                                    <VBox>
                                        <HSubHeader>
                                            Termíny
                                        </HSubHeader>
                                        <HGrid shrink={ true }>
                                            <HInput label={ "Termín od" } required={ false } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("ptch_from") } type={ "datetime-local" } />
                                            <HInput label={ "Termín do" } required={ false } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("ptch_to") } type={ "datetime-local" } />
                                            <HInput label={ "Stav" } required={ false } readOnly={ !this.state.editMode } fieldInfo={ this.managedField("ptch_finished") } type={ "text" } />
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
                                    <HButton buttonStyle={ HButtonStyle.TEXT } action={ "reset" } action2={ this.toggleFileEdit }>
                                        Zrušit změny
                                    </HButton>
                                </span>
                                <HButton buttonStyle={ HButtonStyle.TEXT_INVERTED } action={ this.state.editMode ? "submit" : this.toggleFileEdit }>
                                    { this.state.editMode ? "Uložit změny" : "Upravit záznam" }
                                </HButton>
                            </HFlow>
                        </VBox>
                    </HForm>
                </HCard>
                <div className="reports">
                    <HForm key={ this.state.editModeReport ? 1 : 0 } onSubmit = {this.updateFile}>
                        <h3 className="report-h">Lékařská zpráva</h3>
                        <div className="textarea-container">
                            <textarea name="med-description" id="med-description" defaultValue={this.state.fields.ptch_description}>
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