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

export interface IUserSearchResultExtended extends IUserSearchResult{
    readonly id: number;
    readonly name: string;
    readonly surname: string;
    readonly role: EnumRole
    readonly birthDate: string | null;
}

export interface IUserSearch {
    readonly code: number,
    readonly searchResults: IUserSearchResult[]
}

export interface IUserSearchExtended {
    readonly code: number,
    readonly searchResults: IUserSearchResultExtended[]
}

export interface IUserData extends IAPIResponse {
    readonly id: number;
    readonly login: string;
    readonly name: string;
    readonly surname: string;
    readonly role: EnumRole
}

export interface IExtendedUserData extends IAPIResponse {
    readonly id: number;
    readonly login: string;
    readonly name: string;
    readonly surname: string;
    readonly role: EnumRole
    readonly birthDate: string;
    readonly birthID: string;
    readonly email: string;
    readonly phone: string;
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