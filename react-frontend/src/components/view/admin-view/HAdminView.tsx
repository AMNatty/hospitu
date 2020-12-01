import { HView, IHSection, ISectionProps } from "../HView";
import { HPatientView } from "../patient-view/HPatientView";
import React, { ReactNode } from "react";
import receiptWhite from "../../../img/receipt-white-18dp.svg";
import accountLogo from "../../../img/account_circle-white-18dp.svg";
import { HProfileView } from "../user-view/HUserInfo";
import {Tabulka} from "./AdminTable";
import {AdminekAdd} from "./AdminEdit";
import {adminekDeletePatient} from "./AdminDeletePatient";
import {adminekDeleteDoctor} from "./AdminDeleteDoctor";

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
            name: "Home",
            targetView: Tabulka
        },
        {
            icon: accountLogo,
            name: "Správa uživatelů",
            targetView: adminekDeleteDoctor
        },
        {
            icon: accountLogo,
            name: "Můj profil",
            targetView: HProfileView
        }
    ],
    permitsUserManagement: true,
    defaultView: adminekDeleteDoctor
};

export { HAdminSection };