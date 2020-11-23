export enum EnumRole {
    PATIENT = "PATIENT",
    DOCTOR = "DOCTOR",
    INSURANCE_WORKER = "INSURANCE_WORKER",
    ADMIN = "ADMIN"
}

export interface IAPIResponse {
    readonly code?: number
}

export interface IUserData extends IAPIResponse {
    readonly id: number;
    readonly login: string;
    readonly name: string;
    readonly surname: string;
    readonly role: EnumRole
}

export interface ILoginData extends IUserData {
    readonly token: string;
}