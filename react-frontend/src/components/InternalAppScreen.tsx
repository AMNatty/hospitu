import React, { ReactNode } from "react";
import { internalAppStateFromRole, InternalScreenSectionState } from "../data/AppState";
import { Dispatch } from "redux";
import { LogoutAction, SwitchSectionAction, SwitchViewAction } from "../data/AppAction";

import "../style/h-internal-shared.less";

import accountCircleIcon from "../img/account_circle-white-18dp.svg";
import closeIcon from "../img/close-white-18dp.svg";
import appsIcon from "../img/apps-white-18dp.svg";
import { HClockDate, HClockTime } from "./HClock";
import { HView } from "./view/HView";
import { HProfileView } from "./view/user-view/HUserInfo";
import { EnumRole, RoleToNameMap } from "../data/UserData";
import { VBox } from "./HCard";


export class InternalAppScreen extends React.Component<{
    dispatch: Dispatch,
    currentView: typeof HView,
    sectionState: InternalScreenSectionState
}> {
    logout = (): void => {
        this.props.dispatch(new LogoutAction());
    }

    render(): ReactNode
    {
        const ViewComponent = this.props.currentView;

        let sectionChooser: ReactNode | null = null;

        const role = this.props.sectionState.loginData.role;

        if (role !== EnumRole.PATIENT)
        {
            const fields: ReactNode[] = [
                <option key={ EnumRole.PATIENT.toString() } value={ EnumRole.PATIENT }>
                    { RoleToNameMap[EnumRole.PATIENT] }
                </option>
            ];

            if (role === EnumRole.ADMIN)
            {
                fields.push((
                    <option key={ EnumRole.ADMIN.toString() } value={ EnumRole.ADMIN }>
                        { RoleToNameMap[EnumRole.ADMIN] }
                    </option>
                ));
            }

            if (role === EnumRole.ADMIN || role === EnumRole.INSURANCE_WORKER)
            {
                fields.push((
                    <option key={ EnumRole.INSURANCE_WORKER.toString() } value={ EnumRole.INSURANCE_WORKER }>
                        { RoleToNameMap[EnumRole.INSURANCE_WORKER] }
                    </option>
                ));
            }

            if (role === EnumRole.ADMIN || role === EnumRole.DOCTOR)
            {
                fields.push((
                    <option key={ EnumRole.DOCTOR.toString() } value={ EnumRole.DOCTOR }>
                        { RoleToNameMap[EnumRole.DOCTOR] }
                    </option>
                ));
            }

            sectionChooser = (
                <li className="hs-menu-option">
                    <div className="hs-menu-small-box">
                        <VBox>
                            <label htmlFor={ "hs-role-chooser" }>Pracovat jako</label>
                            <select id={ "hs-role-chooser" } onChange={ event => this.props.dispatch(new SwitchSectionAction(internalAppStateFromRole(event.target.value as EnumRole))) } defaultValue={ role }>
                                {
                                    fields
                                }
                            </select>
                        </VBox>
                    </div>
                </li>
            );
        }

        return (
            <div id="hs-wrapper">
                <div id="hs-menu">
                    <ul>
                        <li className="hs-menu-option">
                            <a href="#" className="hs-menu-current-entity">
                                <div className="hs-menu-current-container">
                                    <div className="hs-menu-option-text hs-menu-current-role">
                                        { RoleToNameMap[this.props.sectionState.loginData.role] }:
                                    </div>
                                    <div className="hs-menu-option-text hs-menu-current-name">
                                        { this.props.sectionState.loginData.name } { this.props.sectionState.loginData.surname }
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="hs-menu-option hs-menu-time">
                            <div className="hs-menu-small-box">
                                <table>
                                    <tbody>
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
                                    </tbody>
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

                        {
                            sectionChooser
                        }

                        <li className="hs-menu-option">
                            <a href="#" onClick={ () => this.props.dispatch(new SwitchViewAction(HProfileView)) }>
                                <div className="hs-menu-option-img">
                                    <img src={ accountCircleIcon } alt="<account>" />
                                </div>
                                <div className="hs-menu-option-text">
                                    { this.props.sectionState.loginData.name } { this.props.sectionState.loginData.surname }
                                </div>
                            </a>
                        </li>
                        <li className="hs-menu-option">
                            <a href="#" onClick={ this.logout }>
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
                            {
                                this.props.sectionState.sectionState.internalSection.menuItems.map(menuItem => (
                                    <li key={ menuItem.name }>
                                        <a href="#" onClick={ () => this.props.dispatch(new SwitchViewAction(menuItem.targetView)) }>
                                            <img src={ menuItem.icon } alt={ menuItem.name } />
                                            <span className="hs-app-menu-label">
                                                { menuItem.name }
                                            </span>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div id="hs-app-viewport">
                        {
                            <ViewComponent dispatch={ this.props.dispatch } loginData={ this.props.sectionState.loginData } sectionState={ this.props.sectionState.sectionState }  />
                        }
                    </div>
                </div>
            </div>
        );
    }
}