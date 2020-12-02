import React, {ReactNode} from "react";
import loginImg from "../img/avatar.svg";
import add_img from "../img/add_img.svg";
import Axios from "axios";
import {IAPIResponse, ILoginData} from "../../../data/UserData";
import {InternalScreenSectionState} from "../../../data/AppState";
import {HView, ISectionProps} from "../HView";
import "../../../style/photo.less";
import {HInput} from "../../HInput";
import {HGrid} from "../../HCard";

interface AdminData {
    us_id: number,
    us_login: string,
    us_name: string,
    us_surname: string,
    us_perms: string,
}

interface AdminResponse extends IAPIResponse {
    admin_response: AdminData[]
}

export class AdminTable extends React.Component<{
    loginData: ILoginData
}, {
    editMode: boolean,
    adminData: AdminData[]
}> {

    constructor(props:never) {
        super(props);

        this.state = {
            editMode: false,
            adminData:[]
        };
    }

    toggleProfileEdit = (): void => {
        this.setState(state => ({
            editMode: !state.editMode
        }));
    }

    updateProfile = (): void => {
        // TODO

        this.setState({
            editMode: false
        });
    }

    componentDidMount(): void {

        Axios({
            url: "/admin/info",
            headers: {
                Authorization: "Bearer " + this.props.loginData.token
            },
            method: "GET", // get
            data: {

            }
        }).then((response) => {
            const apiResponse = response.data as IAPIResponse;

            switch (apiResponse.code)
            {
                case 200:
                {
                    console.log(response.data);
                    const responseData = apiResponse as AdminResponse;
                    this.setState(() => ({
                        adminData: responseData.admin_response
                    }));
                    break;
                }

                case 404:

                    break;

                default:

            }
        }).catch((e) => {
            console.log(e);
        });

    }

    render(): ReactNode {
        console.log(this.state.adminData.length);
        if (!this.state.adminData.length) {
            return (<div></div>);
        }
        for (let i = 0; i < this.state.adminData.length; i++) {
            //if (this.state.adminData[i].first_name === this.props.sectionState.loginData.name) {
                return (
                    <div>
                        <div>

                        </div>
                        <div>
                            <table id="tabulka">
                                <thead>
                                <tr id="prvek">
                                    <th id="nadpis">Identifikator</th>
                                    <th id="nadpis">Jmeno</th>
                                    <th id="nadpis">Prijmeni</th>
                                    <th id="nadpis">Login</th>
                                    <th id="nadpis">Role</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.adminData.map(admin => (
                                        <tr key={admin.us_id} id="prvek">
                                            <td id="prvek">{admin.us_id}</td>
                                            <td id="prvek">{admin.us_name}</td>
                                            <td id="prvek">{admin.us_surname}</td>
                                            <td id="prvek">{admin.us_login}</td>
                                            <td id="prvek">{admin.us_perms}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>


                );
            }
        //}
    }
}

export class Tabulka<T extends ISectionProps> extends HView<T> {
    constructor(props: T)
    {
        super(props);
    }

    render(): ReactNode
    {
        return (
            <AdminTable loginData={this.props.loginData}/>
        );
    }
}