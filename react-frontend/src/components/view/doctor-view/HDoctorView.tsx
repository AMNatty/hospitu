import { HView, IHSection, ISectionProps } from "../HView";
import React, { ReactNode } from "react";
import homeIcon from "../../../img/home-white-18dp.svg";
import receiptWhite from "../../../img/receipt-white-18dp.svg";
import accountLogo from "../../../img/account_circle-white-18dp.svg";
import { HOtherProfileView, HSelfProfileView } from "../user-view/HUserInfo";
import { HFileList } from "./HFileList";
import { Tickets } from "./Tickets";
import { CreatePatient } from "./CreatePatient";
import { UnPatientsList } from "./UnPatientsList";
import { PatientList } from "./PatientList";

export abstract class HDoctorView<T extends ISectionProps> extends HView<T> {
    protected constructor(props: T)
    {
        super(props);
    }
}

export class HFileListView<T extends ISectionProps> extends HView<T> {
    constructor(props: T)
    {
        super(props);
    }

    render(): ReactNode
    {
        return (
            <HFileList dispatch={this.props.dispatch} loginData={this.props.loginData}>
            </HFileList>
        );
    }
}

export class HTicketListView<T extends ISectionProps> extends HView<T> {
    constructor(props: T)
    {
        super(props);
    }

    render(): ReactNode
    {
        return (
            <Tickets dispatch={this.props.dispatch} loginData={this.props.loginData}>
            </Tickets>
        );
    }
}

export class HCreatePatientView<T extends ISectionProps> extends HView<T> {
    constructor(props: T)
    {
        super(props);
    }

    render(): ReactNode
    {
        return (
            <CreatePatient dispatch={this.props.dispatch} loginData={this.props.loginData}>
            </CreatePatient>
        );
    }
}

export class HUnPatientsListView<T extends ISectionProps> extends HView<T> {
    constructor(props: T)
    {
        super(props);
    }

    render(): ReactNode
    {
        return (
            <UnPatientsList dispatch={this.props.dispatch} loginData={this.props.loginData}>
            </UnPatientsList>
        );
    }
}

export class HChangePatient<T extends ISectionProps> extends HView<T> {
    constructor(props: T)
    {
        super(props);
    }

    render(): ReactNode
    {
        return (
            <PatientList dispatch={this.props.dispatch} loginData={this.props.loginData}>
            </PatientList>
        );
    }
}

export class HDoctorWelcomeView<T extends ISectionProps> extends HDoctorView<T> {
    requiresUserManagement = (): boolean => true;
    constructor(props: T)
    {
        super(props);
    }

    render(): ReactNode
    {
        return (
            <h1>
                Vítejte v panelu lékaře!
            </h1>
        );
    }
}

const HDoctorSection: IHSection = {
    menuItems: [
        {
            icon: homeIcon,
            name: "Domů",
            targetView: HDoctorWelcomeView
        },
        {
            icon: receiptWhite,
            name: "Spravovat záznamy",
            targetView: HFileListView
        },
        {
            icon: receiptWhite,
            name: "Spravovat vyšetření",
            targetView: HTicketListView
        },
        {
            icon: accountLogo,
            name: "Vytvořit pacienta",
            targetView: HCreatePatientView
        },
        {
            icon: accountLogo,
            name: "Zařadit pacienta",
            targetView: HUnPatientsListView
        },
        {
            icon: accountLogo,
            name: "Úpravy pacientů",
            targetView: HChangePatient
        },
        {
            icon: accountLogo,
            name: "Správa pacientů",
            targetView: HOtherProfileView
        },
        {
            icon: accountLogo,
            name: "Můj profil",
            targetView: HSelfProfileView
        }
    ],
    permitsUserManagement: true,
    defaultView: HDoctorWelcomeView
};

export { HDoctorSection };