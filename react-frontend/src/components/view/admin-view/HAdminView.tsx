import { HView, IHSection, ISectionProps } from "../HView";
import { HPatientView } from "../patient-view/HPatientView";
import React, { ReactNode } from "react";
import homeIcon from "../../../img/home-white-18dp.svg";
import receiptWhite from "../../../img/receipt-white-18dp.svg";
import accountLogo from "../../../img/account_circle-white-18dp.svg";
import { HOtherProfileView, HSelfProfileView } from "../user-view/HUserInfo";
import {Tabulka} from "./AdminTable";
import {AdminekAdd} from "./AdminEdit";
import {adminekDeleteDocPat} from "./AdminDelete";
import {adminekActualize} from "./AdminActualize";

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
            icon: homeIcon,
            name: "Domů",
            targetView: HAdminWelcomeView
        },
        {
            icon: receiptWhite,
            name: "Seznam uživatelů",
            targetView: Tabulka
        },
        {
            icon: accountLogo,
            name: "Správa uživatelů",
            targetView: HOtherProfileView
        },
        {
            icon: accountLogo,
            name: "Změna role",
            targetView: adminekActualize
        },
        {
            icon: accountLogo,
            name: "Smazat uživatele",
            targetView: adminekDeleteDocPat
        },
        {
            icon: accountLogo,
            name: "Můj profil",
            targetView: HSelfProfileView
        }
    ],
    permitsUserManagement: true,
    defaultView: HSelfProfileView
};

export { HAdminSection };