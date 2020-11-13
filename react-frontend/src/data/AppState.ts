export enum LoginState
{
    LOGGED_IN = "LOGGED_IN",
    LOGGED_OUT = "LOGGED_OUT"
}

export interface IApplicationState
{
    loginState: LoginState;
}

const applicationStateDefault: IApplicationState = {
    loginState: LoginState.LOGGED_OUT
};

export  { applicationStateDefault };