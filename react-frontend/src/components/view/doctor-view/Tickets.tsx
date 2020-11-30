import React from "react";
import Axios from "axios";

import { Dispatch } from "redux";
import { IAPIResponse, ILoginData } from "../../../data/UserData";

export class Tickets extends React.Component<{
    dispatch: Dispatch,
    loginData?: ILoginData 
}> {

    render(): JSX.Element
    {
        return (
            <div className="main">
            </div>
        )
    }
}