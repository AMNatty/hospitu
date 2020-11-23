import React, { ReactNode } from "react";
import { InternalScreenSectionState } from "../data/AppState";
import { Dispatch } from "redux";
import { LogoutAction } from "../data/AppAction";

import "../style/h-internal-shared.less";

import accountCircleIcon from "../img/account_circle-white-18dp.svg";
import closeIcon from "../img/close-white-18dp.svg";
import appsIcon from "../img/apps-white-18dp.svg";
import receiptIcon from "../img/receipt-white-18dp.svg";
import receiptLongIcon from "../img/receipt_long-white-18dp.svg";
import { HClockDate, HClockTime } from "./HClock";


export class InternalAppScreen extends React.Component<{
    dispatch: Dispatch,
    sectionState: InternalScreenSectionState
}> {
    logout = (): void => {
        this.props.dispatch(new LogoutAction());
    }

    render(): ReactNode
    {
        return (
            <div id="hs-wrapper">
                <div id="hs-menu">
                    <ul>
                        <li className="hs-menu-option">
                            <a href="#" className="hs-menu-current-entity">
                                <div className="hs-menu-current-container">
                                    <div className="hs-menu-option-text hs-menu-current-role">
                                        Pacient:
                                    </div>
                                    <div className="hs-menu-option-text hs-menu-current-name">
                                        Jan Novák
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="hs-menu-option hs-menu-time">
                            <div className="hs-menu-small-box">
                                <table>
                                    <tr>
                                        <td>
                                            Čas:
                                        </td>
                                        <td>
                                            <HClockTime />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Datum:
                                        </td>
                                        <td>
                                            <HClockDate />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </li>
                        <li className="hs-menu-option">
                            <a href="#">
                                <div className="hs-menu-option-img">
                                    <img src={ appsIcon } alt="<calendar>" />
                                </div>
                                <div className="hs-menu-option-text">
                                    Kalendář
                                </div>
                            </a>
                        </li>

                        <li className="hs-menu-free-space">
                        </li>

                        <li className="hs-menu-option">
                            <a href="#">
                                <div className="hs-menu-option-img">
                                    <img src={ accountCircleIcon } alt="<account>" />
                                </div>
                                <div className="hs-menu-option-text">
                                    { this.props.sectionState.loginData.name } { this.props.sectionState.loginData.surname }▼
                                </div>
                            </a>
                        </li>
                        <li className="hs-menu-option">
                            <a href="#" onClick={this.logout}>
                                <div className="hs-menu-option-img">
                                    <img src={ closeIcon } alt="<logout>" />
                                </div>
                                <div className="hs-menu-option-text">
                                    Odhlásit
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div id="hs-app-container">
                    <div id="hs-app-menu">
                        <ul>
                            <li>
                                <a href="#">
                                    <img src={ receiptIcon } alt="+" />
                                    <span className="hs-app-menu-label">
                                        Moje recepty
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src={ receiptLongIcon } alt="..." />
                                    <span className="hs-app-menu-label">
                                        Lorem ipsum
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div id="hs-app-viewport">
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}