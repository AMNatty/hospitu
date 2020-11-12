export enum LoginState
{
    LOGGED_IN = "LOGGED_IN",
    LOGGED_OUT = "LOGGED_OUT"
}

export interface ApplicationState
{
    loginState: LoginState;
}

