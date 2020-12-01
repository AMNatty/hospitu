import React from "react";
import Axios from "axios";

import { Dispatch } from "redux";
import { IAPIResponse, ILoginData } from "../../../data/UserData";
import { FileData } from "../../../data/doctor-data/HFileData";

import "../../../style/doctor-content.less";

import addIcon from "../../../img/add_circle-white-18dp.svg";

export class HFileList extends React.Component<{
    dispatch: Dispatch,
    loginData: ILoginData 
},{
    fileList: FileData[],
}> {

    constructor(props:never){
        super(props);
        this.state = {
            fileList:[]
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
                    console.log(response.data.fileListData);
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
    }

    render(): JSX.Element
    {
        return (
            <div className="main">
                <div className="table">
                    <div className="th">
                        <h3>Záznamy zdravotních problémů</h3>
                        <button><img src={addIcon} alt="<add>"/> Vytvořit záznam</button>
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
                                    <tr key={fileo.idFile}>
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
            </div>
        );
    }
}