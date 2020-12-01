import React from "react";
import Axios from "axios";

import { Dispatch } from "redux";
import { IAPIResponse, ILoginData } from "../../../data/UserData";
import { TicketData } from "../../../data/doctor-data/TicketData";
import { DoctorData } from "../../../data/doctor-data/DoctorData";

import  "../../../style/healthFiles.less";
import "../../../style/doctor-content.less";

import addIcon from "../../../img/add_circle-white-18dp.svg";
import { HForm } from "../../HForm";
import { HButton, HButtonStyle } from "../../HButton";

export class Tickets extends React.Component<{
    dispatch: Dispatch,
    loginData: ILoginData 
},{
    ticketList: TicketData[],
    doctorList: DoctorData[]
}> {

    constructor(props:never){
        super(props);
        this.state = {
            ticketList:[],
            doctorList:[]
        };
    }

    componentDidMount() : void {
        Axios({
            url: "/tickets/info",
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
                        ticketList : response.data.ticketListData as TicketData[]
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

    createTicket() : void {
        return;
    }

    test() : void {
        return;
    }

    send() : void {
        return;
    }

    render(): JSX.Element
    {
        return (
            <div className="main">
                <div className="table">
                    <div className="th">
                        <h3>Záznamy vyšetření</h3>
                        <button onSubmit={this.createTicket}><img src={addIcon} alt="<add>"/> Stanovit vyšetření</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Název vyšetření</th>
                                <th>Cena</th>
                                <th>Stav</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.ticketList.map(ticket => (
                                    <tr key={ticket.idTicket}>
                                        <td>{ticket.name}</td>
                                        <td>{ticket.price} kč</td>
                                        <td>{(ticket.performed) ? "Čekající" : "Vyřízený"}</td>
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
                <div className="send-insurance">
                    <h3 className="header-switch">Poslat pojišťovně</h3>
                    <HForm onSubmit={this.test}>
                        <div className="send-ticket">
                            <div className="ticket-to">
                                <div className="selector-container">
                                    <label htmlFor="ticket-select">Vybrat vyšetření: </label>
                                    <select name="ticket-select" id="ticket-select" className="ticket-select">
                                        {
                                            this.state.ticketList.map(ticket =>(
                                                <option key={ticket.idFile} value={ticket.idFile}>{ticket.name}</option> 
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="fill-space"></div>
                            <div className="send-button">
                                <HButton action={ this.send } buttonStyle={ HButtonStyle.TEXT_INVERTED }>
                                    Poslat
                                </HButton>
                            </div>
                        </div>
                    </HForm>
                </div>
                <div className="switch">
                    <h3 className="header-switch">Převést vyšetření</h3>
                    <HForm onSubmit={this.test}>
                        <div className="switch-file">
                            <div className="file-to">
                                <div className="selector-container">
                                    <label htmlFor="ticket-select">Vybrat vyšetření: </label>
                                    <select name="ticket-select" id="ticket-select" className="ticket-select">
                                        {
                                            this.state.ticketList.map(ticket =>(
                                                <option key={ticket.idFile} value={ticket.idFile}>{ticket.name}</option> 
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="to-doctor">
                                <div className="selector-container">
                                    <label htmlFor="doctor-select">Převést lékaři: </label>
                                    <select name="doctor-select" id="doctor-select" className="doctor-select">
                                        {
                                            this.state.doctorList.map(doctor =>(
                                            <option key={doctor.idDoctor} value={doctor.idDoctor}>{doctor.firstName} {doctor.lastName}</option> 
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="approve">
                                <HButton action={ this.test } buttonStyle={ HButtonStyle.TEXT_INVERTED }>
                                    Převést
                                </HButton>
                            </div>
                        </div>
                    </HForm>
                </div>
            </div>
        )
    }
}