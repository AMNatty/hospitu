import { HView, IHSection, ISectionProps } from "../HView";
import { HPatientView } from "../patient-view/HPatientView";
import React, { ReactNode } from "react";
import receiptWhite from "../../../img/receipt-white-18dp.svg";
import accountLogo from "../../../img/account_circle-white-18dp.svg";
import { HProfileView } from "../user-view/HUserInfo";

export abstract class HAdminView<T extends ISectionProps> extends HView<T> {
    protected constructor(props: T)
    {
        super(props);
    }
}

export class HAdminWelcomeView<T extends ISectionProps> extends HPatientView<T> {
    constructor(props: T)
    {
        super(props);
    }

    render(): ReactNode
    {
        return (
            <h1>
                Vítejte v administrátorském panelu!
            </h1>
        );
    }
}

const HAdminSection: IHSection = {
    menuItems: [
        {
            icon: receiptWhite,
            name: "Domů",
            targetView: HAdminWelcomeView
        },
        {
            icon: accountLogo,
            name: "Správa uživatelů",
            targetView: HProfileView
        },
        {
            icon: accountLogo,
            name: "Můj profil",
            targetView: HProfileView
        }
    ],
    permitsUserManagement: true,
    defaultView: HAdminWelcomeView
};

export { HAdminSection };