import React, { ReactNode } from "react";
import Axios from "axios";

import { Dispatch } from "redux";
import { IAPIResponse, ILoginData } from "../../../data/UserData";
import { FileData } from "../../../data/doctor-data/HFileData";
import { DoctorData } from "../../../data/doctor-data/DoctorData";
import { HButton, HButtonStyle } from "../../HButton";
import { HForm } from "../../HForm";

import  "../../../style/healthFiles.less";
import "../../../style/doctor-content.less";

import addIcon from "../../../img/add_circle-white-18dp.svg";
import { CreateHFile } from "./CreateHFile";
import { HFile } from "./HFile";

enum HFileDisplayData
{
    HFileTable,
    HFileCreate,
    HFile
}

export class HFileList extends React.Component<{
    dispatch: Dispatch,
    loginData: ILoginData 
},{
    fileList: FileData[],
    doctorList: DoctorData[],
    screenState: HFileDisplayData,
    fileData: FileData,
    fileVal: string,
    doctorVal: string
}> {

    constructor(props:never){
        super(props);
        this.state = {
            fileList:[],
            doctorList:[],
            screenState: HFileDisplayData.HFileTable,
            fileData: {
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
            fileVal: "1",
            doctorVal: this.props.loginData.id.toString()
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
                    const myFileListData = response.data.fileListData as FileData[];
                    let tmpList : FileData[] = [];
                    for(let i = 0; i < myFileListData.length; i++){
                        if(myFileListData[i].idDoctor === this.props.loginData.id){
                            tmpList.push(myFileListData[i]);
                        }
                    }
                    this.setState(() => ({
                        fileList : tmpList
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

    switchD = (): void => {
        setTimeout(() => {
            Axios({
                url: "/hFile/switch",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.props.loginData.token
                },
                data: {
                    idFile: this.state.fileVal,
                    idDoctor: this.state.doctorVal
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

    createFile = (): void => {
        switch(this.state.screenState){
            case HFileDisplayData.HFileTable:
                this.setState({
                    screenState: HFileDisplayData.HFileCreate
                });
                break;
            default:
                break;
        }
    }

    changeFile = (fileo : FileData): void => {
        switch(this.state.screenState){
            case HFileDisplayData.HFileTable:
                this.setState({
                    fileData : fileo,
                    screenState: HFileDisplayData.HFile
                });
                break;
            default:
                break;
        }
    }

    chooseFile = (val : string) : void => {
        this.setState({
            fileVal: val.toString()
        })
    }

    chooseDoctor = (val : string) : void => {
        this.setState({
            doctorVal: val.toString()
        })
    }

    render(): ReactNode
    {
        let content : ReactNode;

        switch(this.state.screenState){
            case HFileDisplayData.HFileTable:
                content = (
                    <div className="main">
                        <div className="table">
                            <div className="th">
                                <h3>Záznamy zdravotních problémů</h3>
                                <button onClick={this.createFile}><img src={addIcon} alt="<add>"/> Vytvořit záznam</button>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Název záznamu</th>
                                        <th>Pacient</th>
                                        <th>Stav</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.fileList.map(fileo => (
                                            <tr key={fileo.idFile} onClick={() => this.changeFile(fileo)}>
                                                <td>{fileo.name}</td>
                                                <td>{fileo.patientFirstName} {fileo.patientLastName}</td>
                                                <td>{(fileo.finished) ? "Čeká na vyšetření" : "Ukončen"}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="pagination">
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
                        <div className="switch">
                            <h3 className="header-switch">Převést Záznam</h3>
                            <HForm onSubmit={this.switchD}>
                                <div className="switch-file">
                                    <div className="file-to">
                                        <div className="selector-container">
                                            <label htmlFor="ticket-select-again">Vybrat záznam: </label>
                                            <select name="ticket-select-again" id="ticket-select-again" className="ticket-select-again" onChange={(e) => this.chooseFile(e.target.value)}>
                                                {
                                                    this.state.fileList.map(fileo =>(
                                                        <option key={fileo.idFile} value={fileo.idFile}>{fileo.name}</option> 
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="to-doctor">
                                        <div className="selector-container">
                                            <label htmlFor="doctor-select">Převést lékaři: </label>
                                            <select name="doctor-select" id="doctor-select" className="doctor-select" onChange={(e) => this.chooseDoctor(e.target.value)}>
                                                {
                                                    this.state.doctorList.map(doctor =>(
                                                    <option key={doctor.idDoctor} value={doctor.idDoctor}>{doctor.firstName} {doctor.lastName}</option> 
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="approve">
                                        <HButton action={ "submit" } buttonStyle={ HButtonStyle.TEXT_INVERTED }>
                                            Převést
                                        </HButton>
                                    </div>
                                </div>
                            </HForm>
                        </div>
                    </div>
                );
                break;
            case HFileDisplayData.HFileCreate:
                content = (
                    <CreateHFile dispatch={this.props.dispatch} loginData={this.props.loginData}>
                    </CreateHFile>
                );
                break;
            case HFileDisplayData.HFile:
                content = (
                    <HFile dispatch={this.props.dispatch} loginData={this.props.loginData} fileData={this.state.fileData}>
                    </HFile>
                );
                break;
        }

        return (
            content
        );
    }
}