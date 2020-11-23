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
    action?: (() => void),
    disabled?: boolean,
    buttonStyle?: HButtonStyle
}> {
    activate = (): void => {
        if (this.props.action)
            this.props.action();
    }

    render(): ReactNode
    {

        const style = this.props.buttonStyle || HButtonStyle.DEFAULT;

        return (
            <button className={ style } onClick={ this.props.disabled ? undefined : () => this.activate() } disabled={ this.props.disabled }>
                { this.props.children }
            </button>
        );
    }
}
