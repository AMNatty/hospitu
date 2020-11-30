import React from "react";
import Axios from "axios";

import { Dispatch } from "redux";
import { IAPIResponse, ILoginData } from "../../../data/UserData";

import "../../../style/p-profile.less";

import accountCircleIcon from "../../../img/account_circle-white-18dp.svg";

export class DoctorProfile extends React.Component<{
        dispatch: Dispatch,
        loginData?: ILoginData 
}> {

    render(): JSX.Element
    {
        return (
            <div className="main">
                <div className="container">
                    <div className="info">
                        <h3 className="profileHeader">Základní informace</h3>
                        <img className="accountImage" src={ accountCircleIcon } alt="<account>"/>
                        <div className="profile-input half-input">
                            <label htmlFor="first_name">Jméno</label>  
                            <input type="text" className="non-selectable" id="first_name" name="first_name" value="Filip" readOnly/><br/>
                        </div>
                        <div className="profile-input half-input">
                            <label htmlFor="last_name">Příjmení</label>  
                            <input type="text" className="non-selectable" id="last_name" name="last_name" value="Václavík" readOnly/><br/>
                        </div>
                        <div className="profile-input half-input aside">
                            <label htmlFor="birthdate">Datum narození</label>  
                            <input type="text" className="non-selectable" id="birthdate" name="birthdate" value="1978-04-05" readOnly/><br/>
                        </div>
                        <div className="profile-input half-input aside">
                            <label htmlFor="birthid">Rodné číslo</label>  
                            <input type="text" className="non-selectable" id="birthid" name="birthid" value="156123/5614" readOnly/><br/>
                        </div>
                        <div className="profile-input half-input aside">
                            <label htmlFor="first_name">Telefon</label>  
                            <input type="text" className="non-selectable" id="phone" name="phone" value="123456789" readOnly/><br/>
                        </div>
                        <div className="profile-input half-input aside">
                            <label htmlFor="first_name">Email</label>  
                            <input type="text" className="non-selectable" id="email" name="email" value="lekar@seznam.cz" readOnly/><br/>
                        </div>
                    </div>
                    <div className="medinfo">
                        <h3 className="profileHeader">Nemocniční údaje</h3>
                        <div className="profile-input half-input aside">
                            <label htmlFor="shift_since">Směna od</label>  
                            <input type="text" className="non-selectable" id="shift_since" name="shift_since" value="06:00:00" readOnly/><br/>
                        </div>
                        <div className="profile-input half-input aside">
                            <label htmlFor="shift_until">Směna do</label>  
                            <input type="text" className="non-selectable" id="shift_until" name="shift_until" value="14:30:00" readOnly/><br/>
                        </div>
                        <div className="profile-input half-input aside">
                            <label htmlFor="department">Na oddělení</label>  
                            <input type="text" className="non-selectable" id="department" name="department" value="Infekční oddělení" readOnly/><br/>
                        </div>
                        <div className="profile-input half-input aside">
                            <label htmlFor="door">Místo</label>  
                            <input type="text" className="non-selectable" id="door" name="door" value="C107" readOnly/><br/>
                        </div>
                        <div className="profile-input full-input">
                            <label htmlFor="patient">Pacienti</label>  
                            <input type="text" className="non-selectable" id="patient" name="patient" value="Filip Václavík" readOnly/><br/>
                        </div>
                        <div className="profile-input full-input">
                            <label htmlFor="taken_patient">Převzaní pacienti</label>  
                            <input type="text" className="non-selectable" id="taken_patient" name="taken_patient" value="-" readOnly/><br/>
                        </div>
                    </div>
                    <div className="button-container">
                        <button id="change">Povolit úpravy</button>
                    </div>
                </div>
            </div>
        )
    }
}