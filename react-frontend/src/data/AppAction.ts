import { AppActionType } from "./AppActionType";
import { Action } from "redux";
import { IExtendedUserData, ILoginData } from "./UserData";
import { HView } from "../components/view/HView";
import { IInternalApplicationState } from "./AppState";

export interface IAppAction extends Action<AppActionType> {
    readonly type: AppActionType;
}

export class LoginAction implements IAppAction {
    readonly type: AppActionType;
    readonly loginData: ILoginData;

    constructor(userToken: ILoginData)
    {
        this.type = AppActionType.LOG_IN;
        this.loginData = userToken;
    }
}

export class LogoutAction implements IAppAction {
    readonly type: AppActionType;

    constructor()
    {
        this.type = AppActionType.LOG_OUT;
    }
}

export class SwitchViewAction implements IAppAction {
    readonly type: AppActionType;
    readonly targetView: typeof HView;

    constructor(targetView: typeof HView)
    {
        this.type = AppActionType.SWITCH_VIEW;
        this.targetView = targetView;
    }
}

export class SwitchSectionAction implements IAppAction {
    readonly type: AppActionType;
    readonly targetSection: IInternalApplicationState

    constructor(tgtSection: IInternalApplicationState)
    {
        this.type = AppActionType.SWITCH_SECTION;
        this.targetSection = tgtSection;
    }
}

export class UpdateSelfUserAction implements IAppAction {
    readonly type: AppActionType;
    readonly userData: IExtendedUserData

    constructor(userData: IExtendedUserData)
    {
        this.type = AppActionType.UPDATE_SELF_USER;
        this.userData = userData;
    }
}

export class SwitchManagedUserAction implements IAppAction {
    readonly type: AppActionType;
    readonly userData: IExtendedUserData | null

    constructor(userData: IExtendedUserData | null)
    {
        this.type = AppActionType.SWITCH_MANAGED_USER;
        this.userData = userData;
    }
}


export class UpdateManagedUserAction implements IAppAction {
    readonly type: AppActionType;
    readonly userData: IExtendedUserData

    constructor(userData: IExtendedUserData)
    {
        this.type = AppActionType.UPDATE_MANAGED_USER;
        this.userData = userData;
    }
}
