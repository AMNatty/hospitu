export enum EnumRole {
    PATIENT = "PATIENT",
    DOCTOR = "DOCTOR",
    INSURANCE_WORKER = "INSURANCE_WORKER",
    ADMIN = "ADMIN"
}

export interface IAPIResponse {
    code?: number
}

export interface IUserData extends IAPIResponse{
    readonly id: number;
    readonly login: string;
    name: string;
    surname: string;
    role: EnumRole
}

export interface ILoginData extends IUserData{
    readonly id: number;
    readonly login: string;
    name: string;
    surname: string;
    role: EnumRole;

    token: string;
}