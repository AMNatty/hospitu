import { EnumRole, ILoginData, IUserData } from "./UserData";
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

export class InternalScreenSectionState implements IApplicationSection {
    readonly sectionType: SectionType;
    readonly loginData: ILoginData;
    readonly sectionState: IInternalApplicationState;
    readonly managedUser?: IUserData;

    constructor(loginData: ILoginData, sectionState?: IInternalApplicationState, managedUser?: IUserData)
    {
        this.sectionType = SectionType.INTERNAL_SCREEN;
        this.loginData = loginData;
        this.managedUser = managedUser;

        if (sectionState)
        {
            this.sectionState = sectionState;
        }
        else
        {
            switch (this.loginData.role)
            {
                case EnumRole.ADMIN:
                    this.sectionState = {
                        internalState: EnumInternalState.ADMIN_PANEL,
                        internalSection: HAdminSection,
                        currentView: HAdminSection.defaultView
                    };
                    break;

                case EnumRole.DOCTOR:
                    this.sectionState = {
                        internalState: EnumInternalState.DOCTOR_PANEL,
                        internalSection: HDoctorSection,
                        currentView: HDoctorSection.defaultView
                    };
                    break;

                case EnumRole.INSURANCE_WORKER:
                    this.sectionState = {
                        internalState: EnumInternalState.INSURANCE_WORKER_PANEL,
                        internalSection: HInsuranceSection,
                        currentView: HInsuranceSection.defaultView
                    };
                    break;

                case EnumRole.PATIENT:
                    this.sectionState = {
                        internalState: EnumInternalState.PATIENT_PANEL,
                        internalSection: HPatientSection,
                        currentView: HPatientSection.defaultView
                    };
                    break;
            }
        }
    }
}

const applicationStateDefault: IApplicationState = {
    loginState: LoginState.LOGGED_OUT,
    currentSection: new LoginScreenSectionState()
};

export  { applicationStateDefault };