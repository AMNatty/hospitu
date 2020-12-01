import { HView, IHSection, ISectionProps } from "../HView";
import React, { ReactNode } from "react";
import homeIcon from "../../../img/home-white-18dp.svg";
import receiptWhite from "../../../img/receipt-white-18dp.svg";
import accountLogo from "../../../img/account_circle-white-18dp.svg";
import { HOtherProfileView, HSelfProfileView } from "../user-view/HUserInfo";
import { HFileList } from "./HFileList";
import { Tickets } from "./Tickets";

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