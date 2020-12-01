import React from "react";
import { ILoginData, IUserSearchResult } from "../../data/UserData";
import { IInternalApplicationState } from "../../data/AppState";
import { Dispatch } from "redux";

export interface ISectionProps {
    loginData: ILoginData;
    sectionState: IInternalApplicationState;
    dispatch: Dispatch;

    managedUser?: IUserSearchResult;

    requiresUserManagementCallback: (enabled: boolean) => void
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
    requiresUserManagement = (): boolean => false;

    componentDidMount(): void
    {
        this.props.requiresUserManagementCallback(this.requiresUserManagement());
    }
}