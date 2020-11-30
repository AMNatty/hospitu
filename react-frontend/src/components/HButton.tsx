import React, { ReactNode } from "react";

import "../style/h-button.less";

export enum HButtonStyle
{
    DEFAULT = "h-button",
    BORDER = "h-button-text-border",
    TEXT = "h-button-text",
    TEXT_INVERTED = "h-button-text-inverted"
}

export class HButton extends React.Component<{
    action?: (() => void) | "submit" | "reset",
    action2?: (() => void),
    disabled?: boolean,
    buttonStyle?: HButtonStyle
}> {
    activate = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if (this.props.disabled)
        {
            event.preventDefault();
            return;
        }

        const action = this.props.action;

        if (this.props.action2)
        {
            this.props.action2();
        }

        if (typeof action === "string")
        {
            return;
        }

        if (!action)
        {
            event.preventDefault();
            return;
        }

        action();
    }

    render(): ReactNode
    {
        const style = this.props.buttonStyle || HButtonStyle.DEFAULT;

        return (
            <button className={ style } type={ typeof this.props.action === "string" ? this.props.action : "button" } onClick={ this.activate } disabled={ this.props.disabled }>
                { this.props.children }
            </button>
        );
    }
}
