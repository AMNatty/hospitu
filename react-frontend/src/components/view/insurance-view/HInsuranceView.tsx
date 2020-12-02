import { HView, IHSection, ISectionProps } from "../HView";
import homeIcon from "../../../img/home-white-18dp.svg";
import accountLogo from "../../../img/account_circle-white-18dp.svg";
import { HOtherProfileView, HSelfProfileView } from "../user-view/HUserInfo";
import React, { ReactNode } from "react";

export abstract class HInsuranceView<T extends ISectionProps> extends HView<T> {
    protected constructor(props: T)
    {
        super(props);
    }
}

export class HInsuranceWelcomeView<T extends ISectionProps> extends HInsuranceView<T> {
    requiresUserManagement = (): boolean => true;

    constructor(props: T)
    {
        super(props);
    }

    render(): ReactNode
    {
        return (
            <h1>
                Vítejte v panelu pojištění!
            </h1>
        );
    }
}

const HInsuranceSection: IHSection = {
    menuItems: [
        {
            icon: homeIcon,
            name: "Domů",
            targetView: HInsuranceWelcomeView
        },
        {
            icon: accountLogo,
            name: "Správa pojištěnců",
            targetView: HOtherProfileView
        },
        {
            icon: accountLogo,
            name: "Můj profil",
            targetView: HSelfProfileView
        }
    ],
    permitsUserManagement: true,
    defaultView: HInsuranceWelcomeView
};

export { HInsuranceSection };