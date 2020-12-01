import { HView, IHSection, ISectionProps } from "../HView";
import React, { ReactNode } from "react";
import receiptWhite from "../../../img/receipt-white-18dp.svg";
import accountLogo from "../../../img/account_circle-white-18dp.svg";
import { HProfileView } from "../user-view/HUserInfo";
import { HFileList } from "./HFileList";
import { CreateHFile } from "./CreateHFile";
import { HFile } from "./HFile";
import { Tickets } from "./Tickets";
import { Ticket } from "./Ticket";
import { CreateTicket } from "./CreateTicket";

export abstract class HDoctorView<T extends ISectionProps> extends HView<T> {
    protected constructor(props: T)
    {
        super(props);
    }
}

export class HDoctorWelcomeView<T extends ISectionProps> extends HDoctorView<T> {
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
            icon: receiptWhite,
            name: "Domů",
            targetView: HDoctorWelcomeView
        },
        {
            icon: accountLogo,
            name: "Správa pacientů",
            targetView: HProfileView
        },
        {
            icon: accountLogo,
            name: "Můj profil",
            targetView: HProfileView
        }
    ],
    permitsUserManagement: true,
    defaultView: HDoctorWelcomeView
};

export { HDoctorSection };