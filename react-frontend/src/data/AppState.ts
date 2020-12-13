import { EnumRole, IExtendedUserData, ILoginData, IUserData } from "./UserData";
import { HView, IHSection } from "../components/view/HView";
import { HPatientSection } from "../components/view/patient-view/HPatientView";
import { HDoctorSection } from "../components/view/doctor-view/HDoctorView";
import { HInsuranceSection } from "../components/view/insurance-view/HInsuranceView";
import { HAdminSection } from "../components/view/admin-view/HAdminView";

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

export enum EnumInternalState {
    ADMIN_PANEL = "ADMIN_PANEL",
    DOCTOR_PANEL = "DOCTOR_PANEL",
    INSURANCE_WORKER_PANEL = "INSURANCE_WORKER_PANEL",
    PATIENT_PANEL = "PATIENT_PANEL"
}

export interface IInternalApplicationState {
    internalState: EnumInternalState;
    internalSection: IHSection
    currentView: typeof HView
}

export function internalAppStateFromRole(role: EnumRole): IInternalApplicationState
{
    switch (role)
    {
        case EnumRole.ADMIN:
            return {
                internalState: EnumInternalState.ADMIN_PANEL,
                internalSection: HAdminSection,
                currentView: HAdminSection.defaultView
            };

        case EnumRole.DOCTOR:
            return {
                internalState: EnumInternalState.DOCTOR_PANEL,
                internalSection: HDoctorSection,
                currentView: HDoctorSection.defaultView
            };

        case EnumRole.INSURANCE_WORKER:
            return {
                internalState: EnumInternalState.INSURANCE_WORKER_PANEL,
                internalSection: HInsuranceSection,
                currentView: HInsuranceSection.defaultView
            };

        case EnumRole.PATIENT:
            return  {
                internalState: EnumInternalState.PATIENT_PANEL,
                internalSection: HPatientSection,
                currentView: HPatientSection.defaultView
            };
    }
}

export class InternalScreenSectionState implements IApplicationSection {
    readonly sectionType: SectionType;
    readonly loginData: ILoginData;
    readonly sectionState: IInternalApplicationState;
    readonly managedUser?: IExtendedUserData;

    constructor(loginData: ILoginData, sectionState?: IInternalApplicationState, managedUser?: IExtendedUserData)
    {
        this.sectionType = SectionType.INTERNAL_SCREEN;
        this.loginData = loginData;
        this.managedUser = managedUser;
        this.sectionState = sectionState ?? internalAppStateFromRole(loginData.role);
    }
}

const applicationStateDefault: IApplicationState = {
    loginState: LoginState.LOGGED_OUT,
    currentSection: new LoginScreenSectionState()
};

export  { applicationStateDefault };