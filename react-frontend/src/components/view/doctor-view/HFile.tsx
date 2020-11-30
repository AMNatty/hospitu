import React from "react";
import Axios from "axios";

import { Dispatch } from "redux";
import { IAPIResponse, ILoginData } from "../../../data/UserData";
import { FileData} from "../../../data/HFileData";
import { DoctorData } from "../../../data/DoctorData";
import { HFlow, HInput } from "../../HInput";
import { HForm, HFormComponent, HFieldInfo } from "../../HForm";
import { VBox } from "../../HCard";
import { HButton, HButtonStyle } from "../../HButton";

import "../style/healthFiles.less"
import "../style/p-profile.less";

export class HFile extends HFormComponent<{
    dispatch: Dispatch,
    loginData: ILoginData 
}, {
    fileList: FileData[],
    fields: {
        ptch_name: string,
        ptch_description: string,
        ptch_from: string,
        ptch_to: string,
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
            fields: {
                ptch_name: "",
                ptch_description: "",
                ptch_from: "",
                ptch_to: "",
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
                        <div className="left-side">
                            <VBox>
                                <HInput fieldInfo={ this.managedField("ptch_name")} label={"Název záznamu"} type={"text"} readOnly={true}>
                                </HInput>
                                <HInput fieldInfo={ this.managedField("ptch_description")} label={"Zpráva"} type={"text"} readOnly={true}>
                                </HInput>
                                <HInput fieldInfo={ this.managedField("ptch_from")} label={"Název záznamu"} type={"datetime-local"} readOnly={true}>
                                </HInput>
                                <HInput fieldInfo={ this.managedField("ptch_to")} label={"Název záznamu"} type={"datetime-local"} readOnly={true}>
                                </HInput>
                            </VBox>
                        </div>
                        <div className="right-side">
                            <VBox>
                                <HInput fieldInfo={ this.managedField("us_name")} label={"Jméno"} type={"text"} readOnly={true}>
                                </HInput>
                                <HInput fieldInfo={ this.managedField("us_surname")} label={"Příjmení"} type={"text"} readOnly={true}>
                                </HInput>
                                <HInput fieldInfo={ this.managedField("pt_allergies")} label={"Alergeny"} type={"datetime-local"} readOnly={true}>
                                </HInput>
                                <HInput fieldInfo={ this.managedField("pt_condition")} label={"Potíže"} type={"datetime-local"} readOnly={true}>
                                </HInput>
                            </VBox>
                        </div>
                    </div>
                    <div className="button-container">
                        <HButton action={ "submit" }>
                            Povolit úpravy
                        </HButton>
                        <HButton action={ "submit" }>
                            Uložit
                        </HButton>
                    </div>
                </HForm>
                <div className="reports">
                    <h3 className="report-h">Lékařské zprávy</h3>
                    {/*tady description*/}
                </div>
            </div>
        )
    }
}