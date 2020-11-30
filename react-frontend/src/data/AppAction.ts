import { AppActionType } from "./AppActionType";
import { Action } from "redux";
import { ILoginData } from "./UserData";
import { HView } from "../components/view/HView";

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
