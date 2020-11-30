import React from "react";
import { ILoginData, IUserData } from "../../data/UserData";
import { IInternalApplicationState } from "../../data/AppState";
import { Dispatch } from "redux";

export interface ISectionProps {
    loginData: ILoginData;
    sectionState: IInternalApplicationState;
    dispatch: Dispatch;

    managedUser?: IUserData;
}

export interface IMenuItem {
    readonly icon: string,
    readonly name: string,
    readonly targetView: typeof HView
}

export interface IHSection {
    readonly menuItems: IMenuItem[];
    readonly permitsUserManagement: boolean;
    readonly defaultView: typeof HView
}

export abstract class HView<T extends ISectionProps> extends React.Component<T> {
    protected constructor(props: T)
    {
        super(props);
    }
}