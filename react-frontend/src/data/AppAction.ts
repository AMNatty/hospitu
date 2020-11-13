import { AppActionType } from "./AppActionType";
import { Action } from "redux";

export interface IAppAction extends Action<AppActionType> {
    type: AppActionType;
}

export class LoginAction implements IAppAction {
    type: AppActionType;

    constructor()
    {
        this.type = AppActionType.LOG_IN;
    }
}

export class LogoutAction implements IAppAction {
    type: AppActionType;

    constructor()
    {
        this.type = AppActionType.LOG_OUT;
    }
}
