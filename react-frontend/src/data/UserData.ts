export enum EnumRole {
    PATIENT = "PATIENT",
    DOCTOR = "DOCTOR",
    INSURANCE_WORKER = "INSURANCE_WORKER",
    ADMIN = "ADMIN"
}

export interface IAPIResponse {
    readonly code?: number
}

export interface IAPIReadableResponse {
    readonly code: number,
    readonly humanReadableMessage: string
}

export interface IUserSearchResult {
    readonly id: number;
    readonly name: string;
    readonly surname: string;
    readonly role: EnumRole
}

export interface IUserSearch {
    readonly code: number,
    readonly searchResults: IUserSearchResult[]
}

export interface IUserData extends IAPIResponse {
    readonly id: number;
    readonly login: string;
    readonly name: string;
    readonly surname: string;
    readonly role: EnumRole
}

const RoleToNameMap: Record<EnumRole, string> = {
    [EnumRole.PATIENT]: "Pacient",
    [EnumRole.DOCTOR]: "Lékař",
    [EnumRole.INSURANCE_WORKER]: "Pracovník pojišťovny",
    [EnumRole.ADMIN]: "Administrátor"
};

export { RoleToNameMap };

export interface ILoginData extends IUserData {
    readonly token: string;
}