import { HView, IHSection, ISectionProps } from "../HView";
import React, { ReactNode } from "react";

import receiptWhite from "../../../img/receipt-white-18dp.svg";
import accountLogo from "../../../img/account_circle-white-18dp.svg";
import { HProfileView } from "../user-view/HUserInfo";

export abstract class HPatientView<T extends ISectionProps> extends HView<T> {
    protected constructor(props: T)
    {
        super(props);
    }
}

export class HPatientWelcomeView<T extends ISectionProps> extends HPatientView<T> {
    requiresUserManagement = (): boolean => true;

    constructor(props: T)
    {
        super(props);
    }

    render(): ReactNode
    {
        return (
            <h1>
                Vítejte!
            </h1>
        );
    }
}

const HPatientSection: IHSection = {
    menuItems: [
        {
            icon: receiptWhite,
            name: "Domů",
            targetView: HPatientWelcomeView
        },
        {
            icon: accountLogo,
            name: "Můj profil",
            targetView: HProfileView
        }
    ],
    permitsUserManagement: false,
    defaultView: HPatientWelcomeView
};

export { HPatientSection };