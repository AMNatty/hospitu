import { HView, IHSection, ISectionProps } from "../HView";
import React, { ReactNode } from "react";
import homeIcon from "../../../img/home-white-18dp.svg";
import accountLogo from "../../../img/account_circle-white-18dp.svg";
import { HOtherProfileView, HSelfProfileView } from "../user-view/HUserInfo";

export abstract class HAdminView<T extends ISectionProps> extends HView<T> {
    protected constructor(props: T)
    {
        super(props);
    }
}

export class HAdminWelcomeView<T extends ISectionProps> extends HAdminView<T> {
    requiresUserManagement = (): boolean => true;

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
            icon: homeIcon,
            name: "Domů",
            targetView: HAdminWelcomeView
        },
        {
            icon: accountLogo,
            name: "Správa uživatelů",
            targetView: HOtherProfileView
        },
        {
            icon: accountLogo,
            name: "Můj profil",
            targetView: HSelfProfileView
        }
    ],
    permitsUserManagement: true,
    defaultView: HAdminWelcomeView
};

export { HAdminSection };