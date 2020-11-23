import { ILoginData } from "./UserData";

export enum LoginState {
    LOGGED_IN = "LOGGED_IN",
    LOGGED_OUT = "LOGGED_OUT"
}

export enum SectionType {
    LOGIN_SCREEN = "LOGIN_SCREEN",
    INTERNAL_SCREEN = "INTERNAL_SCREEN",
}

export interface IApplicationSection {
    sectionType: SectionType
}

export interface IApplicationState {
    loginState: LoginState;
    currentSection: IApplicationSection;
}

export class LoginScreenSectionState implements IApplicationSection {
    readonly sectionType: SectionType;

    constructor()
    {
        this.sectionType = SectionType.LOGIN_SCREEN;
    }
}

export class InternalScreenSectionState implements IApplicationSection {
    readonly sectionType: SectionType;
    readonly loginData: ILoginData;

    constructor(loginData: ILoginData)
    {
        this.sectionType = SectionType.INTERNAL_SCREEN;
        this.loginData = loginData;
    }
}

const applicationStateDefault: IApplicationState = {
    loginState: LoginState.LOGGED_OUT,
    currentSection: new LoginScreenSectionState()
};

export  { applicationStateDefault };